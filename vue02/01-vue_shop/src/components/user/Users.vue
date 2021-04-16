<template>


  <div>

<!--面包屑-->

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片-->
    <el-card class="box-card">
      <!--搜索和添加区域-->

      <el-row :gutter="10">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="dialogVisible">添加用户</el-button>
        </el-col>
      </el-row>

      <!--添加用户table-->
      <!--设置border 这样就有边界-->
      <el-table :data="userList" style="width: 100%" border>

        <!--<el-table-column  type="index"></el-table-column>-->

        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <!--状态-->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!--这里是使用作用域插槽-->
            <!--{{scope.row}}-->
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>

        <!--操作-->
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">


            <el-tooltip class="item" effect="dark" content="编辑用户" placement="top" :enterable="false" >
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false" >
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserById(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="设置角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="allocRoleDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-card>

    <!--添加用户的提示框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogVisible"
      @close="addUserDialogClose"
      width="50%" >
      <!--内容区域-->
      <!--实现数据的双向绑定-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>

      <!--这是底部区域-->
      <span slot="footer" class="dialog-footer">
          <!--设置属性false dialog不可见-->
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>

        </span>
    </el-dialog>


    <!--编辑用户的提示框-->
    <!--close是设置关闭按钮-->
    <el-dialog title="编辑用户" :visible.sync="editUserDialogVisible" @close="editUserDialogClose" width="50%" >
      <!--内容区域-->
      <!--实现数据的双向绑定-->
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editFormRef">
        <!--不需要校验用户 删除 prop -->
        <el-form-item label="用户名称">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>

      <!--这是底部区域-->
      <span slot="footer" class="dialog-footer">
          <!--设置属性false dialog不可见-->
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>

        </span>
    </el-dialog>

    <!--分配角色的dialog-->
    <el-dialog
      title="分配角色" :visible.sync="allocRoleDialogVisible" width="50%">

      <el-row>
        <el-col :span="24">用户名称{{userInfo.username}}</el-col>
        <el-col :span="24">用户角色{{userInfo.role_name}}</el-col>
        <el-col>
          选择角色
          <el-select placeholder="请选择活动区域" v-model="selectedRoleId">
            <el-option v-for="item in roleInfo" :label="item.roleName" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-col>

      </el-row>


      <span slot="footer" class="dialog-footer">
    <el-button @click="allocRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
    </el-dialog>


  </div>
    
</template>

<script>
  export default {
    name: "Users",
    created(){
      this.getUsersList()
    },
    data(){

      //  校验手机号
      var checkMobile = (rule,value,cb)=>{

        const regMobile = /^(0|86|17951)?(13[0-9]15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)){
          return cb()
        }
        cb(new Error('请输入合法的手机号'))

      }
      //  校验邮箱
      var checkEmail = (rule,value,cb)=>{

        //验证邮箱的正则
        const regEamil = /^([a-z0-9A-Z_-])+@([a-z0-9A-Z_-])+(\.[a-z0-9A-Z_-])+/
        if(regEamil.test(value)){
          return cb()
        }
        //cb call back
        cb(new Error('请输入合法的邮箱'))
      }

      return{
      //  获取用户列表查询参数
        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:10
        },
        userList:[],
        total:0,
        addUserDialogVisible:false,
        addForm:{

          username:'',
          password:'',
          mobile:'',
          email:''
        },
        //编辑用户的对话框
        editUserDialogVisible:false,
        editForm:{

          username:'',
          password:'',
          mobile:'',
          email:''
        },
        //添加表单的验证规则
        addFormRules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          mobile:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {validator:checkMobile, trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator:checkEmail, trigger: 'blur' }
          ]
        },
        //添加表单的验证规则
        editFormRules:{

          mobile:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {validator:checkMobile, trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator:checkEmail, trigger: 'blur' }
          ]
        },
        //分配角色的对话框
        allocRoleDialogVisible:false,
        //设置用户信息,默认为一个空的对象
        userInfo:{},
        roleInfo:[],
        //选中的roleId
        selectedRoleId:''


      }
    },
    methods:{


      async getUsersList(){
        //将data 数据重命名为 res
        const {data:res} = await this.$http.get('users',{params:this.queryInfo})
        // console.log(res)
        if (res.meta.status !== 200)return this.message.error(res.meta.msg)
        this.userList = res.data.users
        this.total = res.data.total


      },
      //监听pagesize改变
      handleSizeChange(new_size){

        this.queryInfo.pagesize = new_size
      //  重新发送请求
        this.getUsersList()


      },
      handleCurrentChange(current_page_num){
        this.queryInfo.pagenum = current_page_num
        //重新发送请求
        this.getUsersList()

      },

      //设置用户状态
      async userStateChange(userInfo){

        // console.log(userInfo)
        var url = `users/${userInfo.id}/state/${userInfo.mg_state}`

        const {data:res} = await this.$http.put(url)
        if (res.meta.status !== 200){
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)

      },
      //设置 dialog 显示隐藏
      dialogVisible(){
        //也可以直接 在赋值的地方 设置 addUserDialogVisible = false
        this.addUserDialogVisible = true
      },
      //添加用户对话框关闭
      addUserDialogClose(){
      //  通过refs对象,来重置对象的值
        this.$refs.addFormRef.resetFields()
      },
      //添加新用户
      addUser(){
        //关闭对话框

      //  验证基本数据
        this.$refs.addFormRef.validate(async valid=>{
          //验证失败,返回
          if(!valid)return

          const {data:res} = await this.$http.post('users',this.addForm)
          if(res.meta.status !== 201){
            this.$message.error(res.meta.msg)
          }
          //成功
          this.$message.success(res.meta.msg)
          this.addUserDialogVisible = false
        //  刷新用户列表
          this.getUsersList()

        })
      },
      async showEditDialog(id){
      //  显示编辑的dialog
        const {data:res} = await this.$http.get(`users/${id}`)
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.editForm = res.data
        this.editUserDialogVisible = true
      },
      //关闭用户
      editUserDialogClose(){

        this.$refs.editFormRef.resetFields()

      },
      editUserInfo(){

        this.$refs.editFormRef.validate(async valid=>{

          if(!valid)return
        //  发起修改用户信息的数据请求
          const {data:res} = await this.$http.put('users/'+this.editForm.id,{
            email:this.editForm.email,
            mobile:this.editForm.mobile
          })
          if (res.meta.status !== 200){
            return this.$message.error(res.meta.msg)
          }
        //  请求成功之后的操作,关闭对话框
          this.editUserDialogVisible = false
        //  刷新数据列表
          this.getUsersList()
        //  提示修改成功
          this.$message.success(res.meta.msg)

        })
      },

      //根据id 删除对应用户
      async deleteUserById(id) {

        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>{
          return err
        })
      //  如果用户确认删除,返回值是str
      //  如果用户取消,返回的错误,可以使用catch ,返回的是 cancel
        if(confirmResult !=='confirm'){
          return this.$message.info("已取消删除")
        }

        const {data:res} = await this.$http.delete(`users/${id}`)
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }

      //  确认删除
        this.$message.success('删除成功')
      //  刷新用户列表
        this.getUsersList()
      },
    //  分配角色dialog
      async allocRoleDialog(userInfo){


        //设置用户信息
        this.userInfo = userInfo;

        const {data:res} = await this.$http.get('roles')

        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        //设置角色数据
        this.roleInfo = res.data
        this.allocRoleDialogVisible = true
      },


      async saveRoleInfo(){
      //  点击按钮,分配角色
        if(!this.selectedRoleId){
          return this.$message.error('请选择要分配的角色')
        }

        const  {data:res} = await this.$http.put(`users/${this.userInfo.id}/role`,{rid:this.selectedRoleId})
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }

        this.$message.success(res.meta.msg)
      //  刷新用户权限
        this.getUsersList()
        //关闭显示
        this.allocRoleDialogVisible = false

      }
    }
  }
</script>

<style scoped>

  .el-table{
    margin-top: 15px;
    font-size: 12px;
  }

</style>
