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
  <div class="container">
    <div class="left">
      <ManagerForm></ManagerForm>
    </div>
    <div class="right">
      <Certificate :schoolName="schoolName"></Certificate>
    </div>
  </div>
</div> 
</template>
<script>
import ManagerForm from "../components/manager/ManagerForm";
import Certificate from "../components/manager/Certificate";
export default {
  data() {
    return {
      schoolName: "中国科学技术大学",
      form: {},
    };
  },
  methods: {
    gotoIndex() {
      this.$router.replace('/index')
    }
  },
  components: {
    ManagerForm,
    Certificate,
  },
  created() {
    if (window.sessionStorage.getItem("token") == null) {
      this.$router.replace("/index");
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
.container {
  width: 1180px;
  margin: 0 auto;
  background-color: #edeff3;
  overflow: hidden;
  margin-top: 16px;
  border-radius: 12px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 18px;
}
.left {
  width: 500px;
  float: left;
  margin-left: 24px;
  /* margin-bottom: 36px; */
}
.right {
  width: 520px;
  float: right;
  /* margin-top: 24px; */
  /* margin-bottom: 36px; */
  margin-right: 38px;
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
.header a {
  float: right;
  line-height: 76px;
}
</style>