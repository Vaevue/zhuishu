<template>
  <div id="app">
    <v-top></v-top>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vTop from './views/index/top'
import vFooter from './views/common/footer'
export default {
  name: 'App',
  components:{vTop,vFooter}
}
</script>

<style>
</style>
