<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path:'/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!--卡片视图-->
      <el-card>

        <el-row>
          <el-col :span="8">
            <el-input placeholder="请输入内容"  clearable @clear="getOrdersList">
              <el-button slot="append" icon="el-icon-search" @click="getOrdersList"></el-button>
            </el-input>
          </el-col>
        </el-row>


        <el-table :data="ordersList" style="width: 100%" border>

          <!--<el-table-column  type="index"></el-table-column>-->

          <!--<el-table-column prop="order_id" label="订单id"></el-table-column>-->
          <el-table-column prop="order_number" label="订单编号"></el-table-column>
          <el-table-column prop="order_price" label="订单价格"></el-table-column>
          <el-table-column prop="pay_status" label="支付状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.pay_status === '1'">已付款</el-tag>
              <el-tag v-else type="danger">未付款</el-tag>

            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货"></el-table-column>
          <el-table-column prop="create_time" label="下单时间">
            <template slot-scope="scope">
              {{scope.row.create_time | dateFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="order_fapiao_title" label="订单类型"></el-table-column>
          <!--<el-table-column prop="order_fapiao_company" label="公司名称"></el-table-column>-->
          <!--<el-table-column prop="order_fapiao_content" label="发票内容"></el-table-column>-->
          <!--<el-table-column prop="consignee_addr" label="发货地址"></el-table-column>-->
          <el-table-column  label="操作" width="130px">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAddressDialogVisible = true"></el-button>
            <el-button type="success" icon="el-icon-location-outline" size="mini" @click="progressBoxShow"></el-button>
          </el-table-column>

        </el-table>


        <!--分页-->
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


      <!--添加用户的提示框-->
      <el-dialog
        title="修改地址"
        :visible.sync="editAddressDialogVisible"
        @close="editAddressDialogClose"
        width="50%" >
        <!--内容区域-->
        <!--实现数据的双向绑定-->
        <el-form
          :model="editAddressForm"
          :rules="editAddressFormRules"
          ref="editAddressFormRef"
          label-width="100px">
          <el-form-item label="省市区/县" prop="address1">

            <el-cascader :options="cityData" v-model="editAddressForm.address1" :props="orderProps">
            </el-cascader>

          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="editAddressForm.address2"></el-input>
          </el-form-item>
        </el-form>

        <!--这是底部区域-->
        <span slot="footer" class="dialog-footer">
          <!--设置属性false dialog不可见-->
          <el-button @click="editAddressDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editAddress">确 定</el-button>

        </span>
      </el-dialog>



      <!--物流进度对话框-->
      <el-dialog
        title="物流进度"
        :visible.sync="logicProgressDialogVisible"
        @close="logicProgressDialogClose"
        width="50%" >

        <el-timeline >
          <el-timeline-item
            v-for="(activity, index) in loginProgressInfo"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
          </el-timeline-item>
        </el-timeline>

      </el-dialog>


    </div>
</template>

<script>

  import cityData from './city_data2017_element.js'


  export default {
    name: "Orders",
    created(){
      this.getOrdersList()
    },
    data(){
      return {

        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:10
        },
        ordersList:[],
        total:0,
        editAddressDialogVisible:false,
        editAddressForm:{
          address1:[],
          address2:''

        },
        editAddressFormRules:{

          address1:[
            { required: true, message: '请选择省市区', trigger: 'blur' },
          ],
          address2:[
            { required: true, message: '请选择详细地址', trigger: 'blur' },
          ],

        },
        //属性值和属性名 重名 ,可以简写 cityData:cityData --> cityData
        cityData,
        orderProps:{
          expandTrigger:'hover',
        },

        logicProgressDialogVisible:false,
        loginProgressInfo :{}

      }
    },
    methods:{
      async getOrdersList(){

        //将data 数据重命名为 res
        const {data:res} = await this.$http.get('orders',{params:this.queryInfo})

        if (res.meta.status !== 200)return this.message.error(res.meta.msg)
        this.ordersList = res.data.goods
        this.total = res.data.total

        // console.log(res)

      },
      handleSizeChange(pagesize){

        this.queryInfo.pagesize = pagesize
        this.getOrdersList()

      },
      handleCurrentChange(cur_num){

        this.queryInfo.pagenum = cur_num
        this.getOrdersList()

      },
      editAddressDialogClose(){

        this.$refs.editAddressFormRef.resetFields()

      },
      editAddress(){
        
      },
      async progressBoxShow(){
      //  进度条展示


        const {data:res} = await this.$http.get('/kuaidi/804909574412544580')
        if (res.meta.status !== 200)return this.message.error(res.meta.msg)

        this.loginProgressInfo = res.data

        console.log(res)


        this.logicProgressDialogVisible = true


      },

      logicProgressDialogClose(){

      }

    }
  }
</script>

<style scoped>


  .el-table{
    margin-top: 15px;
  }
  .el-cascader{
    width: 100%;
  }

</style>
