<template>
<div>

  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>

    <!--头部警告-->
    <el-alert
      title="注意:只允许为第三级分类设置相关参数"
      type="warning"
      :closable="false"
      show-icon>
    </el-alert>
    <el-row class="cat-opt">
      <el-col>
        <span>选择商品分类:</span>
        <el-cascader
          :props="categoryProps"
          :options="categoryList"
          v-model="selectedCategoryKeys"
          @change="parentCategoryChange">
        </el-cascader>
      </el-col>
    </el-row>

    <el-tabs @tab-click="handleTabClick"  v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" size="mini" :disabled="isButtonDisabled">添加参数</el-button>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" size="mini" :disabled="isButtonDisabled">添加参数</el-button>
      </el-tab-pane>
    </el-tabs>




  </el-card>


</div>
</template>

<script>
  export default {
    name: "Params",
    created(){

      this.getCategoryList()

    },
    data(){
      return{
        categoryList:[],
        categoryProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children',
          expandTrigger:'hover',
          checkStrictly:true
        },
        selectedCategoryKeys:[],
        //被激活页签的名称
        activeName:'first'
      }
    },
    methods:{


      async getCategoryList(){

        const {data:res} = await this.$http.get('categories')
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.categoryList = res.data

      },
      parentCategoryChange(){

        if(this.selectedCategoryKeys.length !== 3){
          //如果选中的不是三级,就把选中数组进行清空
          this.selectedCategoryKeys = []

          return
        }
        console.log('选中的是三级分类')

      },
      handleTabClick(){


      }

    },
    computed:{

      isButtonDisabled(){


        if(this.selectedCategoryKeys.length !== 3){
          return true
        }else {
          return false
        }

      }
    }
  }
</script>

<style scoped>


  .cat-opt{
    margin-top: 15px;
  }

</style>
