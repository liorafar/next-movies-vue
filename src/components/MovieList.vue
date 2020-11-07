<template>
  <div class="container">
      <movie v-for="movie in movies" :key="movie.id"
            :title="movie.title" :image-path="movie.image"
            @click.native="movieClicked(movie)" class="grow"></movie>
  </div>
</template>

<script>
import Movie from './Movie'
export default {
  name: 'MovieList',
  props: {
    movies: Array
  },
  components: {
      Movie
  },
  methods: {
    movieClicked(movie) {
      this.$emit('clicked', { movie: movie } );
    }
  }
}
</script>

<style lang="scss" scoped>
    .container {
        .grow {
            transition: all .2s ease-in-out; 
        }
        .grow:hover {
            transform: scale(1.1);
            cursor: pointer;
        }
    }

    
</style>