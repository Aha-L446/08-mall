import {debounce} from 'common/utils'

export const mixin = {
  data() {
    return {
      refreshObject: null, // refresh防抖函数对象
      itemImgLoadFun: null // refresh防抖函数回调的函数
    }
  },
  mounted() {
    console.log("进入混入");
    // 1、实例化抖动函数
    this.refreshObject = debounce(this.$refs.scroll.runRefresh, 500);

    // 2、监听 GoodsListItem.vue 图片加载--【事件总线】
    this.itemImgLoadFun = () => {
      if (typeof this.refreshObject === 'function') {
        this.refreshObject();
      }
    }
    this.$bus.$on('itemImgLoad', this.itemImgLoadFun);
  }
}
