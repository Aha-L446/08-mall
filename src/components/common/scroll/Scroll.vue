<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      scrollConfig: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        scroll
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, this.scrollConfig);

      if (this.scrollConfig.probeType == 2 || this.scrollConfig.probeType == 3) {
        // 监听滚动
        this.scroll.on('scroll', (position) => {
          // this.$parent.scrollEventFun(position.y);
          this.$emit('scrollEvent', position);
        })
      }

      if (this.scrollConfig.pullUpLoad) {
        // 监听拉到底部
        this.scroll.on('pullingUp', () => {
          this.$emit('loadMore');
        })
      }
    },
    methods: {
      // 刷新Better-scroll，主要是重新计算scrollerHeight的值（content的高度）
      runRefresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh(); // 可能会出现scroll暂未初始化完成，该方法就已被调用，故需加判断
      },
      // 滚动到特定位置
      runScrollTo(x, y, time = 300) { // 当调用时，不传递time，会使用默认值
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time); // x, y, ms
      },
      // finishPullUp--拉到底部后，需要执行 finishPullUp() 才会继续监听拉到底部
      runFinishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
      }
    }
  }
</script>

<style>
</style>
