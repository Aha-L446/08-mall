<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <home-feature></home-feature>
    <tab-control class="home-tab-control" :tabControlArray="tabControlArray"></tab-control>

    <div style="height: 800px;"></div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import HomeRecommend from './childComps/HomeRecommend.vue'
  import HomeFeature from './childComps/HomeFeature.vue'

  import {getHomeMultidata} from 'network/home.js'
  // import * as homeApi from 'network/home.js'

  export default {
    name: 'home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
    },
    data() {
      return {
        banner: [],
        recommend: [],
        tabControlArray: ['流行', '新款', '精选']
      }
    },
    created() {
      getHomeMultidata().then((res) => {
        if (res.data && res.data.returnCode == 'SUCCESS') {
          this.banner = res.data.data.banner.list;
          this.recommend = res.data.data.recommend.list;
        } else {
          this.banner = [];
          this.recommend = [];
        }
      }).catch((err) => {
        this.banner = [];
        this.recommend = [];
      })
    },
    methods: {

    }
  }

  // 函数调用 -> 压入函数栈(保存函数调用过程中所有的变量)
  // 函数调用结束 -> 跳出函数栈(释放函数里所有的变量)
</script>

<style>
  .home {
    padding-top: 44px;
  }
  .home-nav {
    background: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .home-tab-control {
    position: sticky;
    top: 44px;
  }
</style>
