<template>
  <b-form>
    <!-- <b-form-group id="input-group-1" label="姓名:" label-for="name">
      <b-form-input id="name" name="name" placeholder="请输入姓名" required v-model="form.name"></b-form-input>
    </b-form-group> -->
    <b-form-group id="input-group-2" name="idNum" label="身份证号:" label-for="address" required>
      <b-form-input
        id="address"
        placeholder="请输入身份证号"
        required
        v-model="form.idNum"
      ></b-form-input>
    </b-form-group>
    </b-form-group>
    <b-overlay :show="idNumShow" rounded="sm" opacity="0.5">
      <b-alert show v-model="infoshow" fade dismissible>{{ info }}</b-alert>      </b-overlay>
    <b-button type="submit" variant="primary" @click.prevent="query()">查询</b-button>
    <b-button type="reset" variant="danger">重新输入</b-button>
  </b-form>
</template>
<script>
export default {
  data() {
    return {
      idNumShow: false, // 添加蒙版，转圈圈
      infoshow: false,
      info: "",
      form: {
        // name: '',
        idNum: "",
      },
      tempobj: {
        graduateInfo: [],
      },
    };
  },
  methods: {
    async query() {
      if (this.form.idNum == "") {
        this.infoshow = true;
        this.info = "请输入身份证号";
        return;
      }
      let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (this.form.idNum.match(reg) == null) {
        this.infoshow = true;
        this.info = "身份证号格式不对,请重新输入";
        return;
      }
      this.infoshow = true;
      this.idNumShow = true;
      this.info = "正在查询，请稍候......";
      try {
        const { data: res } = await this.$http.post("/certification/query", {
          idNum: this.form.idNum,
        });
        this.infoshow = false;
        this.idNumShow = false;
        this.tempobj.graduateInfo = res.data.graduateInfo;
        this.bus.$emit("sendCerInfo", this.tempobj);
      } catch {
        this.idNumShow = false;
        this.info = "连接区块链失败，请稍后重试......";
        return;
      }
    },
  },
};
</script>

<style scoped>
#input-group-1 {
  margin-top: 8px;
}
.btn-primary {
  margin-right: 5px;
}
</style>