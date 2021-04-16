<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>

      <div id="main" style="width: 750px;height:400px;"></div>

    </el-card>

  </div>

</template>

<script>

  //导入echarts
  import echarts from 'echarts'
  import _ from 'lodash'

  export default {
    name: "Reports",
    created(){

    },
    async mounted(){
    // 2. 此时页面的dom元素已经被渲染完毕了
      var myChart = echarts.init(document.getElementById('main'));

      //  准备数据和配置项
      // 指定图表的配置项和数据
      const {data:res} = await this.$http.get('reports/type/1')
      if (res.meta.status !== 200){
        return this.$message.error(res.meta.msg)
      }

      _.merge(res.data,this.options)


      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(res.data);

    },
    data(){
      return{

        options:{
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      }
    },
    methods:{

    }

  }
</script>

<style scoped>

</style>
