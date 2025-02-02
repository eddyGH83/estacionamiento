<template>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">HOME</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
       
        <li class="nav-item">
          <router-link to="/empleados" class="nav-link" aria-current="page">Empledos</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/vehiculos" class="nav-link" aria-current="page">Vehículos</router-link>
        </li>

      </ul>
    </div>
  </div>
</nav>


  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
