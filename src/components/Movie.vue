<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="fetchMovie(title)" class="" action="index.html" method="post">
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="title" name="" value="">
        </div>
        <div class="col-md-3">
          <button type="submit" :disabled="!title" class="btn btn-md btn-primary" name="button">Search titles</button>
        </div>
      </form>
    </div>
    <!-- /search form row -->

    <div v-if="loading" class="loader">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="loader">
    </div>

    <div v-else-if="error_message">
      <h3>{{ error_message }}</h3>
    </div>

    <div class="row" v-else-if="Object.keys(movie).length !== 0" id="movie">
      <div class="col-md-3">
        <h4> {{ movie.show_title }}</h4>
        <img :src="movie.poster" :alt="movie.show_title">
      </div>
      <div class="col-md-4">
        <p> {{ movie.summary }}</p>
        <small><strong>Cast:</strong> {{ movie.show_cast }}</small>
      </div>
    </div>
  </div>
  <!-- /container  -->
</template>

<script>
  import bus from '../bus'
  // define the external API URL
  const API_URL = 'https://netflixroulette.net/api/api.php'
 // Helper function to help build urls to fetch movie details from title
  function buildUrl(title) {
    return  `${API_URL}?title=${title}`
  }

  export default {
    name: 'movie', // component name
    data () {
      return {
        title: '',
        error_message: '',
        loading: false, // totrack when app is retrieving data
        movie: {}
      }
    },
    methods: {
      fetchMovie (title) {
        // let title = this.title;
        // if (!title) {
        //   alert('please enter a title to search')
        //   return
        // }
        this.loading = true
        fetch(buildUrl(title))
        .then(response => response.json())
        .then(data => {
          this.loading = false
          this.error_message = ''
          bus.$emit('new_movie', data.unit)
          if (data.errorcode) {
            this.error_message = `Sorry, movie with title '${title}' not found. Try searching for "Fairy Tale" or "The boondocks" instead `
            return
          }
          this.movie = data
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>
  #movie {
    margin: 30px 0;
  }
  .loader {
    text-align: center;
  }
</style>
