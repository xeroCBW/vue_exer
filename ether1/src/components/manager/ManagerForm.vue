<template>
  <div class="container">
    <div class="upchain">
      <b-form>
        <b-form-group id="input-group-2" label="身份证号:" label-for="idNum">
          <b-form-input
            id="idNum"
            placeholder="请输入身份证号"
            v-model="form.idNum"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="专业:" label-for="major">
          <b-form-input
            id="major"
            placeholder="请输入专业"
            v-model="form.major"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="证书编号:" label-for="cerNum">
          <b-form-input
            id="cerNum"
            placeholder="请输入证书编号"
            v-model="form.cerNum"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="学历" label-for="level">
        <b-form-select
          id="level"
          v-model="form.level"
          :options="levels"
          required
        ></b-form-select>
      </b-form-group>
        <label for="example-datepicker">入学时间</label>
        <b-form-datepicker
          id="example-datepicker"
          class="mb-2"
          v-model="form.admissionTime"
        ></b-form-datepicker>
        <!-- <p>Value: '{{ value }}'</p> -->
        <label for="example-datepicker">毕业时间</label>
        <b-form-datepicker
          id="example-datepicker"
          class="mb-2"
          v-model="form.graduateTime"
        ></b-form-datepicker>
        <b-alert v-model="infoshow" variant="danger" dismissible>{{ info }}</b-alert>
        <!-- <p>Value: '{{ value }}'</p> -->
        <div class="button2">
          <b-button type="button" variant="primary" @click="generateCer()">生成证书</b-button>
          <b-button type="reset" variant="danger">重新输入</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      infoshow: false,
      info: '',
      infoshow1: false,
      infoshow2: false,
      infoshow3: false,
      info1: '',
      info2: '',
      info3: '',
      form: {
        idNum: "",
        major: "",
        level: 0,
        admissionTime: "",
        graduateTime: "",
        cerNum: "",
      },
      levels: [
        { value: 0, text: '本科' },
        { value: 1, text: '硕士' },
        { value: 2, text: '博士' }
      ]
    };
  },
  methods: {
    generateCer() {
      // console.log(this.form)
      if(this.form.idNum == '' || this.form.major == '' || this.form.cerNum == '' || this.form.admissionTime == '' || this.form.graduateTime == '') {
        this.infoshow = true
        this.info = '请输入证书的完整信息'
        return
      }

      // 校验身份证号和证书编号格式      
      let idReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if ( this.form.idNum.match(idReg) == null ) {
        this.infoshow = true
        this.info = '身份证号格式不对,请重新输入'
        return
      }
      let cerReg = /^\d{18}$/
      if ( this.form.cerNum.match(cerReg) == null ) {
        this.infoshow = true
        this.info = '证书编号格式不对,请重新输入'
        return
      }

      this.bus.$emit("generateCer", this.form);
    },
  },
};
</script>
<style scoped>
.container {
  width: 1180px;
  margin: 0 auto;
}
.upchain {
  margin-top: 16px;
  width: 500px;
}
.button2 {
  margin-top: 18px;
}
.btn-primary {
  margin-right: 18px;
}
</style>
