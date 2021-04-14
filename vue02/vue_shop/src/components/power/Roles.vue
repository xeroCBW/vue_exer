<template>
<div>

  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>

    <el-row :gutter="10">
      <el-col :span="7">
        <el-input placeholder="请输入内容"  clearable @clear="getRolesList">
          <el-button slot="append" icon="el-icon-search" @click="getRolesList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="dialogVisible">添加角色</el-button>
      </el-col>
    </el-row>

<!--显示所有角色列表-->
    <el-table :data="rolesList" border style="width: 100%" stripe>
      <el-table-column type="expand">
        <template slot-scope="scope">

          <!--:class 动态绑定类-->
          <el-row :class="['bd-bottom',i1===0 ? 'bd-top':'','vcenter' ]" v-for="(item1,i1) in scope.row.children" :key="item1.id">
            <!--用来放置一级权限-->
            <el-col :span="5">
              <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
              <!--设置向右边的小箭头-->
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!--用来放置二三级权限-->
            <el-col :span="19">
              <!--放置el-row 渲染二级菜单-->
              <el-row class="vcenter" :class="[i2 === 0 ? '': 'bd-top','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                <!--再次重新划分-->
                <el-col :span="6">
                  <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)"> {{item2.authName}}</el-tag>
                  <!--设置向右边的小箭头-->
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!--再次重新划分-->
                <el-col :span="12">
                  <el-tag closable @close="removeRightById(scope.row,item3.id)" type="warning" v-for="(item3,i3) in item2.children" :key="item3.id">
                    {{item3.authName}}
                  </el-tag>

                </el-col>


              </el-row>
            </el-col>
          </el-row>


        </template>
      </el-table-column>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="level" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>

        </template>
      </el-table-column>
    </el-table>

  </el-card>

  <el-dialog
    title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="closeRightDialog">

    <!--设置唯一id -->
    <el-tree :data="rightsList" ref="treeRef" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defaultCheckedKeys"></el-tree>

    <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allocRights">确 定</el-button>
  </span>
  </el-dialog>



</div>
</template>

<script>
  export default {
    name: "Roles",
    created(){
      this.getRolesList()
    },
    data(){
      return {


        queryInfo:{

        },
        roleId:''
        ,
        rolesList:[],
        rightsList:[],
        setRightDialogVisible:false,
        //默认选中的节点id值
        defaultCheckedKeys:[],
        //设置树形结构的嵌套
        treeProps:{
          children:'children',
          label:'authName'

          }

      }
    },
    methods:{

      async getRolesList(){

        const {data:res} = await this.$http.get('roles')
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.rolesList = res.data

        return this.$message.success(res.meta.msg)


      },
      dialogVisible(){

      },
      async removeRightById(role,rightId){

      //  弹框提示用户是否要删除
        const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
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
        //获取删除数据
        const {data:res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if(res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        //删除成功
        this.$message.success(res.meta.msg)
        //刷新数据,不建议直接刷新数据,这样会重载整个页面
        // this.getRolesList()
        //直接赋值删除后的,请求返回的数据
        role.children = res.data

      },
      async showSetRightDialog(role){

        this.roleId = role.id

        const {data:res} = await this.$http.get('rights/tree')

        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.rightsList = res.data
        this.getLeafKeys(role,this.defaultCheckedKeys)


      //  设置分配权限
        this.setRightDialogVisible = true
      },
      //获取选中的权限
      getLeafKeys(node,arr) {
        //如果不包含chilren,就表示是三级节点
        if (!node.children) {
          return arr.push(node.id)
        }

        node.children.forEach(item => {
          this.getLeafKeys(item, arr)
        })
      },
      //监听对话框关闭
      closeRightDialog(){
        //清空选中的数组
        this.defaultCheckedKeys = []
      },
      //  分配权限
      async allocRights(){

        const keys = [
          ...this.$refs.treeRef.getCheckedKeys(),
          ...this.$refs.treeRef.getHalfCheckedKeys()
        ]

      //  进行字符串拼接
        const id_str = keys.join(',')
        // console.log(id_str)
        //对数据进行重命名
        const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:id_str})

        if(res.meta.status !== 200){
          //更新权限失败
          return this.$message.error(res.meta.msg)
        }
        //重新获取用户列表
        this.getRolesList()
        this.$message.success(res.meta.msg)

        //隐藏对话框
        this.setRightDialogVisible = false





      }
    }
  }


</script>

<style scoped>


  .el-table{
    margin-top: 15px;
  }

  .el-tag{
    margin: 7px;
  }

  .bd-top{
    border-top: 1px solid #eee;
  }

  .bd-bottom{
    border-bottom: 1px solid #eee;
  }

  .vcenter{
    display: flex;
    align-items: center;

  }

</style>
