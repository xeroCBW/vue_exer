<template>
  <div class="graduateInfo">
    <h3 v-if="!hasInfo">{{ info }}</h3>
    <h3 v-if="hasInfo">查询到如下证书：</h3>
    <div v-for="(item,index) in obj.graduateInfo" :key="index" class="mycard">
      <b-card
        :header="item.schoolName"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        :footer="item.degree"
        footer-tag="footer"
        :title="item.major"
      >
        <b-card-text>{{ item.graduateTime }}</b-card-text>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasInfo: false,
      // obj: {}
      obj: {
      },
      info: '请输入相关信息查询证书'
    };
  },
  methods: {

  },
  created () {
    this.bus.$on('sendCerInfo', obj => {
      // console.log(obj)
      this.obj = obj
      if (this.obj.graduateInfo.length == 0) {
        this.hasInfo = false
        this.info = '没有查到证书相关信息哦'
        return
      }
      this.hasInfo = true
    })
  },
  computed: {
    getlevel(flag){
      console.log(flag)
    }
  }
};
</script>
<style scoped>
.graduateInfo {
  width: 500px;
  float: right;
  margin-right: 80px;
}
.mycard:first-child {
  margin-top: 18px;
}
.card {
  margin: 20px 0;
}
h3 {
  margin-top: 16px;
}
</style>
