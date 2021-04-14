<template>

<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>

    <el-row :gutter="10">
      <el-col :span="7">
        <el-input placeholder="请输入内容"  clearable @clear="getCategoriesList">
          <el-button slot="append" icon="el-icon-search" @click="getCategoriesList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="addcategory">添加分类</el-button>
      </el-col>
    </el-row>

<!--设置表格-->
    <el-table :data="categoryList" border style="width: 100%">

      <el-table-column prop="cat_id" label="id" ></el-table-column>
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column prop="cat_level" label="级别"></el-table-column>
      <el-table-column prop="cat_pid" label="父id" ></el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <el-tag>{{scope.row.cat_deleted}}</el-tag>
        </template>
      </el-table-column>

    </el-table>

    <!--设置分页-->
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
</div>


</template>

<script>
  export default {
    name: "Categories",
    created(){

      this.getCategoriesList()

    },
    data(){
      return {

        categoryList:[],
        queryInfo:{
          type:1,
          pagenum:1,
          pagesize:10
        },
        total:0

      }
    },
    methods:{
      addcategory(){


      },
      async getCategoriesList(){


        const {data:res} = await this.$http.get('categories')

        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.categoryList = res.data
        console.log(res)

      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
  }
</script>

<style scoped>

</style>
