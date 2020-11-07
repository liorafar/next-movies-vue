import Vue from 'vue'
import VueRouter from 'vue-router'
import NextMovies from './components/NextMovies'
import MovieDetails from './components/MovieDetails'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
        {
            path     : '/',
            redirect : '/movies'
        },
        {
            path     : '/movies',
            name     : 'movies',
            component: NextMovies,
            children: [
                {
                    path     : '/movies/:id',
                    name     : 'movieDetails',
                    component: MovieDetails,
                    props: true // in order to decouple component from router
                },
            ]
        },
      ]
});

export default router;