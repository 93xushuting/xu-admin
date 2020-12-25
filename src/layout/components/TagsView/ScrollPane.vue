<template>
  <el-scrollbar ref="scrollContainer" class="scroll-container">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
// const tagAndTagSpacing = 4
export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0
    }
  },
  computed: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
</style>
