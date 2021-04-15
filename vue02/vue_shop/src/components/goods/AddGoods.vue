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


     <!--设置 form 表单-->

     <el-form :model="addGoodsForm" :rules="addGoodsFormRules" ref="addGoodsFormRef"
              label-width="100px" label-position="top">

       <!--添加商品-->
       <el-tabs v-model="activeIndex"
                :tab-position="'left'"
                :before-leave="beforeTabLeave"
                @tab-click="tabClicked">

         <!--基本信息-->
         <el-tab-pane label="基本信息" name="0">

           <el-form-item label="商品名称" prop="goods_name">
             <el-input v-model="addGoodsForm.goods_name"></el-input>
           </el-form-item>
           <el-form-item label="商品价格" prop="goods_price">
             <el-input v-model="addGoodsForm.goods_price" type="number"></el-input>
           </el-form-item>
           <el-form-item label="商品重量" prop="goods_weight">
             <el-input v-model="addGoodsForm.goods_weight" type="number"></el-input>
           </el-form-item>
           <el-form-item label="商品数量" prop="goods_number">
             <el-input v-model="addGoodsForm.goods_number"></el-input>
           </el-form-item>

           <el-form-item label="商品分类" prop="goods_cat">
             <el-cascader
               :props="categoryProps"
               :options="categoryList"
               v-model="addGoodsForm.goods_cat"
               @change="parentCategoryChange">
             </el-cascader>
           </el-form-item>

         </el-tab-pane>

         <!--商品参数-->
         <el-tab-pane label="商品参数" name="1">

           <el-form-item v-for="item in manyTableData" :label="item.attr_name" :key="item.attr_id" >
             <!--复选框-->
             <el-checkbox-group v-model="item.attr_vals">
               <el-checkbox :label="item1" v-for="(item1,i1) in item.attr_vals" :key="i1" border></el-checkbox>
             </el-checkbox-group>
           </el-form-item>

         </el-tab-pane>

         <!--商品属性-->
         <el-tab-pane label="商品属性" name="2">

           <el-form-item v-for="item in onlyTableData" :label="item.attr_name" :key="item.attr_id" >
             <!--复选框-->
             <!--<el-input v-model="item.attr_vals"></el-input>-->
           </el-form-item>

         </el-tab-pane>

         <!--图片上传-->
         <el-tab-pane label="商品图片" name="3">
           <!--action 图片要上传的后台api地址-->
           <el-upload
             :action="uploadURL"
             :on-preview="handlePreview"
             :on-remove="handleRemove"
             :headers="headerObj"
             :on-success="handleSuccess"
             list-type="picture">
             <el-button size="small" type="primary">点击上传</el-button>
             <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
           </el-upload>



         </el-tab-pane>
         <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
       </el-tabs>

     </el-form>

   </el-card>

    <!--图片预览-->

    <el-dialog
      class="previewImgae"
      title="图片预览"
      :visible.sync="previewDialogVisible"
      width="50%">
      <img :src="previewPath" alt="">

    </el-dialog>


  </div>
    
</template>

<script>
  export default {
    name: "AddGoods",
    created(){

      this.getCategoriesList()
    },
    data(){
      return {

        activeIndex:'0',
        addGoodsForm:{
          goods_name:'',
          goods_price:0,
          goods_weight:0,
          goods_number:0,
          goods_cat:[],
          pics:[]

        },
        addGoodsFormRules:{
          goods_name:[
            { required: true, message: '请输入商品名', trigger: 'blur' },
          ],
          goods_price:[
            { required: true, message: '请输入商品价格', trigger: 'blur' },
          ],
          goods_weight:[
            { required: true, message: '请输入商品重量', trigger: 'blur' },
          ],
          goods_number:[
            { required: true, message: '请输入商品重量', trigger: 'blur' },

          ],
          goods_cat:[
            { required: true, message: '请输入商品重量', trigger: 'blur' },
          ]
        },
        categoryList:[],
        categoryProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children',
          expandTrigger:'hover',
          // checkStrictly:true
        },
        manyTableData:[],
        onlyTableData:[],
        uploadURL:"https://www.liulongbin.top:8888/api/private/v1/upload",
        //图片上传的请求头
        headerObj:{
          Authorization:window.sessionStorage.getItem('token')
        },
        //预览路径
        previewPath:'',
        previewDialogVisible:false



      }
    },
    methods: {

      async getCategoriesList(){

        const {data:res} = await this.$http.get('categories')
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.categoryList = res.data

      },
      //级联选择器变化,会出发这个函数
      parentCategoryChange(){

        if(this.addGoodsForm.goods_cat.length !== 3){
          this.addGoodsForm.goods_cat = []
        }
      },
      beforeTabLeave(activeName,oldActiveName){

        //要选中的名字,离开的名字
        if(oldActiveName === '0' && this.addGoodsForm.goods_cat.length !== 3){
          this.$message.error('请先选择商品分类!')
          return false
        }
      },
      async tabClicked(){
        //证明访问的是动态参数面板
        if(this.activeIndex === '1'){

          const {data:res} = await this.$http.get(`categories/${this.cateID}/attributes`,{params:{sel:'many'}})
          if (res.meta.status !== 200){
            return this.$message.error( res.meta.msg)
          }

          res.data.forEach(item =>{
            item.attr_vals = item.attr_vals?item.attr_vals.split(','):[]
          })
          this.manyTableData = res.data

        }else if(this.activeIndex === '2'){



          // 获取only的参数
          const {data:res} = await this.$http.get(`categories/${this.cateID}/attributes`,{params:{sel:'only'}})
          if (res.meta.status !== 200){
            return this.$message.error( res.meta.msg)
          }
          res.data.forEach(item =>{
            item.attr_vals = item.attr_vals?item.attr_vals.split(','):[]
          })
          this.onlyTableData = res.data
          console.log(res)
        }

      },
      //处理图片预览效果
      handlePreview(file){


        this.previewPath = file.response.data.url
        this.previewDialogVisible = true






      },
      handleRemove(file){
        console.log(file)

        const filePath = file.response.data.tmp_path
        //找到图片
        const i = this.addGoodsForm.pics.findIndex(x=>{
          x.pic === filePath
        })
        //删除图片
        this.addGoodsForm.pics.splice(i)

      },
      //监听图片上传成功
      handleSuccess(response){


        const picInfo = {pic:response.data.tmp_path}
        this.addGoodsForm.pics.push(picInfo)

        console.log(this.addGoodsForm.pics)


      }

    },
    computed:{

      cateID(){

        if(this.addGoodsForm.goods_cat.length === 3){
          return this.addGoodsForm.goods_cat[2]
        }
        return null
      },
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

  .el-checkbox{
    margin:0 5px 0 0 !important;
  }
  .previewImgae{
    width: 100%;
  }

</style>
