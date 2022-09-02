<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>

    <tab-control ref="tabControl2" :tabControlArray="tabControlArray"
      @currName="changeTabControl" class="home-tab-control-2" v-show="isTabFixed"></tab-control>

    <scroll ref="scroll" :scrollConfig="scrollConfig" @scrollEvent="scrollEventFun" @loadMore="loadMoreFun">
    <!-- <scroll ref="scroll" :scrollConfig="scrollConfig" :scrollEventFun="scrollEventFun"> -->
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoadFun"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-feature></home-feature>
      <tab-control ref="tabControl" :tabControlArray="tabControlArray"
        @currName="changeTabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top v-show="showBackTop" @click.native="backTopFun"></back-top>
    <!-- <div style="height: 800px;"></div> -->

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import HomeRecommend from './childComps/HomeRecommend.vue'
  import HomeFeature from './childComps/HomeFeature.vue'

  import {getHomeMultidata, getHomeGoods} from 'network/home.js'
  // import * as homeApi from 'network/home.js'
  import {debounce} from 'common/utils.js'

  export default {
    name: 'home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banner: [],
        recommend: [],
        tabControlArray: [
          {name: 'pop', value: '流行'},
          {name: 'new', value: '新款'},
          {name: 'sell', value: '精选'},
        ],
        goods: {
          pop: {page: 0, list:[], finish: false},
          new: {page: 0, list:[], finish: false},
          sell: {page: 0, list:[], finish: false},
        },
        currkey: 'pop',
        scrollConfig: {
          probeType: 3,
          pullUpLoad: true,
          click: true
        },
        showBackTop: false, // 回到顶部
        offsetTop: 0, // tabControl的offsetTop
        isTabFixed: false, // tabControl是否吸顶
      }
    },
    beforeCreate() {

    },
    created() {
      // 1、请求轮播数据
      this.homeMultidata();

      // 2、请求商品数据
      this.homeGoods({firstType: 1}, 'pop');
      this.homeGoods({firstType: 4}, 'new');
      this.homeGoods({firstType: 7}, 'sell');
    },
    mounted() { // 组件挂载，但不包括图片的加载
      var refresh = debounce(this.$refs.scroll.runRefresh, 500);
      // 3、监听 GoodsListItem.vue 图片加载
      this.$bus.$on('itemImgLoad', () => {
        // this.$refs.scroll.runRefresh();
        refresh();
      });
    },
    computed: {
      showGoods() {
        return this.goods[this.currkey].list;
      }
    },
    methods: {
      /**
       * 网络请求相关的方法
       */
      homeMultidata() {
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
      homeGoods(data, key) {
        data.page = this.goods[key].page + 1;
        getHomeGoods(data).then((res) => {
          if (res.data.status == 1) {
            if (res.data.datas.rows && res.data.datas.rows.length > 0) {
              this.goods[key].page++;
              this.goods[key].list.push(...res.data.datas.rows);
            } else {
              this.goods[key].finish = true;
            }
          }
          this.$refs.scroll.runFinishPullUp();
        }).catch(() => {
          this.$refs.scroll.runFinishPullUp();
        })
      },
      /**
       * 事件监听相关方法
       */
      // 切换底部商品
      changeTabControl(data) {
        // 1、更新currkey
        this.currkey = data;

        // 2、解决点击tabControl后，tabControl2的样式没有同步；或点击tabControl2后，tabControl的样式没有同步
        this.$refs.tabControl.currName = data;
        this.$refs.tabControl2.currName = data;
      },
      // Better-scroll的滚动 -- $emit
      scrollEventFun(position) {
        // 1、判断BackTop是否显示
        this.showBackTop = (-position.y) > 50;

        // 2、判断tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.offsetTop;
      },
      // 回到底部
      backTopFun() {
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500); // x, y, ms
        this.$refs.scroll.runScrollTo(0, 0);
      },
      // 拉到底部后，加载商品 -- $emit
      loadMoreFun() {
        switch(this.currkey) {
          case 'pop':
            if (!this.goods['pop'].finish) {
              this.homeGoods({firstType: 1}, 'pop');
            }
            break;
          case 'new':
            if (!this.goods['new'].finish) {
              this.homeGoods({firstType: 4}, 'new');
            }
            break;
          case 'sell':
            if (!this.goods['sell'].finish) {
              this.homeGoods({firstType: 7}, 'sell');
            }
            break;
        }
      },
      // 监听轮播图加载
      swiperImageLoadFun() {
        this.offsetTop = this.$refs.tabControl.$el.offsetTop;
      },
    }
  }

  // 函数调用 -> 压入函数栈(保存函数调用过程中所有的变量)
  // 函数调用结束 -> 跳出函数栈(释放函数里所有的变量)
</script>

<style>
  .home {
    height: 100vh;
  }
  .home-nav {
    background: var(--color-tint);
    color: #fff;

    /* 【原来是使用浏览器的原生滚动，需要固定nav-bar，
    但Better-scroll已是固定的滚动区域，故这里不需要position: fixed了】 */
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1; */
  }
  .home-tab-control {
    position: sticky;
    top: 44px;
  }
  .home-tab-control-2 {
    /* position: fixed;
    left: 0;
    right: 0;
    top: 44px; */

    /* 【因为使用的是Better-scroll，故这里不需要position: fixed。
    设置position: relative，主要是z-index，使其显示在上层】 */
    position: relative;
    z-index: 1;
  }
  /* 滚动条样式 */
  .wrapper {
    /* height: calc(100% - 44px - 49px); */
    overflow: hidden;
    position: absolute; /* 加上定位后,脱离文档流,使得鼠标的滚动对其无效 */
    top: 44px;
    left: 0;
    right: 0;
  }
  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 回到顶端按钮样式 */
  .back-top {
    bottom: 55px;
  }
</style>
