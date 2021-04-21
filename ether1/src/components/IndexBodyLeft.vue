<template>
  <div class="left">
    <b-nav tabs>
      <b-nav-item to="leftIdNum" exact exact-active-class="active">身份证号查询</b-nav-item>
      <b-nav-item to="leftCerNum" exact exact-active-class="active">编号查询</b-nav-item>
    </b-nav>
    <!-- <router-link to="leftname"></router-link>
    <router-link to="leftnumber"></router-link> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: true,
      flag: true
    }
  },
  methods: {
    toggle1() {
      this.$router.replace('leftname')
      this.active = !this.active
    },
    toggle2() {
      this.$router.replace('leftnumber')
      this.active = !this.active
    }
  }
};
</script>
<style scoped>
.left {
  width: 400px;
  float: left;
  overflow: hidden;
  margin: 20px;
}
.nav {
  margin-bottom: 12px;
}
</style>