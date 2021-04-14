<template>
    <div class="login_container">

      <div class="login_box">
        <!--头像区域-->
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
        <!--登录表单区域-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
          <!--用户名-->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" ></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item >
            <el-input type="password"  v-model="loginForm.password"></el-input>
          </el-form-item>

          <el-form-item  class="btns">
            <el-button type="primary"  @click="login">登录</el-button>
            <el-button @click="resetLoginForm">重置</el-button>

          </el-form-item>
        </el-form>


      </div>

      登录组件
    </div>
</template>

<script>
  export default {
    name: "Login",


    data(){
      return{
        //登录绑定
        loginForm:{
          username:'admin',
          password:'123456'

        },
        loginFormRef:{

        },
        loginRules:{

          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]

        }

      }
    },
    methods:{


      resetLoginForm(){
        // console.log(this)
        //数据没有清空的原因是,双向绑定到data中,所以没有被清空
        this.$refs.loginFormRef.resetFields();
      },
      login(){
        this.$refs.loginFormRef.validate(async valid=>{
          // console.log(valid)
          if (!valid)return;

          const result = await this.$http.post('login',this.loginForm)
          const res = result.data
          // console.log(res)
          if( res.meta.status !== 200){

            return this.$message.error("登录失败 " + res.meta.msg)
          }else {
            this.$message.success(("登录成功"))
            window.sessionStorage.setItem('token',res.data.token)
          //  实现页面的跳转
            this.$router.push('/home')
          }
        })
      },

    }


  }
</script>

<style  scoped lang="less">


  .login_container{
    padding: 0%;
    margin: 0%;
    height: 100%;
    background-color: #2b4b6b;

  }

  .login_box{

    width: 450px;
    height: 300px;
    background-color: blanchedalmond;
    border-radius: 3px;
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
      height: 130px;
      width: 130px;
      border: solid 1px;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;

      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff ;

      img{
        width:100%;
        height: 100%;
        border-radius: 50%;
        background-color: gray;
      }
    }

    .btns{
      display: flex;
      justify-content: flex-end;
    }
    .login_form{
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
    }

  }






</style>
