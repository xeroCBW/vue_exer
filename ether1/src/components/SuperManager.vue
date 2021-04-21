<template>
  <div>
    <div class="header">
      <div class="headercontainer">
        <div class="left">
          <ul>
            <li>基于区块链的学位学历认证系统</li>
          </ul>
        </div>
        <div class="right">
          <a href="#" @click="gotoIndex()">首页</a>
        </div>
      </div>
    </div>
    <div class="container2">
      <b-nav tabs justified>
        <b-nav-item to="registerinfo" replace exact exact-active-class="active">权限申请</b-nav-item>
        <b-nav-item to="schoolcontrol" replace exact exact-active-class="active">学校管理</b-nav-item>
      </b-nav>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Header from "../components/IndexHeader";
export default {
  components: {
    Header,
  },
  methods: {
    gotoIndex() {
      this.$router.replace('/index')
    }
  },
  beforeCreate() {
    if (window.sessionStorage.getItem("token") == null) {
      this.$router.replace("/index");
      return;
    } 
    console.log(window.sessionStorage.getItem('is_admin'))
    if ( window.sessionStorage.getItem('is_admin') != 'true' ) {
      this.$router.replace("/index");
      return;
    }
    // console.log(window.sessionStorage.getItem('tokena'))
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container2 {
  width: 1180px;
  margin: 0 auto;
  overflow: hidden;
}
ul {
  font-size: 26px;
}

.header {
  width: 100%;
  margin: 0 auto;
  /* background-color: #86a0b8; */
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  height: 76px;
  border-radius: 3px;
}
.headercontainer {
  width: 1180px;
  margin: 0 auto;
}
.header li {
  color: #40586d;
  line-height: 72px;
  font-size: 32px;
  list-style: none;
  float: left;
}
.header li:nth-child(2) {
  margin: 0 20px;
}
.header li:nth-child(3) {
  margin-right: 20px;
}
.header {
  margin-bottom: 32px;
}
.header a {
  float: right;
  line-height: 76px;
}
</style>