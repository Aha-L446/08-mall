<template>
  <div id="app">
    <!-- 默认路由在离开后会对组件进行销毁，keep-alive 可以使被包含的组件保留状态，或避免重新渲染。 -->
    <keep-alive><router-view></router-view></keep-alive>
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
