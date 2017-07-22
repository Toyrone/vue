<template>
  <div id="app">
    <div class="container">
      <div class="heading">
        <h2>Revue</h2>
        <h5 class="subheader">A Real-time Movie review with Pusher and Vue.js 2</h5>
      </div>
      <div class="row">
        <div class="col-sm-7">
          <movie></movie>
        </div>
        <div class="col-sm-5">
          <reviews></reviews>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Movie from './components/Movie'
import Reviews from './components/Reviews'

export default {
  name: 'app',
  components: {
    Movie, Reviews
  }
}
</script>

<style>
#app .heading {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  border-bottom: 1px solid #eee;
}
</style>
