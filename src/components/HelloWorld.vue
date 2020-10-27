<template>
  <div class="container">
    <p>foo: {{ foo }}</p>
    <!-- <p>attrs: {{$attrs}}</p> -->
    <hello-min v-bind="$attrs" v-on="$listeners"></hello-min>
  </div>
</template>

<script>
import helloMin from '@/components/helloMin.vue'

export default {
  name: 'HelloWorld',
  props: {
    foo: String
  },
  inheritAttrs: false,
  components: {
    helloMin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
