<template>
  <div class="tab-control">
    <div v-for="(item, index) in tabControlArray" :key="index"
        :class="{active: currName === item.name}"
        @click="changeIndex(item.name)">
      <span>{{item.value}}</span>
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
        currName: ''
      }
    },
    created() {
      this.currName = this.tabControlArray[0].name; // 获取第一个菜单
    },
    methods: {
      changeIndex(name) {
        this.currName = name;
        this.$emit("currName", name);
      }
    }
  }
</script>

<style>
  .tab-control {
    display: flex;
    line-height: 40px;
    background: #fff;
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
