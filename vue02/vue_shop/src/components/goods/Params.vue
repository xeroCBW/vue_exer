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

    <!--cascader选择商品分类-->
    <el-row class="cat-opt" style="text-align: left">
      <el-col >
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
      <el-tab-pane label="动态参数" name="many">

        <el-button type="primary" size="mini" :disabled="isButtonDisabled" @click="addParamsDialogVisible=true">添加参数</el-button>

        <el-table :data="manyTableData" stripe border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag closable @close="handleRemove(i,scope.row)" v-for="(item ,i ) in scope.row.attr_vals" :key="i">{{item}}</el-tag>

              <!--动态添加tag-->
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>


            </template>
          </el-table-column>
          <el-table-column prop="attr_id" label="参数id"></el-table-column>
          <el-table-column prop="attr_name" label="参数名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editParamsDialogShow(scope.row.attr_id)">修改</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane label="静态属性" name="only">
        <el-button type="primary" size="mini" :disabled="isButtonDisabled" @click="addParamsDialogVisible = true">添加参数</el-button>

        <el-table :data="onlyTableData" stripe border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag v-for="(item ,i ) in scope.row.attr_vals" :key="i">{{item}}</el-tag>

              <!--动态添加tag-->

              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>


            </template>
          </el-table-column>
          <el-table-column prop="attr_id" label="参数id"></el-table-column>
          <el-table-column prop="attr_name" label="参数名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editParamsDialogShow(scope.row.attr_id)">修改</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>



    </el-tabs>




  </el-card>

