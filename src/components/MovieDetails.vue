<template>
<div class="overlay">
    <div class="movie-details-window">
        <div class="movie-details-container">
            <div class="image-block">
                <img :src="movie.largeimage" alt="test image">
            </div>
            <div class="movie-details">
                <div class="close-movie-details">
                    <h3 class="go-back-button" @click="goBackClicked">X</h3>
                </div>
                <h2 v-html="$t(movie.title)" class="movie-name"></h2>
                <!-- To do: add rating stars -->
                <h3>{{ releasedRatingRuntime }}</h3>
                <p v-html="$t(movie.synopsis)" class="synopsis"></p>
                <a target="_blank" :href="`https://www.imdb.com/title/${movie.imdbid}/`">IMDB</a>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import movieService from '../services/movie'

export default {
  name: 'MovieDetails',
  async created(){
       try {
        this.movie = await movieService.getMovieById(this.id);
      } catch (error) {
          console.error(`Error: Id: ${error.id}, Exception: ${error.error}`);
      }
  },
  props: ['id'],
  data(){
      return {
        movie: {}
      }
  },
  methods: {
      goBackClicked(){
          this.$root.bus.$emit('goBackClicked');
      }
  },
  computed: {
      releasedRatingRuntime(){
          const runtime = this.movie.runtime ? ` | ${this.movie.runtime}` : '';
          const rating = this.movie.rating ? ` | ${this.movie.rating}` : '';
          return `${this.movie.released}${runtime}${rating}`;
      }
  }
}
</script>

<style lang="scss" scoped>
    .overlay{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        transition: opacity 200ms;
        visibility: visible;
        opacity: 1;
        // this is since the range bar
        // has very high z index which
        // makes it top of the overlay
        z-index: 1000000000000000; 
    }

    .movie-details-window{
        display:absolute;
        flex-direction: column;
        background-color: #050304;
        box-sizing: content-box;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        height: 398px;
        width: 800px;
        overflow-y: auto;
        margin: 0 auto;
        border-radius: 5px;

        

        .movie-details-container {
            display:flex;

            .image-block {
                display: flex;

                img {
                    height: 398px;
                }
            }

            .movie-details{
                display:flex;
                flex-direction: column;
                padding: 50px;

                .close-movie-details{
                    display: flex;
                    height: 20px;
                    width:100%;

                    .go-back-button{
                        position:absolute;
                        right: 15px;
                        top: 10px;
                        color:white;

                        &:hover{
                            cursor: pointer;
                        }
                    }
                }

                h2 {
                    color: #ffffff;
                    font-size: 35px;
                    line-height: 42px;
                }

                h3 {
                    color: #ffffff;
                    font-size: 18px;
                    line-height: 18px;
                }
                
                h2, h3 {
                    margin-top: 0;
                    margin-bottom: 0.5em;
                    font-weight: 500;
                }
                
                .synopsis{
                    color: gray;
                    font-size: 16px;
                    font-weight: 300;
                    line-height: 20px;
                    margin-top: 10px;
                }
            }
        }
    }
    

    
</style>