<template>
  <div class="container">
    <b-overlay :show="overlay" rounded="sm" opacity="0.5">
      <h3 v-if="!hasRegisterInfo">{{ info }}</h3>
    </b-overlay>
    <b-overlay :show="passOverlay" rounded="sm" opacity="0.5">
      <b-table
      v-if="hasRegisterInfo"
      striped hover 
      id="my-table"
      :items="registInfo"
      :per-page="perPage"
      :current-page="currentPage"
      small
      :fields="fields"
      class="text-center"
      responsive="sm">
      <template #cell(schoolName)="data">
        {{ data.item.schoolName }}
      </template>

      <template #cell(schoolAddress)="data">
        {{ data.item.schoolAddress }}
      </template>

      <template #cell(operation)="data">
        <b-button size="sm" variant="outline-primary" class="mr-3" @click="pass(data.item.schoolAddress)">授予权限</b-button>
        <b-button size="sm" variant="outline-danger" @click="refuse(data.item.schoolAddress,data.item.schoolName)">拒绝申请</b-button>
      </template>
    </b-table>
    <b-pagination
      v-if="hasRegisterInfo"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
    </b-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passOverlay: false,
      overlay: false,
      info: "",
      hasRegisterInfo: false,
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "schoolName", label: "学校名称" },
        { key: "schoolAddress", label: "账户地址" },
        { key: "operation", label: "操作" },
      ],
      registInfo: [],
    };
  },
  methods: {
    async pass(addr) {
      // console.log(addr)
      this.passOverlay = true
      const { data: res } = await this.$http.get(
        `/admin/pass?regist_addr=${addr}`
      );
      this.passOverlay = false
      location.reload();
      // 重新查询学校申请信息
      // try {
      //   this.hasRegisterInfo = false
      //   this.info = "正在查询学校申请信息，请稍候......";
      //   this.overlay = true;
      //   const { data: res } = await this.$http.get("/admin/registList");
      //   this.overlay = false;
      //   // console.log(res)
      //   if (res.data.registInfo.length == 0) {
      //     this.info = "没有学校申请信息哦...";
      //     return;
      //   }
      //   this.hasRegisterInfo = true;
      //   this.registInfo = res.data.registInfo;
      // } catch {
      //   this.overlay = false;
      //   this.info = "连接区块链失败，请稍候重试......";
      // }
      // const { data: resa } = await this.$http.post("/admin/registList");
      // this.registInfo = resa.data.registInfo
    },
    async refuse(addr, name) {
      this.passOverlay = true
      const { data: res } = await this.$http.get(
        `/admin/refuse?regist_addr=${addr}&regist_name=${name}`
      );
      this.passOverlay = false
      location.reload();
      // try {
      //   this.info = "正在查询学校申请信息，请稍候......";
      //   this.overlay = true;
      //   const { data: res } = await this.$http.get("/admin/registList");
      //   this.overlay = false;
      //   // console.log(res)
      //   if (res.data.registInfo.length == 0) {
      //     this.info = "没有学校申请信息哦...";
      //     return;
      //   }
      //   this.hasRegisterInfo = true;
      //   this.registInfo = res.data.registInfo;
      // } catch {
      //   this.overlay = false;
      //   this.info = "连接区块链失败，请稍候重试......";
      // }
      // console.log(res)
    },
  },
  computed: {
    rows() {
      return this.registInfo.length;
    },
  },
  async created() {
    // 查询列表
    try {
      this.info = "正在查询学校申请信息，请稍候......";
      this.overlay = true;
      const { data: res } = await this.$http.get("/admin/registList");
      this.overlay = false;
      // console.log(res)
      if (res.data.registInfo.length == 0) {
        this.info = "没有学校申请信息哦...";
        return;
      }
      this.hasRegisterInfo = true;
      this.registInfo = res.data.registInfo;
    } catch {
      this.overlay = false;
      this.info = "连接区块链失败，请稍候重试......";
    }
  },
  destroyed() {
    // console.log('destroyed')
  },
};
</script>
<style scoped>
/* * {
  margin: 0;
  padding: 0;
} */
.container {
  max-width: 1180px;
  border: 1px solid #ccc;
}
h3 {
  height: 70px;
  line-height: 70px;
  text-align: center;
}
</style>