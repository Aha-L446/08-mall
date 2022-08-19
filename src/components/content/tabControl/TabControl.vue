<template>
  <div class="tab-control">
    <div v-for="(item, index) in tabControlArray" :key="index"
        :class="{active: currIndex === index}"
        @click="changeIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      tabControlArray: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        currIndex: 0
      }
    },
    methods: {
      changeIndex(index) {
        this.currIndex = index;
      }
    }
  }
</script>

<style>
  .tab-control {
    display: flex;
    line-height: 40px;
  }
  .tab-control > div {
    flex: 1;
    text-align: center;
  }
  .tab-control span {
    padding: 5px;
  }
  .tab-control .active span {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
