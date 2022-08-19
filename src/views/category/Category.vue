<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">分类</div></nav-bar>
    <h2>Category</h2>
    <n-swiper>
      <n-swiper-item v-for="(item, index) in banner">
        <a :href="item.link"><img :src="item.image" /></a>
      </n-swiper-item>
    </n-swiper>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from 'network/home.js'
  // import * as homeApi from 'network/home.js'

  import NSwiper from 'components/common/swiper2/Swiper'
  import NSwiperItem from 'components/common/swiper2/SwiperItem'

  export default {
    name: 'home',
    components: {
      NavBar,
      NSwiper,
      NSwiperItem
    },
    data() {
      return {
        banner: [],
        recommend: [],
      }
    },
    created() {
      getHomeMultidata().then((res) => {
        console.log(res.data.returnCode == 'SUCCESS');
        if (res.data && res.data.returnCode == 'SUCCESS') {
        console.log(res.data.data);
          this.banner = res.data.data.banner.list;
          this.recommend = res.data.data.recommend.list;
        } else {
          // this.banner = [];
          // this.recommend = [];
        }
      }).catch((err) => {
        this.banner = [];
        this.recommend = [];
      })
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }

  // 函数调用 -> 压入函数栈(保存函数调用过程中所有的变量)
  // 函数调用结束 -> 跳出函数栈(释放函数里所有的变量)
</script>

<style>
  .home-nav {
    background: var(--color-tint);
    color: #fff;
  }
</style>
