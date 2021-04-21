<template>
  <b-form>
    <!-- <b-form-group id="input-group-1" label="姓名:" label-for="name">
      <b-form-input id="name" placeholder="请输入姓名" name="name" required v-model="form.name"></b-form-input>
    </b-form-group> -->
    <b-form-group id="input-group-2" label="证书编号:" label-for="cerNum">
      <b-form-input id="cerNum" placeholder="请输入证书编号" name="cerNum" required v-model="form.cerNum"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-3" label="身份证号:" label-for="idNum">
      <b-form-input id="idNum" placeholder="请输入身份证号" name="idNum" required v-model="form.idNum"></b-form-input>
    </b-form-group>
    <b-overlay :show="cerNumShow" rounded="sm" opacity="0.5">
      <b-alert show v-model="infoshow" fade dismissible>{{ info }}</b-alert>
    </b-overlay>
    <b-button type="submit" variant="primary" class="query" @click.prevent="query()">查询</b-button>
    <b-button type="reset" variant="danger">重新输入</b-button>
  </b-form>
</template>
<script>
export default {
  data() {
    return {
      cerNumShow: false, // 添加蒙版，转圈圈
      infoshow: false,
      info: "",
      form: {
        // name: '',
        cerNum: "",
        idNum: "",
      },
      tempobj: {
        graduateInfo: [],
      },
    };
  },
  methods: {
    async query() {
      if (this.form.cerNum == "" || this.form.idNum == "") {
        this.infoshow = true;
        this.info = "请输入身份证号和证书编号";
        return;
      }
      // 校验身份证号和证书编号格式
      let idReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (this.form.idNum.match(idReg) == null) {
        this.infoshow = true;
        this.info = "身份证号格式不对,请重新输入";
        return;
      }
      let cerReg = /^\d{18}$/;
      if (this.form.cerNum.match(cerReg) == null) {
        this.infoshow = true;
        this.info = "证书编号格式不对,请重新输入";
        return;
      }

      this.infoshow = true;
      this.cerNumShow = true;
      this.info = "正在查询，请稍后......";
      try {
        const { data:res } = await this.$http.post("/certification/queryDetail", this.form);
        this.infoshow = false;
        this.cerNumShow = false;

        // console.log(res)
        if (res.meta.status == 404) {
          this.tempobj.graduateInfo = [];
          this.bus.$emit("sendCerInfo", this.tempobj);
          return;
        }
        this.tempobj.graduateInfo = res.data.graduateInfo;
        this.bus.$emit("sendCerInfo", this.tempobj);
      } catch {
        this.cerNumShow = false;
        this.info = "连接区块链失败，请稍后重试......";
        return;
      }
      // this.tempobj.name = this.form.name
    },
  },
};
</script>
<style scoped>
.btn-primary {
  margin-right: 5px;
}
#input-group-1 {
  margin-top: 8px;
}
</style>