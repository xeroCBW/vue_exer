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
        <el-button type="primary" @click="addcategoryDialogShow">添加分类</el-button>
      </el-col>
    </el-row>

<!--设置表格-->
    <tree-table
      class="tree-table"
      :data="categoryList"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      :show-index="true"
      index-text="#"
      :show-row-hover="false"
      border>

      <template slot="isok" slot-scope="scope">

        <i class="el-icon-error" v-if="scope.row === 'false'" style="color:green"></i>
        <i class="el-icon-success" v-else style="color: green"></i>
      </template>

      <template slot="order" slot-scope="scope">
        <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
        <el-tag type="success" v-else-if="scope.row.cat_level === 1" size="mini">二级</el-tag>
        <el-tag type="warning" v-else size="mini">三级</el-tag>

      </template>

      <template slot="operation" slot-scope = 'scope'>

        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>

      </template>

    </tree-table>



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


  <el-dialog
    title="添加分类"
    :visible.sync="addCategoryDialogVisible"
    width="50%"
    @close="addCategoryDialogClosed">

    <el-form
      :model="addCategoryForm"
      :rules="addCategoryFormRules"
      ref="addCategoryFormRef"
      label-width="100px">

      <el-form-item label="分类名称:" prop="cat_name">
        <el-input v-model="addCategoryForm.cat_name"></el-input>
      </el-form-item>

      <el-form-item label="父节点:" prop="cat_pid">
        <el-cascader
          v-model="selectedKyes"
          :options="parentCategoryList"
          :props="cascaderProps"
          @change="parentCategoryChange"
          clearable></el-cascader>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
    <el-button @click="addCategoryDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCategory">确 定</el-button>
  </span>
  </el-dialog>


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
          type:3,
          pagenum:1,
          pagesize:10
        },
        total:0,
        columns:[
          {
            label:'分类名称',
            prop:'cat_name'
          },
          //表示将当前列,定义为模板列
          {
            label:'是否有效',
            type:'template',
            template:'isok'
          },
          {
            label:'排序',
            type:'template',
            template:'order'
          },
          {
            label:'操作',
            type:'template',
            template:'operation'
          },
        ],
        addCategoryDialogVisible:false,
        addCategoryForm:{
          cat_name:'',
          cat_pid:0,
          //默认是添加成为一级分类
          cat_level:0
        },
        addCategoryFormRules:{
          cat_name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        parentCategoryList:[],
        //指定级联选择器的配置对象
        cascaderProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children',
          expandTrigger:'hover',
          checkStrictly:true
        },
        //选中的父级分类id
        selectedKyes:[]

      }
    },
    methods:{

      //获取商品分类数据
      async getCategoriesList(){
        const {data:res} = await this.$http.get('categories',{params:this.queryInfo})
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.categoryList = res.data.result
        this.total = res.data.total

        // console.log(res)
      },
      handleSizeChange(cur_size){

        this.queryInfo.pagesize = cur_size
        //刷新数据
        this.getCategoriesList()
      },
      handleCurrentChange(cur_num){

        this.queryInfo.pagenum = cur_num
        //刷新数据
        this.getCategoriesList()

      },
      //获取父级分类
      async getParentCategoryList(){

        const {data:res} = await this.$http.get('categories',{params:{type:2}})

        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.parentCategoryList = res.data




      },
      addcategoryDialogShow(){
        //先获取父级分类的列表
        this.getParentCategoryList()
        //再进行展示对话框
        this.addCategoryDialogVisible = true
      },
      //选择项发生变化
      parentCategoryChange(){

        if(this.selectedKyes.length > 0){
        //  表示有被选择
        //  父类的id 是前一级 ,要么没有
          this.addCategoryForm.cat_pid = this.selectedKyes[this.selectedKyes.length-1]
          this.addCategoryForm.cat_level = this.selectedKyes.length
          return
        }else{

        //  父id 重置为0  level 重置为 0
          this.addCategoryForm.cat_pid = 0
          this.addCategoryForm.cat_level = 0
        }
      },
      addCategory(){

        // console.log(this.addCategoryForm)
        //这里是一个闭包,主要async的摆放位置
        this.$refs.addCategoryFormRef.validate(async valid=>{
          if(!valid)return
          const {data:res} = await this.$http.post('categories',this.addCategoryForm)

          if (res.meta.status !== 201){
            return this.$message.error(res.meta.msg)
          }

          this.$message.success(res.meta.msg)
          this.getCategoriesList()
          //隐藏对话框
          this.addCategoryDialogVisible = false

        })



      },
      addCategoryDialogClosed(){

        this.$refs.addCategoryFormRef.resetFields()
        this.selectedKyes = []
        this.addCategoryForm.cat_level = 0
        this.addCategoryForm.cat_pid = 0

      }
    }
  }
</script>

<style scoped lang="less">


  .el-card{
    margin-top: 15px;
  }

  .tree-table{
    margin-top: 15px;
  }

  /*.el-cascader{*/
    /*width: 100%;*/
  /*}*/



</style>
