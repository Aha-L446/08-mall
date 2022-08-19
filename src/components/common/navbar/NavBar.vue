<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
</script>

<style>
  .nav-bar {
    display: flex;
    line-height: 44px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    font-size: 16px;
  }
  .nav-bar .left {
    width: 60px;
    text-align: left;
  }
  .nav-bar .center {
    flex: 1;
    text-align: center;
  }
  .nav-bar .right {
    width: 60px;
    text-align: right;
  }
</style>
