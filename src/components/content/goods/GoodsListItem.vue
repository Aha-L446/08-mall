<template>
  <div class="goods-list-item">
    <img :src="goods.spareGoodsImage.value.split(';')[0]" @load="imgLoad" />
    <p>{{goods.goodsName.value}}</p>
    <div>
      <span class="price">¥{{goods.sellPrice.value}}</span>
      <span class="star">☆{{goods.sellCount.value}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit('itemImgLoad');
      }
    }
  }
</script>

<style>
  .goods-list-item {
    width: 47%;
    flex-shrink: 0;
    margin: 2%;
    margin-right: 0;
  }
  .goods-list-item img {
    border-radius: 5px;
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
  .goods-list-item p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-list-item > div {
    text-align: center;
  }
  .goods-list-item .price {
    color: var(--color-tint);
    margin-right: 4px;
  }
</style>
