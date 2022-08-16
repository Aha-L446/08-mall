<template>
  <div id="app">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/content/tabbar/Tabbar.vue'

export default {
  name: 'app',
  components: {
    Tabbar
  }
}
</script>

<style>
@import "./assets/css/base.css";

#app {

}
</style>
