<template>

  <div>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card class="box-card">
      <!--只是需要列表结构-->
      <el-table :data="rightsList" border style="width: 100%" stripe>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="权限路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

  </div>



</template>

<script>
  export default {
    name: "Rights",
    created(){
      this.getRightsList()
    },
    data(){
      return{
        rightsList:[],
        queryInfo: {
          pagenum:1,
          pagesize:10
        }
      }
    },
    methods:{
      async getRightsList(){

        const {data:res} = await this.$http.get('rights/list')
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }

        this.rightsList = res.data
        return this.$message.success(res.meta.msg)

      }
    }
  }
</script>

<style scoped>

</style>