<!--添加参数的对话框-->
  <el-dialog
    @close="addParamsDialogClose"
    :title="'修改' +titleText"
    :visible.sync="addParamsDialogVisible"
    width="50%">

    <el-form
      :model="addParamsForm"
      :rules="addParamsFormRules"
      ref="addParamsFormRef"
      label-width="120px">

      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="addParamsForm.attr_name"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
    <el-button @click="addParamsDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
  </el-dialog>

  <!--修改参数的对话框-->
  <el-dialog
    @close="editParamsDialogClose"
    :title="'修改' +titleText"
    :visible.sync="editParamsDialogVisible"
    width="50%">

    <el-form
      :model="editParamsForm"
      :rules="editParamsFormRules"
      ref="editParamsFormRef"
      label-width="120px">

      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="editParamsForm.attr_name"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
    <el-button @click="editParamsDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editParams">确 定</el-button>
  </span>
  </el-dialog>

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
        activeName:'many',
        manyTableData:[],
        onlyTableData:[],

        //增加参数对话框
        addParamsDialogVisible:false,
        addParamsForm:{
          attr_name:''
        },
        addParamsFormRules:{
          attr_name:[
            { required: true, message: '请输入属性', trigger: 'blur' }
          ]
        },

        //修改参数对话框
        editParamsDialogVisible:false,
        editParamsForm:{
          attr_name:''
        },
        editParamsFormRules:{
          attr_name:[
            { required: true, message: '请输入属性', trigger: 'blur' }
          ]
        },
        //控制按钮与文本框的显示
        inputVisible:false,
        inputValue:[]

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


        this.getParamesData()

      },
      handleTabClick(){

        this.getParamesData()

      },
      //获取参数列表数据
      async getParamesData(){

        if(this.selectedCategoryKeys.length !== 3){
          //如果选中的不是三级,就把选中数组进行清空
          this.selectedCategoryKeys = []

          this.manyTableData = []
          this.onlyTableData = []

          return
        }

        //  根据所选三级分类id ,获取选中的参数
        const {data:res} = await this.$http.get(`categories/${this.cateID}/attributes`,{params:{sel:this.activeName}})
        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        //切割字符串,将逗号分隔的 变成一个数组
        res.data.forEach(item=>{
          //判断数组是否为空,如果是空的,那么就直接pass
          item.attr_vals = item.attr_vals ? item.attr_vals.split(','):[]
        //  添加数据,来控制显示框的显示隐藏
          item.inputVisible = false
          item.inputValue = ''
        })


        console.log(res)

        if(this.activeName === 'many'){
          this.manyTableData = res.data
        }else{
          this.onlyTableData = res.data
        }

      },
      addParamsDialogClose(){
        //清除上一次填写的内容
        this.$refs.addParamsFormRef.resetFields()
      },
      //添加参数
      addParams(){
        this.$refs.addParamsFormRef.validate(async valid=>{
          if(!valid)return
          const {data:res} = await this.$http.post(`categories/${this.cateID}/attributes`,{
            attr_name:this.addParamsForm.attr_name,
            attr_sel:this.activeName
          })

          if (res.meta.status !== 201){
            return this.$message.error(res.meta.msg)
          }

          this.$message.success(res.meta.msg)
          this.addParamsDialogVisible = false
          //刷新数据
          this.getParamesData()

        })
      },
      editParamsDialogClose(){

      },
      async editParamsDialogShow(attr_id){

        //查询 当前参数的信息
       const {data:res} = await this.$http.get(`categories/${this.cateID}/attributes/${attr_id}`,{
          params:{attr_sel:this.activeName}
        })

        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        this.editParamsForm = res.data

        this.editParamsDialogVisible = true

      },
      editParams(){

        this.$refs.editParamsFormRef.validate(async valid=>{

          if(!valid)return

          const {data:res} = await this.$http.put(`categories/${this.cateID}/attributes/${this.editParamsForm.attr_id}`,{
            attr_name:this.editParamsForm.attr_name,
            attr_sel:this.activeName
          })
          if (res.meta.status !== 200){
            return this.$message.error(res.meta.msg)
          }

          this.$message.success(res.meta.msg)
          //刷新数据
          this.getParamesData()
          this.editParamsDialogVisible = false

        })
      },

      //根据id 删除 param
      async removeParams(attr_id){

        const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
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


        const {data:res} = await this.$http.delete(`categories/${this.cateID}/attributes/${attr_id}`)

        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        //刷新数据
        this.$message.success(res.meta.msg)
        this.getParamesData()
      },
      handleInputConfirm(row){
        //恢复原样
        if(row.inputValue.trim() === 0){
          row.inputValue = ''
          //恢复原样,文本框隐藏
          row.inputVisible = false
          return
        }

      //  没有没有return ,则证明输入的内容需要后续处理
        row.attr_vals.push(row.inputValue.trim())
        row.inputValue = ''
        row.inputVisible = false

      //  需要发起请求,保存本次操作
      //  增加
        this.saveAttrVals(row)


      },
      //点击按钮
      showInput(row){
        row.inputVisible = true

        //获取焦点
        //$nextTick 当页面上元素被重新渲染,才会执行回调中的代码
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleRemove(index,row){
        //指定index 对数据进行删除
        row.attr_vals.splice(index,1)

        //删除
        this.saveAttrVals(row)

      },
      //可以对数据进行删除 增加 ---- 只是改变数组元素的个数
      async saveAttrVals(row){

        //  需要发起请求,保存本次操作

        const {data:res} = await this.$http.put(`categories/${this.cateID}/attributes/${row.attr_id}`,{
          attr_name:row.attr_name,
          attr_sel:row.attr_sel,
          attr_vals:row.attr_vals.join(','),
        })

        if (res.meta.status !== 200){
          return this.$message.error(res.meta.msg)
        }
        //刷新数据
        this.$message.success(res.meta.msg)

      }



    },
    computed:{

      isButtonDisabled(){


        if(this.selectedCategoryKeys.length !== 3){
          return true
        }else {
          return false
        }
      },
      cateID(){

        if(this.selectedCategoryKeys.length === 3){
          return this.selectedCategoryKeys[2]
        }
        return null
      },
      titleText(){
        return this.activeName === 'many' ? '动态参数':'静态参数';

      }
    }
  }
</script>

<style scoped>


  .cat-opt{
    margin-top: 15px;
  }

  .el-table{
    margin-top: 15px;
  }

  .el-tag{
    margin-left: 10px;
  }
  .input-new-tag{
    width: 120px;
  }

</style>
