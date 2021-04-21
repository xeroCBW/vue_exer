<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="form.username">
						<input type="password" placeholder="密码" v-model="form.password">
					</div>
          <b-overlay :show="loginOverlay" rounded="sm" opacity="0.5">
            <div class="info" v-if="infoshow" :class="{ myprimary: overlayclass }">{{ info }}</div>
          </b-overlay>
					<!-- <b-alert show dismissible fade variant="danger" style="width: 258px; border-radius: 10px" v-if="infoshow">{{ info }}</b-alert> -->
					<button class="bbutton" @click="login()">登录</button>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="form.username">
						<!-- <span class="errTips" v-if="existed">* 用户名已经存在！ *</span> -->
						<!-- <input type="email" placeholder="邮箱" v-model="form.useremail"> -->
						<input type="password" placeholder="密码" v-model="form.password">
						<input type="text" placeholder="学校名称" v-model="form.school_name">
					</div>
          <b-overlay :show="loginOverlay" rounded="sm" opacity="0.5">
            <div class="info" v-if="infoshow" :class="{ myprimary: overlayclass }">{{ info }}</div>
          </b-overlay>
					<!-- <b-alert show dismissible fade variant="danger" style="width: 258px; border-radius: 10px" v-if="infoshow">{{ info }}</b-alert> -->
					<button class="bbutton" @click="register()">注册</button>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，和我们一起旅行</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
  name: "login-register",
  data() {
    return {
      overlayclass: false,
      loginOverlay: false,
      isLogin: false,
      emailError: false,
      passwordError: false,
      existed: false,
      infoshow: false,
      info: "",
      form: {
        username: "",
        password: "",
        school_name: "",
      },
    };
  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin;
      this.form.username = "";
      this.form.useremail = "";
      this.form.password = "";
      this.info = "";
      this.infoshow = "";
    },
    async login() {
      if (this.form.username == "" || this.form.password == "") {
        this.infoshow = true;
        this.info = "请输入用户名和密码";
        return;
      }
      try {
        this.infoshow = true;
        this.overlayclass = true
        this.info = "正在登录，请稍后";
        this.loginOverlay = true;
        console.log('aaa')
        const { data: res } = await this.$http.post("/login", this.form);
        // console.log(res)
        this.loginOverlay = false
        // console.log(res)
        if (res.meta.status == 400) {
          this.infoshow = true;
          this.overlayclass = false
          this.info = "用户名或密码错误";
          return;
        }
        console.log(res)
        // console.log(res)
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("is_admin", res.data.is_amdin);
        // console.log(res.data.is_amdin)
        // window.sessionStorage.setItem("name", 'aaa');
        if (res.data.is_amdin) {
          this.$router.push("/supermanager");
        } else {
          this.$router.push("/manager");
        }
      } catch {
        this.loginOverlay = false;
        this.info = "连接区块链失败，请稍候重试";
        return;
      }
    },
    async register() {
      if (
        this.form.username == "" ||
        this.form.password == "" ||
        this.form.school_name == ""
      ) {
        this.infoshow = true;
        this.info = "请输入详细的注册信息";
        return;
      }
      try {
        this.infoshow = true;
        this.info = "正在注册，请稍侯...";
        this.loginOverlay = true;
        this.overlayclass = true
        const { data: res } = await this.$http.post("/register", this.form);
        this.loginOverlay = false
        console.log(res)
        if ( res.meta.status != 0 ) {
          this.overlayclass = false
          this.info = '注册提交失败'
          return 
        }
        this.info = '注册提交成功，请等候管理员同意'
      } catch {
        this.loginOverlay = false;
        this.info = "连接区块链失败，请稍候重试";
        return;
      }
      // this.tempobj.graduateInfo = res.data.graduateInfo
      // this.bus.$emit('sendCerInfo', this.tempobj)
    },
  },
  beforeCreate() {
    if (window.sessionStorage.getItem('token') != null) {
      let is_admin = window.sessionStorage.getItem('is_admin')
      // console.log(is_admin)
      // console.log(is_admin == 'true')
      // console.log()
      if ( is_admin == 'true' ) {
        this.$router.push('/supermanager')
      } else {
        this.$router.push('/manager')
      }
    }
  }
};
</script>

<style scoped="scoped">
.info {
  width: 258px;
  text-align: center;
  height: 38px;
  line-height: 38px;
  border: 1px solid #f8d7da;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f8d7da;
}
.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.bform {
  width: 100%;
  height: 50%;
  /* padding: 2em 0; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 40%;
  /* height: 30px; */
  border: none;
  outline: none;
  border-radius: 8px;
  padding-left: 2em;
  background-color: #f0f0f0;
  height: 38px;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
.myprimary {
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  /* background-color: #007bff;
  border-color: #007bff; */
}
/* input {
    height: 36px;
    margin: 5px 0;
  } */
</style>
