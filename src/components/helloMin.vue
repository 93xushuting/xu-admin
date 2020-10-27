<template>
  <div class="container">
    <p>coo: {{ coo }}</p>
    <button @click="startUpRocket">点击</button>
  </div>
</template>

<script>
export default {
  name: 'helloMin',
  props: {
    coo: String
  },
  methods: {
    startUpRocket() {
      this.$emit('upRocket')
      console.log('startUpRocket')
    }
  }
}
</script>
