<template>
  <div class="certificateContainer">
    <!-- <h1 v-if="!flag">请输入证书</h1> -->
    <div class="certificatecard">
      <img src="../../assets/images/tempimg.jpg" alt="">
      <div class="infodiv">
        <h1 v-if="!flag" :class="{ redflag: redflag }">请先生成证书</h1>
        <div v-if="flag">
          <p>{{ $props.schoolName + '------专业：' + form.major }}</p>
          <p>{{ '入学时间：' + form.admissionTime + '-----毕业时间：' + form.graduateTime }}</p>
          <p>{{ form.degree }}证书编号：{{ form.cerNum }}</p>
          <p>身份证号：{{ form.idNum }}</p>
        </div>
      </div>
    </div>

    <div>
      <b-overlay :show="upshow" rounded="sm" opacity="0.5">
        <b-alert v-model="upCerInfoShow" :variant="upCerInfoVariant" class="upInfo" dismissible>{{ upCerInfo }}</b-alert>
      </b-overlay>
      <b-button type="button" variant="primary" @click="upCer()">证书上链</b-button>
    </div>

    <b-form-group id="input-group-1" label="证书编号:" label-for="deleteCerNum">
        <b-form-input
          id="deleteCerNum"
          placeholder="请输入要删除的证书编号"
          v-model="deleteCerNum"
          required
        ></b-form-input>
        <b-overlay :show="deleteshow" rounded="sm" opacity="0.5">
          <b-alert 
            v-model="deleteCerInfoShow" 
            :variant="deleteCerInfoVariant" 
            class="deleteInfo"
            dismissible>
            {{ deleteCerInfo }}
          </b-alert>
        </b-overlay>
        <b-button type="button" variant="danger" @click="deleteCer()">删除证书</b-button>
    </b-form-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      upshow: false,
      deleteshow: false,
      form: {},
      flag: false,
      redflag: false,
      upCerInfoShow: false,
      upCerInfoVariant: "primary",
      upCerInfo: "",
      deleteCerNum: "",
      deleteCerInfoShow: "true",
      deleteCerInfoVariant: "primary",
      deleteCerInfo: "出错啦",
    };
  },
  created() {
    this.bus.$on("generateCer", (data) => {
      this.form = data;
      this.flag = true;
    });
  },
  methods: {
    async upCer() {
      if (!this.form.idNum) {
        this.redflag = true;
        return;
      }
      // console.log(this.form)
      this.upCerInfoShow = true;
      this.upshow = true;
      this.upCerInfo = "正在进行上链操作，请稍候...";
      try {
        const { data: res } = await this.$http
          .post("/manager/upload", this.form)
          .catch();
        this.upshow = false;
        if (res.meta.status == 1) {
          this.upCerInfoShow = true;
          this.upCerInfo = "证书已经存在，上链失败";
          this.upCerInfoVariant = "danger";
          return;
        }
        this.upCerInfoShow = true;
        this.upCerInfo = "证书上链成功";
        this.upCerInfoVariant = "success";
      } catch (e) {
        this.upshow = false;
        this.upCerInfo = "连接区块链失败,请稍候再试";
        return;
      }
      // console.log(res)
    },
    async deleteCer() {
      // 表单为空，提示信息
      if (this.deleteCerNum == "") {
        this.deleteCerInfoShow = true;
        this.deleteCerInfo = "请输入要删除的证书编号!!!";
        this.deleteCerInfoVariant = "danger";
        return;
      }
      let deleteCerReg = /^\d{18}$/;
      if (this.deleteCerNum.match(deleteCerReg) == null) {
        this.deleteCerInfoShow = true;
        this.deleteCerInfo = "证书编号格式不对,请重新输入";
        this.deleteCerInfoVariant = "danger";
        return;
      }
      this.deleteCerInfoShow = true;
      this.deleteshow = true;
      this.deleteCerInfo = "正在进行删除证书操作，请稍候...";
      // 连链查询
      try {
        const { data: res } = await this.$http.post("/manager/delete", {
          cerNum: this.deleteCerNum,
        });
        this.deleteshow = false;
        // console.log(res)
        // 拿到数据，进行判断处理
        if (res.meta.status == 1) {
          this.deleteCerInfoShow = true;
          this.deleteCerInfo = "证书编号不存在,删除失败";
          this.deleteCerInfoVariant = "danger";
          return;
        }
        this.deleteCerInfoShow = true;
        this.deleteCerInfo = "删除成功!!!";
        this.deleteCerInfoVariant = "success";
      } catch {
        this.deleteshow = false;
        this.deleteCerInfo = "连接区块链失败,请稍候再试";
        return;
      }
    },
  },
  props: {
    schoolName: String,
  },
};
</script>
<style scoped>
.certificateContainer {
  padding-right: 20px;
}
.certificatecard {
  margin-top: 18px;
  position: relative;
  width: 500px;
  height: 268px;
  border: 3px solid #fff;
  border-radius: 3px;
}
.certificatecard:hover {
  box-shadow: 0px 0px 1.5rem #86a0b8;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  opacity: 0.6;
}
.infodiv {
  position: absolute;
  left: 18px;
  top: 18px;
  font-size: 18px;
}
button {
  margin-top: 12px;
}
.redflag {
  color: red;
}
#input-group-1 {
  margin-top: 36px;
  /* margin-right: 20px; */
  border: 3px solid #fff;
  padding: 20px;
}
#input-group-1:hover {
  box-shadow: 0px 0px 1.5rem #86a0b8;
}
.upInfo {
  /* margin-right: 20px; */
  margin-top: 20px;
}
.deleteInfo {
  margin-top: 16px;
}
</style>