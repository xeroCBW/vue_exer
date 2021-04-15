<template>

  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
   <el-card>

     <!--提示警告-->
     <el-alert
       title="添加商品信息"
       type="warning"
       show-icon>
     </el-alert>


     <!--进度条-->
     <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
       <el-step title="基本信息"></el-step>
       <el-step title="商品参数"></el-step>
       <el-step title="商品属性"></el-step>
       <el-step title="商品图片"></el-step>
       <el-step title="商品内容"></el-step>
       <el-step title="完成"></el-step>
     </el-steps>

     <!--添加商品-->
     <el-tabs v-model="activeIndex" :tab-position="'left'" style="height: 200px;">
       <el-tab-pane label="基本信息" name="0">基本信息</el-tab-pane>
       <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
       <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
       <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
       <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
     </el-tabs>


   </el-card>



  </div>
    
</template>

<script>
  export default {
    name: "AddGoods",
    created(){

    },
    data(){
      return {

        activeIndex:'0',

      }
    },
    methods:{

    }
  }
</script>

<style scoped>


  .el-steps{
    margin-top: 15px;
    /*text-align: left;*/
  }
  .el-table{
    margin-top: 15px;
  }

  .el-tabs{
    margin-top: 15px;

  }

</style>
