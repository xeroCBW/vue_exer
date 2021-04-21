<template>
  <div class="">
    <IndexHeader></IndexHeader>
    <IndexBody></IndexBody>
    <!-- <router-link to="leftname"></router-link>
    <router-view></router-view> -->
  </div>
</template>
<script>
import IndexHeader from '../components/IndexHeader'
import IndexBody from '../components/IndexBody'
export default ({
  setup() {
    
  },
  components: {
    IndexHeader,
    IndexBody
  }
})
</script>