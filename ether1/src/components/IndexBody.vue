<template>
  <div class="body">
    <IndexBodyLeft></IndexBodyLeft>
    <IndexBodyRight></IndexBodyRight>
  </div>
</template>
<script>
import IndexBodyLeft from '../components/IndexBodyLeft'
import IndexBodyRight from '../components/IndexBodyRight'
export default({
  data() {
    return{

    }
  },
  components: {
    IndexBodyLeft,
    IndexBodyRight
  }
})
</script>

<style scoped>
.body {
  width: 1180px;
  margin: 10px auto 0;
  min-height: 550px;
  background-color: #ccc;
  /* height: 500px;
   */
  overflow: hidden;
  padding-left: 20px;
  border-radius: 5px;
  padding: 10px;
}
</style>