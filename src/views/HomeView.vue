<template>
  <div class="home">
    <br><br>
    <img alt="Vue logo" src="../assets/parqueo.png" width="300px">
    <HelloWorld msg="¡BIENVENIDO!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
