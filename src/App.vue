<template>
  <div id="app">
    <h1>Blazing8</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./assets/sass/variables";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;900&display=swap");

#app {
  min-height: 100vh;
  color: $font-color;
  margin: 0 auto;
  max-width: 80%;
  font-family: $font-family;
  font-weight: 400;
}
</style>
