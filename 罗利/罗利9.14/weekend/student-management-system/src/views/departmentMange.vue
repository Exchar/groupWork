<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    操作-->
    <!--    添加-->
    <div id="addItem">
      <el-button type="primary" @click="dialogFormVisible = true">添加部门</el-button>
      <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="DeptFormRule">
          <el-form-item label="部门名称：" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.DeptName" autocomplete="off" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="部门描述：" :label-width="formLabelWidth" >
            <el-input v-model="form.DeptDescript" autocomplete="off" placeholder="请输入描述"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDiag">取 消</el-button>
          <el-button type="primary" @click="addDeptItem" >添 加</el-button>
        </div>
      </el-dialog>
    </div>
    <!--    修改-->
    <div id="editItem">
      <el-dialog title="添加部门" :visible.sync="editDialogVis">
        <el-form :model="form">
          <el-form-item label="部门名称：" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editForm.DeptName" autocomplete="off" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="部门描述：" :label-width="formLabelWidth" >
            <el-input v-model="editForm.DeptDescript" autocomplete="off" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="状态：" :label-width="formLabelWidth" class="editStatus">
            <el-select v-model="editForm.status" size="small">
              <el-option label="有效" value="1"></el-option>
              <el-option label="无效" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVis=false">取 消</el-button>
          <el-button type="primary" @click="saveEditedItem">保 存</el-button>
        </div>
      </el-dialog>
    </div>
    <!--    数据-->
    <el-table
      :data="deptList"
      stripe
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
      @selection-change="handleSelectionChange">
      <el-table-column
        width="50"
        type="selection">
      </el-table-column>
      <el-table-column
        prop="DeptNo"
        label="部门号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="DeptName"
        label="部门名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="DeptDescript"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="Status"
        label="状态">
        <template slot-scope="scope">
          <span :class="scope.row.Status===1?'statusAct':'statusDis'">{{ scope.row.Status===1?'有效':'无效' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateDate"
        :formatter="DateFormatter"
        label="录入日期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="editDeptItem(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="delDeptItem(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--   分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Math.floor(deptList.length/10)">
    </el-pagination>
  </div>

</template>
<script>
  export default {
    name: 'DeptManage',
    data: function () {
      return {
        deptList: [
        ],
        dialogFormVisible: false,
        form: {
          DeptName: '',
          DeptDescript: ''
        },
        formLabelWidth: '120px',
        DeptFormRule: {
          name: [
            { required: true, message: '请输入部门名称', trigger: 'blur' }
          ]
        },
        multipleSelection: [],
        editDialogVis: false,
        editForm: {
          DeptName: '',
          DeptDescript: '',
          status: 1,
          DeptNo: ''
        }
      }
    },
    created () {
      this.getDeptList()
    },
    methods: {
      // 关闭对话框
      closeDiag () {
        for (const i in this.form) {
          this.dialogFormVisible = false
          this.form[i] = ''
        }
      },
      // 获得所有的部门列表
      getDeptList () {
        this.$axios.post('/api/getDeptList').then((res) => {
          const data = res.data
          if (data.code === 200 && data.data) {
            this.deptList = data.data
            console.log(this.deptList)
          } else if (data.code === 500) {
            this.$message('服务器火星了')
          } else {
            this.$alert('服务器开小差了')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 处理选择
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      DateFormatter: function (row, column) {
        return new Date(row.CreateDate).toLocaleString()
      },
      cellStyle ({ row, column, rowIndex, columnIndex }) {
        return 'text-align:center'
      },
      rowClass ({ row, rowIndex }) {
        return 'text-align:center'
      },
      // 添加一条数据
      addDeptItem () {
        if (this.form.DeptName.length > 0) {
          // 发起一个ajax请求
          this.$axios.post('/api/addDeptItem', {
            DeptName: this.form.DeptName,
            DeptDesctript: this.form.DeptDescript
          }).then((res) => {
            if (res.data.code === 200 && res.data.data.affectedRows > 0) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getDeptList()
              this.closeDiag()
            }
          }).catch((err) => {
            console.log(err)
            this.$message('服务器开小差了')
          })
        }
      },
      // 删除一条数据
      delDeptItem (row) {
        console.log(row.DeptNo)
        if (row.DeptNo) {
          this.$axios.post('/api/delDeptItem', {
            DeptNo: row.DeptNo
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              })
              this.getDeptList()
            }
          }).catch(() => {
            this.$message.error('服务器开小差了,删除失败')
          })
        } else {
          this.$message.error('服务器开小差了,删除失败')
        }
      },
      // 打开修改对话框
      editDeptItem (row) {
        this.editDialogVis = true
        if (row.DeptNo) {
          this.editForm = row
        }
      },
      // 保存修改，发起请求
      saveEditedItem () {
        const status = this.editForm.status
        const DeptNo = this.editForm.DeptNo
        const DeptName = this.editForm.DeptName
        const DeptDescript = this.editForm.DeptDescript
        console.log(DeptNo, DeptName, DeptDescript)
        if (DeptNo && DeptName) {
          this.$axios.post('/api/editDeptItem', {
            status: status,
            DeptNo: DeptNo,
            DeptName: DeptNo,
            DeptDescript: DeptDescript
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getDeptList()
              this.editDialogVis = false
            } else {
              this.$message.error('保存失败，服务器开小差了')
            }
          })
        }
      }
      // 关闭修改对话框
    }
  }
</script>
<style scoped>
  .el-breadcrumb{
    margin: 20px;
  }
  .statusAct{
    padding: 5px 10px;
    color: #f3f1f1;
    background-color: green;
    border-radius: 1px;
  }
  .statusDis{
    padding: 5px 10px;
    color: white;
    background-color: red;
    border-radius: 1px;
  }
  .el-table .el-table__row{
    text-align: center;
  }
  #addItem{
    background-color: white;
    padding: 20px;
    margin: 10px;
    text-align: left;
  }
  .editStatus .el-select{
    width: 100%;
  }
</style>
