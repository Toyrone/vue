<template>
  <div class="container">
    <h4 class= "uppercase">Reviews</h4>
    <div class="review" v-for="review in reviews">
      <p>{{ review.content }}</p>
      <div class="row">
        <div class="col-md-3">
          <h5>{{ review.reviewer }}</h5>
        </div>
        <div class="col-md-2">
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
// npm install -S pusher-js

  import Pusher from 'pusher-js'

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
          alert('Please make sure all fields are not empty');
          return
        }
        let review = {
          movie_id: this.movie,
          content: this.review.content,
          reviewer: this.review.reviewer,
          time: new Date().toLocaleDateString()
        }
        fetch('/api/review', {
          method: 'post',
          body: JSON.stringify(review)
        }).then(() => {
          this.review.content = this.review.reviewer = ''
        })
        //
      },
      subscribe() {
        let pusher = new Pusher('YOUR_PUSHER_APP_KEY',  {
          cluster: 'YOUR_CLUSTER'})
          pusher.subscribe('reviews')
          pusher.bind('review_added', data => {
             this.mockReviews.unshift(data.review)
          })
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
      });
      this.subscribe()
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
  .review h5{
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
