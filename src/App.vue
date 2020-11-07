<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      // app level data
    }
  },
  components: {
  }
}
</script>

<style lang="scss">

   @mixin background-gradient {
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
  }

  html, body {
    height: 100%;
    margin: 0;
    @include background-gradient;
  }


  #app {
    height: 100%;
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // global


</style>
