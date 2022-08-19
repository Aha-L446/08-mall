<template>
  <div class="div-swiper">
    <div class="swiper">
      <slot></slot>
    </div>
    <div class="indicator">
      <div v-for="i in slideCount" :key="i"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NSwiperItem',
    props: {
      // slideCount: {
      //   type: Number,
      //   default: 4
      // },
      times: {
        type: Number,
        default: 3000
      },
      animDuration: {
        type: Number,
        default: 300
      }
    },
    data() {
      return {
        playTimer: null,
        slideCount: 4,
        currentIndex: 1,  // 当前slide
        swiperStyle: null, // swiper DOM
        totalWidth: null, // swiper的总宽度
        oneWidth: null, // 一个swiper的总宽度
        scrolling: false, // 是否在滚动
      }
    },
    mounted() {
      this.init();
      // this.handleDom();
      this.startTimer();
      setTimeout(() => {
        // 1.操作DOM, 在前后添加Slide
        this.handleDom();

        // 2.开启定时器
        // this.startTimer();
      }, 100)
    },
    methods: {
      init: function () {
        this.swiperStyle = document.getElementsByClassName("swiper")[0];
        this.oneWidth = this.swiperStyle.offsetWidth;
      },

      /**
       * 操作DOM, 在DOM前后添加Slide
       */
      handleDom: function () {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 2.保存个数
        this.slideCount = slidesEls.length;

        // 3.如果大于1个, 那么在前后分别添加一个slide
        // 【最前面slide作用：使得currentIndex（当前下标）从1开始，方便计算】
        // 【最后面slide作用：当滚动最后一张时，图片是下标为1的图片，视觉上滚动的方式一直是从右往左】
        if (this.slideCount > 1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.oneWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;
        }

        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.oneWidth);
      },

      /**
       * 定时器操作
       */
      startTimer: function () {
        this.playTimer = window.setInterval(() => {
          this.currentIndex++;
          // if (this.currentIndex > this.slideCount) {
          //   this.currentIndex = 0;
          // }
          this.scrollContent(-this.currentIndex * this.oneWidth);
        }, this.times)
      },
      stopTimer: function () {
        window.clearInterval(this.playTimer);
      },

      /**
       * 滚动到正确的位置
       */
      scrollContent: function (position) {
        // 0.设置正在滚动
        this.scrolling = true;

        // 1.开始滚动动画
        this.swiperStyle.transition = 'transform '+ this.animDuration + 'ms';
        this.setTransform(position);

        // 2.判断滚动到的位置
        // this.checkPosition();
        // 2.当滚动到最后一张图（视觉上是第一张），立马跳到第一张的正确位置
        // 【注意：transition:transform 300ms; 需得300ms后再设置 transition:0ms; 才会生效】
        if (this.currentIndex >= (this.slideCount + 1)) {
          window.setTimeout(() => {
            this.currentIndex = 1;
            this.swiperStyle.transition = '0ms';
            this.setTransform(-this.oneWidth);
            // this.setTransform(-this.currentIndex * this.oneWidth);
          }, this.animDuration)
        }

        // 4.滚动完成
        this.scrolling = false
      },

      /**
       * 设置滚动的位置
       */
      setTransform: function (position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },
    }
  }
</script>

<style>
  .div-swiper {
    position: relative;
    overflow: hidden;
  }
  .div-swiper .swiper {
    display: flex;
    transform: translate3d(0px, 0px, 0px);
    transition: all 0ms ease 0s;
  }
  .indicator {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
  }
  .indicator div {
    width: 8px;
    height: 8px;
    background: #666;
    display: inline-block;
    border-radius: 50%;
    margin: 0 5px;
  }
  .indicator div.active {
    background: rgba(212,62,46,1.0);
  }
</style>
