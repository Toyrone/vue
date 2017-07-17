<template>
  <div class="container">
    <h4 class= "uppercase">reviews</h4>
    <div class="review" v-for="review in reviews">
      <p>{{ review.content }}</p>
      <div class="row">
        <div class="col-md-7">
          <h5>{{ review.reviewer }}</h5>
        </div>
        <div class="col-md-5">
          <h5 class="pull-right">{{ reviews.time }}</h5>
        </div>
      </div>
    </div>
    <div class="review-form" v-if="movie">
      <h5>Add new review. </h5>
      <form @submit.prevent="addReview" method="post">
        <label>Review
          <textarea v-model="review.content" rows="5" cols="30"></textarea>
        </label>
        <label>Name
          <input v-model="review.reviewer" type="text">
        </label>
        <button :disabled="!review.reviewer || !review.content" type="submit" class="btn btn-lg" name="button">Submit</button>
      </form>
    </div>
  </div>

</template>

<script>
  const MOCK_REVIEWS = [
    {
      movie_id: 7128,
      content: 'Great show! I loved every single scene. Definitely a must watch!.',
      reviewer: 'Jane Doe',
      time: new Date().toLocaleDateString()
    }
    // this.mockReviews.unshift(review)
  ]
  export default {
    name: 'reviews',
    data() {
      return {
        mockReviews: MOCK_REVIEWS,
        movie: null,
        review: {
          content: '',
          reviewer: ''
        }
      }
    },
    methods: {
      addReview () {
        if (!this.movie || !this.review.reviewer || !this.review.content) {
          return
        }
        let review = {
          movie_id: this.movie,
          content: this.review.content,
          reviewer: this.review.reviewer,
          time: new Date().toLocaleDateString()
        }
        this.mockReviews.unshift(review)
      }
    },
    computed: {
      reviews () {
        return this.mockReviews.filter( review => {
          return review.movie_id === this.movie
        })
      }
    },
    created() {
      bus.$on('new_movie', movieId => {
        this.movie = movieId
      })
    }
  }
</script>

<style scoped>
  .container {
    padding: 0 2px;
  }
  .review {
    border: 1px solid #ddd;
    font-size: 0.95em;
    padding: 10px;
    margin: 15px 0 5px 0;
  }
  .review {
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 0.7em;
  }
  .pull-right {
    float: left;
  }
  .review-form {
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding: 15px 0 0 0;
  }
</style>
