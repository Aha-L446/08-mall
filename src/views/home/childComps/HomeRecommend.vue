<template>
  <div class="home-recommend">
    <a v-for="item in recommend" :key="item.sort" :href="item.link">
      <img :src="item.image" />
      <div>{{item.title}}</div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommend',
    props: {
      recommend: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style>
  .home-recommend {
    display: flex;
    padding: 10px 0 10px;
    border-bottom: 10px solid #eee;
  }
  .home-recommend a {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .home-recommend img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    margin-bottom: 10px;
  }
</style>
