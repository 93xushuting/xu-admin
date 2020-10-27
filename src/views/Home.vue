<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world :foo="foo" :coo="coo" @upRocket="reciveRocket"></hello-world>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      foo: 'Hello, world',
      coo: 'hello, min'
    }
  },

  components: {
    HelloWorld
  },
  methods: {
    reciveRocket() {
      console.log('min-success')
    }
  }
}
</script>
