import {debounce} from 'common/utils'

export const mixin = {
  data() {
    return {
      itemImgLoadFun: null
    }
  },
  mounted() {
    console.log("进入混入");
    // 1、实例化抖动函数
    this.refresh = debounce(this.$refs.scroll.runRefresh, 500);

    // 2、监听 GoodsListItem.vue 图片加载--【事件总线】
    this.itemImgLoadFun = () => {
      if (typeof this.refresh === 'function') {
        this.refresh();
      }
    }
    this.$bus.$on('itemImgLoad', this.itemImgLoadFun);
  }
}
