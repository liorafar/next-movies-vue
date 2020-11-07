<template>
  <div class="container">
    <div class="page-layout">
      <div class="header">
        <h1 class="title">Next Movies</h1>
            <generic-button class="button-big" @clicked="advancedClicked" :label="'Advanced'"></generic-button>
           <autocomplete
              :search="searchByText"
              :debounceTime="1000"
              class="search-movie"
              placeholder="Search title or description..."
              aria-label="Search title or description..."
          ></autocomplete>
      </div>
      <div class="left-panel"></div>
      <div class="movie-list" >
        <movie-list :movies="movies" @clicked="onClickMovie"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="busy"
                    infinite-scroll-distance="1">
        </movie-list>
      </div>
      <div class="right-panel">
        <filter-panel v-show="showAdvancedFilter"
                      @clicked="closeAdvancedPanel"
                      @filtersApplied="filtersApplied"></filter-panel>
      </div>
      <div class="footer"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MovieList from './MovieList'
// import MovieDetails from './MovieDetails'
import FilterPanel from './FilterPanel'
import movieService from '../services/movie'
import GenericButton from './basicComponents/GenericButton'
import {Configuration} from '../../configuration'


export default {
  name: 'NextMovies',
  props: {
  },
  data() {
    return {
      movies: [],
      selectedMovie: null,
      pageSize: Configuration.pageSize,
      searchCriteria: {
        searchText: null,
        rating: [0, 10],
        runtime: [0, 600]
      },
      showAdvancedFilter: false,
      firstTimeAfterPageCreated: true
    }
  },
  created: function(){
    
    // created hook - getting items
    // if there are query parameters
    // then they will be used for the search criteria
    this.parseRouteQueryParams();
    // search movies by default value or provided query parameters
    this.searchByCriterias(this.searchCriteria.searchText,
                           this.searchCriteria.rating,
                           this.searchCriteria.runtime);

    // prepare global events so child components 
    // will be decoupled from router
    this.$root.bus.$on('goBackClicked', () => {
      // To do: fix router back in case the url
      // was sent to a friend to open page directly
      // since this way the routing did not came from the main routing
      // but from the browser home page thus we return there
        this.$router.go(-1);
    });
  },
  methods: {
    //#region search movies by criterias
    updateSearchCriteriaState(searchText, rating, runtime){
      this.searchCriteria.searchText = searchText;
      this.searchCriteria.rating = rating;
      this.searchCriteria.runtime = runtime;
    },
    async searchByCriterias(searchText, rating, runtime) {
      // this is the invocation function of the get movie items based on all search criterias
      // this function will update the search criteria state and then call the api
      this.updateSearchCriteriaState(searchText, rating, runtime);
      this.movies = await movieService.getMoviesByCriteria(0, this.pageSize,
                                                              this.searchCriteria.searchText,
                                                              this.searchCriteria.rating,
                                                              this.searchCriteria.runtime);
    },
    searchByText(input){
      // due to debounce parameter, this function will be called
      // only after the user stopped typing and waited the debounce value (500 milliseconds)
      if (!input){
        this.pageSize = Configuration.pageSize;
      }
      this.searchByCriterias(input, this.searchCriteria.rating, this.searchCriteria.runtime);
      this.updateRoute();
      return [];
    },
    filtersApplied(filters){
      this.searchByCriterias(this.searchCriteria.searchText, filters.rating, filters.runtime);
      this.updateRoute();
    },
    // #endregion

    //#region routing
    updateRoute(){
      // first make sure we dont try to route with the sme parameters
      // in order to avoid router exceptions and not doing redundant navigations
      if (this.$route.query.search === this.searchCriteria.searchText
      && this.$route.query.ratingFrom === this.searchCriteria.rating[0]
      && this.$route.query.ratingTo === this.searchCriteria.rating[1]
      && this.$route.query.runtimeFrom === this.searchCriteria.runtime[0]
      && this.$route.query.runtimeTo === this.searchCriteria.runtime[1]
      ) return;

      this.$router.replace({ name: "movies", query: {search: this.searchCriteria.searchText,
                                                     ratingFrom: this.searchCriteria.rating[0],
                                                     ratingTo: this.searchCriteria.rating[1],
                                                     runtimeFrom: this.searchCriteria.runtime[0],
                                                     runtimeTo: this.searchCriteria.runtime[1],
                                                    }
                           })
    },
    parseRouteQueryParams(){
      let searchText = this.searchCriteria.searchText;
      let rating = this.searchCriteria.rating;
      let runtime = this.searchCriteria.runtime;

      if (this.$route.query.ratingFrom && this.$route.query.ratingTo){
        rating = [this.$route.query.ratingFrom , this.$route.query.ratingTo];
      }

      if (this.$route.query.runtimeFrom && this.$route.query.runtimeTo){
        runtime = [this.$route.query.runtimeFrom , this.$route.query.runtimeTo];
      }
      // empty string is a valid param thus we need to condition like this
      // instead of if (searchText) that verifies if string is not empty
      if (this.$route.query.search !== null
        && this.$route.query.search !== undefined){
          searchText = this.$route.query.search;
      }

      this.updateSearchCriteriaState(searchText, rating, runtime);
    },
    //#endregion

    // #region: infinte scroll (movies paging and lazy loading)
    loadMore: function() {
      // To Do: Display loading in bottom of page when bringing more items
      // first time page got created we get here, thus we don't want to make another call
      // as we already fetch data on created hook
      if (!this.pageCreated){
        this.busy = true;

        setTimeout(() => {
          // To do: once all items retrieved don't bring data (even without pictures)
          // However be responsive to server changes with new item - additional refresh button?
          this.pageSize += Configuration.pageSize;
          this.searchByCriterias(this.searchCriteria.searchText,
                                this.searchCriteria.rating,
                                this.searchCriteria.runtime);
          this.busy = false;
        }, 200);
      }else{
        this.firstTimeAfterPageCreated = false;
      }
    },
    // #endregion

    // #region events
    onClickMovie (data){
      this.$router.push({ name: 'movieDetails', params: { id: data.movie.id} } );
    },
    closeAdvancedPanel() {
      this.showAdvancedFilter = false;
    },
    advancedClicked(){
      this.showAdvancedFilter = !this.showAdvancedFilter;
    },
  },
  components: {
    MovieList,
    // MovieDetails,
    FilterPanel,
    GenericButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .button-big {
      background-color: #1199fa;
      color: white;
      height: 52px;
      width: 80px;
      border-radius: 7px;
      position: absolute;
      right: 300px;
      top: 25px;
  }

.container{
  height:100%;
}

.page-layout {
    display: grid;
    height: 100%;
    margin: 0;


    grid-template-areas:
    "header header header"
    "filter content side"
    "footer footer footer";

    grid-template-columns: 15% 70% 15%;
    grid-template-rows: 50px auto 50px;

    .header {
      grid-area: header;
      background-color: black;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;

      .title{
        color:white;
        text-transform: uppercase;
        position:relative;
        left: 20px;
        top:5px;
        font-family: Lato;
        font-size: 40px;
      }

      .search-movie{
        position: absolute;
        right: 20px;
      }
    }

    .left-panel{
      grid-area: filter;
    }

    .movie-list{
      margin-top: 50px;
      grid-area: content;
      display: flex;
      flex-wrap: wrap;
    }

    .right-panel{
      grid-area: side;
      position: absolute;
      top:150px;
      right:0;
      animation: myfirst 3s;
      animation-direction: normal;
      animation-iteration-count: initial;
    }

    @keyframes myfirst {
      0%   {right: -270px; top: 150px;}
      25%  {right: -180px; top: 150px;}
      50%  {right: -90x; top: 150px;}
      75%  {right: -45x; top: 150px;}
      100% {right: 0; top: 150px;}
    }


    .footer{
      grid-area: footer;
      background-color: black;

      display: flex;
      justify-content: space-between;
      align-items: center;
      height:50px;
    }
}








</style>
