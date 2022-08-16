<template>
  <tab-bar>
    <!-- 定义的组件名称，在使用时大小写之间可使用“-”进行连接 -->
    <tab-bar-item path="/home" :defaultClass="defaultClass" :activeClass="activeClass">
      <!-- 已在webpack.base.conf.js配置src/components的别名，在DOM中需加~前缀 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" :defaultClass="defaultClass" :activeClass="activeClass">
      <img slot="item-icon" src="@/assets/img/tabbar/category.svg" />
      <img slot="item-icon-active" src="@/assets/img/tabbar/category_active.svg" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" :defaultClass="defaultClass" :activeClass="activeClass">
      <img slot="item-icon" src="@/assets/img/tabbar/cart.svg" />
      <img slot="item-icon-active" src="@/assets/img/tabbar/cart_active.svg" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" :defaultClass="defaultClass" :activeClass="activeClass">
      <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" />
      <img slot="item-icon-active" src="@/assets/img/tabbar/profile_active.svg" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "@/components/common/tabbar/TabBar.vue"
  import TabBarItem from "@/components/common/tabbar/TabBarItem.vue"

  export default {
    data() {
      return {
        defaultClass: {},
        activeClass: {}
      }
    },
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
  .defaultClass {
    color: #000;
  }
  .activeClass {
    color: #ff5777;
  }
</style>
