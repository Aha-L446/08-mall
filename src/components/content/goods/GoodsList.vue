<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    components: {
      GoodsListItem,
    },
    props: {
      goods: Array,
      default: []
    }
  }
</script>

<style>
  .goods-list {
    display: flex;
    /* justify-content: space-between; */
    /* justify-content: space-around; */
    flex-wrap: wrap;
    /* padding: 3%; */
  }
</style>
