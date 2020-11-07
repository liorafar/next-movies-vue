<template>
    <div class="filterContainer">
        <!-- To Do: improve layout style  -->
        <div class="closePanel" @click="closePanel">X</div>
        <p>Rating: </p>
        <vue-slider v-model="rating" :min=0 :max=10></vue-slider>
        <!-- To Do: change the minutes to hours and minutes format -->
        <p>Movie Length (minutes): </p>
        <vue-slider v-model="runtime" :min=0 :max=240></vue-slider>
        <generic-button class="applyButton" @clicked="applyFilters" :label="'Apply'"></generic-button>
        <generic-button class="clearButton" @clicked="clearFilters" :label="'Clear'"></generic-button>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import GenericButton from './basicComponents/GenericButton'

export default {
  name: 'FilterPanel',
  props: {
  },
  data() {
      return {
         rating: [0, 10],
         runtime: [0, 240]
      }
  },
  methods: {
      closePanel(){
          this.$emit('clicked');
      },
      applyFilters(){
          this.$emit('filtersApplied', { rating: this.rating, runtime: this.runtime });
      },
      clearFilters(){
          this.rating = [0, 10],
          this.runtime = [0, 240]
          this.$emit('filtersApplied', { rating: this.rating, runtime: this.runtime });
      }
  },
  components: {
      VueSlider,
      GenericButton
  }
}
</script>

<style lang="scss" scoped>
    
    @mixin buttonSmall {
       background-color: rgb(17, 153, 250);
       color:white;
       height: 30px;
       width: 80px;
       border-radius: 7px;
       
    }

    p {
        position: relative;
        left: 5px;
        font-family: Lato;
    }
    
    .filterContainer {
        width: 230px;
        // height: 600px; // height for more filters
        height: 200px;
        padding: 20px;
        background-color: white;
        border-radius: 7px 0 0 7px;

        .closePanel{
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }

        .applyButton{
            @include buttonSmall;
            position: absolute;
            bottom: 10px;
            left: 10px;
        }

        .clearButton{
            @include buttonSmall;
            position: absolute;
            bottom: 10px;
            left: 95px;
        }
    }
</style>