<template>
  <div class="tab-bar-item" @click="clickTabbarFun">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- <div :class="{active: isActive}"> -->
    <div :class="{defaultClass: !isActive, activeClass: isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      path: String,
      defaultClass: Object,
      activeClass: Object
    },
    computed: {
      isActive() {
        // 计算属性：this.$route.path 或 this.path 改变时，
        // 则重新计算 isActive。【注意：isActive 不可再定义在data里】
        return this.$route.path.indexOf(this.path) !== -1;
      }
    },
    methods: {
      clickTabbarFun() {
        this.$router.push(this.path);
      }
    },
  }
</script>

<style>
  .tab-bar-item {
    height: 49px; /* tab-bar的高度为49px */
    text-align: center;
    flex: 1;
    font-size: 14px;
    /* color: #000; */
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 3px;
    margin-bottom: 2px;
  }
  /* .active {
    color: #ff5777;
  } */
</style>
