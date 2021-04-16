<template>


  <el-container class="home-container">

    <!--头部信息-->
    <el-header >

      <div class="">
        <img src="../assets/logo.png" alt="">
        <span>管理系统后台</span>
      </div>
      <el-button @click="logout">退出</el-button>

    </el-header>


    <el-container>

      <!--侧边栏-->

      <el-aside :width="isCollapse?'64px':'200px'" >
        <!--设置折叠-->
        <div class="toggle-button" @click="toggle_collapse">|||</div>


        <!-- 侧边栏菜单区-->
        <el-menu :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true"
                 :default-active="activePath"
                 background-color="#333744" text-color="#fff" active-text-color="#409eff">
          <!--一级菜单-->
          <!--设置每一个人拥有一个独属的index 这样就不会全部打开 index只是接受字符串 不会接受数字-->
          <!--所以需要数据拼接-->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!--一级菜单的模板区-->
            <template slot="title">
              <!--i是图标-->
              <i :class="iconMap[item.id]"></i>
              <!--表示的是文本-->
              <span>{{item.authName}}</span>
            </template>

            <!--二级菜单 -->
            <!--<el-menu-item-group>-->
            <el-menu-item :index="'/'+sub_item.path" @click="saveNavState('/'+sub_item.path)" v-for="sub_item in item.children" :key="sub_item.id">
              <template slot="title">
                <!--<i class="el-icon-menu"></i>-->
                <span>{{sub_item.authName}}</span>
              </template>
            </el-menu-item>
            <!--</el-menu-item-group>-->

          </el-submenu>
        </el-menu>
      </el-aside>

      <!--主体区域-->

      <el-main>
        <!--设置路由占位符号-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: "Home",
    //定义一个生命周期函数
    created(){
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')

    },

    data(){
      return{
        //左侧菜单数据
        menuList:[],
        isCollapse:false,
        //被激活的链接地址
        activePath:"",
        iconMap:{
          125:'el-icon-user',
          103:'el-icon-help',
          101:'el-icon-s-goods',
          102:'el-icon-s-order',
          145:'el-icon-data-line'
        }
      }
    },
    methods:{
      logout(){
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      async getMenuList(){
        //将返回的data数据重新命名成为 res
        const {data:res}  = await this.$http.get('menus')
        console.log(res)

        if(res.meta.status !== 200 )return this.$message.error(res.meta.msg)
        this.menuList = res.data

      },
      toggle_collapse(){
        this.isCollapse = !this.isCollapse
      },
      saveNavState(activePath){

        window.sessionStorage.setItem('activePath',activePath)
        //点击后就显示高亮
        this.activePath = activePath

      }
    }
  }
</script>

<style scoped lang="less">


  .el-header{
    background-color: #373d41;
    display: flex;
    /*左右对齐*/
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    /*img{*/
      /*width: 80px;*/
      /*height: 80px;*/
    /*}*/
    > div{
      display: flex;
      align-items: center;
    }
  }
  .el-aside{
    background-color: #333744;
    .el-menu{
      border-right: none !important;

    }

  }
  .el-main{
    background-color: #eaedf1;
  }

  .home-container{
    width: 100%;
    height: 100%;
  }

  .toggle-button{

    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.4em;
    cursor: pointer;

  }





</style>
