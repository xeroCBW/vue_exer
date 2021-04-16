<template>


  <el-container class="home-container">

    <!--头部信息-->
    <el-header >

      <div class="">
        <img src="../assets/logo.png" alt="" class="icon-img">
        <span>管理系统后台</span>
      </div>
      <!--<el-button @click="logout">退出</el-button>-->

      <el-dropdown @command="logout">
        <span class="el-dropdown-link">
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu >
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>


    <el-container>

      <!--侧边栏-->

      <el-aside :width="isCollapse?'64px':'200px'" >
        <!--设置折叠-->
        <!--<div class="toggle-button" @click="toggle_collapse">|||</div>-->


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
      // this.getMenuList()
      // this.activePath = window.sessionStorage.getItem('activePath')

    },

    data(){
      return{
        //左侧菜单数据
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
    },
    computed:{

      username(){

        const username = window.sessionStorage.getItem('username')
        return username
      },
      menuList(){


        const arr = [

          {
            "id": 125,
            "authName": "用户管理",
            "path": "users",
            "children": [
              {
                "id": 110,
                "authName": "用户列表",
                "path": "users",
                "children": [],
                "order": null
              }
            ],
            "order": 1
          },
          {
            "id": 103,
            "authName": "权限管理",
            "path": "rights",
            "children": [
              {
                "id": 111,
                "authName": "角色列表",
                "path": "roles",
                "children": [],
                "order": null
              },
              {
                "id": 112,
                "authName": "权限列表",
                "path": "rights",
                "children": [],
                "order": null
              }
            ],
            "order": 2
          },
          {
            "id": 101,
            "authName": "商品管理",
            "path": "goods",
            "children": [
              {
                "id": 104,
                "authName": "商品列表",
                "path": "goods",
                "children": [],
                "order": 1
              },
              {
                "id": 115,
                "authName": "分类参数",
                "path": "params",
                "children": [],
                "order": 2
              },
              {
                "id": 121,
                "authName": "商品分类",
                "path": "categories",
                "children": [],
                "order": 3
              }
            ],
            "order": 3
          },
          {
            "id": 102,
            "authName": "订单管理",
            "path": "orders",
            "children": [
              {
                "id": 107,
                "authName": "订单列表",
                "path": "orders",
                "children": [],
                "order": null
              }
            ],
            "order": 4
          },
          {
            "id": 145,
            "authName": "数据统计",
            "path": "reports",
            "children": [
              {
                "id": 146,
                "authName": "数据报表",
                "path": "reports",
                "children": [],
                "order": null
              }
            ],
            "order": 5
          }
        ]
        return arr
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
    .icon-img{
      width: 40px;
      height: 40px;
    }
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

  .el-dropdown{
    font-size: 16px;
    color: white;
  }





</style>
