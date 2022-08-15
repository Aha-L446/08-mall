<template>
  <tab-bar>
    <!-- 定义的组件名称，在使用时大小写之间可使用“-”进行连接 -->
    <tab-bar-item path="/home">
      <!-- 已在webpack.base.conf.js配置src/components的别名 -->
      <img slot="item-icon" src="~assets/img/tabbar/share-1.png" />
      <img slot="item-icon-active" src="~assets/img/tabbar/share-2.png" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="@/assets/img/tabbar/share-1.png" />
      <img slot="item-icon-active" src="@/assets/img/tabbar/share-2.png" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="@/assets/img/tabbar/share-1.png" />
      <img slot="item-icon-active" src="@/assets/img/tabbar/share-2.png" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/share-1.png" />
      <img slot="item-icon-active" src="@/assets/img/tabbar/share-2.png" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "@/components/common/tabbar/TabBar.vue"
  import TabBarItem from "@/components/common/tabbar/TabBarItem.vue"

  export default {
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
</style>
