<template>
  <div id="app">
    <img src="./assets/fordotosanlogo.png" width="50%" height="50%">
    <br />
    <img src="./assets/openxclogo.png" width="25%" height="25%">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
