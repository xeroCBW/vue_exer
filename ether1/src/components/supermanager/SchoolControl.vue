<template>
  <div class="container">
    <b-overlay :show="overlay" rounded="sm" opacity="0.5">
      <h3 v-if="!hasSchoolInfo">{{ info }}</h3>
    </b-overlay>
    <b-overlay :show="rejectOverlay" rounded="sm" opacity="0.5">
    </b-overlay>
    <b-table  
      v-if="hasSchoolInfo"
      striped hover
      id="my-table"
      :items="items"
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
        <b-button size="sm" variant="outline-danger" @click="delSchool(data.item.schoolAddress)">删除权限</b-button>
      </template>
    </b-table>
    <b-pagination
      v-if="hasSchoolInfo"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rejectOverlay: false,
      hasSchoolInfo: false,
      info: "",
      overlay: false,
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "schoolName", label: "学校名称" },
        { key: "schoolAddress", label: "学校地址" },
        { key: "operation", label: "操作" },
      ],
      items: [],
    };
  },
  methods: {
    async delSchool(addr) {
      // console.log(addr);
      this.rejectOverlay = true
      const { data: res } = await this.$http.get(
        `/admin/delete?schoolAddress=${addr}`
      );
      this.rejectOverlay = false
      location.reload()
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  async created() {
    try {
      this.info = "正在查询学校信息，请稍候......";
      this.overlay = true;
      const { data: res } = await this.$http.get("/admin/show");
      this.overlay = false;
      // console.log(res);
      if (res.data.schoolInfo.length == 1) {
        console.log("aaa");
        this.info = "没有学校信息哦...";
        return;
      }
      this.hasSchoolInfo = true;
      this.items = res.data.schoolInfo;
      this.items.shift();
    } catch {
      this.overlay = false;
      this.info = "连接区块链失败，请稍候重试......";
      return;
    }
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