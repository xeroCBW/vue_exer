<template>

  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>

      <el-row :gutter="10">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="dialogVisible">添加商品</el-button>
        </el-col>
      </el-row>


      <el-table stripe border :data="goodsList">

        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="100px"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="90px"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="140px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px" >
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini"></el-button>
        </el-table-column>


      </el-table>

      <!--分页控件-->
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
    name: "List",
    created(){


      this.getUsersList()

    },
    data(){
      return {


        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:10

        },
        goodsList:[],
        total:0

      }
    },
    methods:{
      async getUsersList(){

        const {data:res}  = await this.$http.get('goods',{params:this.queryInfo})

        if(res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.goodsList = res.data.goods
        this.total = res.data.total

      },
      dialogVisible(){

      },
      handleSizeChange(new_size){

        this.queryInfo.pagesize = new_size
        this.getUsersList()

      },
      handleCurrentChange(cur_num){

        this.queryInfo.pagenum = cur_num
        this.getUsersList()

      }
    }

  }
</script>

<style scoped>


  .el-table{
    margin-top: 15px;
  }

</style>
