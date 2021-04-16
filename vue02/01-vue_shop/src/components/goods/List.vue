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
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="goAddGoodsPage">添加商品</el-button>
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
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" @close="removeGoodsById(scope.row.goods_id)"></el-button>
          </template>
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


      this.getGoodsList()

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
      async getGoodsList(){

        const {data:res}  = await this.$http.get('goods',{params:this.queryInfo})

        if(res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.goodsList = res.data.goods
        this.total = res.data.total

      },
      goAddGoodsPage(){
        //进行页面的跳转
        this.$router.push('/goods/add')

      },
      handleSizeChange(new_size){

        this.queryInfo.pagesize = new_size
        this.getGoodsList()

      },
      handleCurrentChange(cur_num){

        this.queryInfo.pagenum = cur_num
        this.getGoodsList()

      },
      async removeGoodsById(goods_id){

        const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
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

        const {data:res} = await this.$http.delete(`goods/${id}`)
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }

        //  确认删除
        this.$message.success('删除成功')
        //  刷新商品列表
        this.getGoodsList()

      }
    }

  }
</script>

<style scoped>


  .el-table{
    margin-top: 15px;
  }

</style>
