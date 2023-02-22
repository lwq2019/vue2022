<template>
  <div class="loading" v-show="visible">
    加载中...
  </div>
</template>

<script>
  export default {
    name: "pageLoading",
    data() {
      return {
        visible: false
      };
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>

<style scoped>
  .loading {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    padding: 8px 10px;
  }
</style>