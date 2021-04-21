<template>
  <div class="header">
    <div class="headercontainer">
      <div class="left">
        <ul>
          <li>基于区块链的学位学历认证系统</li>
        </ul>
      </div>
      <div class="right">
        <a href="#" @click="login">登录</a>
      </div>
    </div>
  </div>
</template>
<script>
export default({
  data() {
    return {
      message: ''
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    }
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  margin: 0 auto;
  /* background-color: #86a0b8; */
  background: linear-gradient( 135deg,rgb(57,167,176),rgb(56,183,145));
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
  font-size : 32px;
  list-style: none;
  float: left;
}
.header li:nth-child(2) {
  margin: 0 20px;
}
.header li:nth-child(3) {
  margin-right: 20px;
}

.header a {
  float: right;
  line-height: 76px;
}
</style>