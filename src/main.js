import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import infiniteScroll from 'vue-infinite-scroll'
import VueRouter from './routes'

Vue.config.productionTip = false

// This empty Vue model will serve as our event bus.
// currently we need the event bus
// in order to decouple components from the router
// the reason is that component emit is sent only after routing was done
// therefore we need a global event bus to emit the close from the component
// to the main component which is the only one to be coupled with router
var bus = new Vue({});

// register globally
Vue.use(VueI18n)
Vue.use(Autocomplete)
Vue.use(infiniteScroll)

const i18n = new VueI18n({
  locale: 'en',
})

new Vue({
  i18n,
  router: VueRouter,
  data:{
    bus: bus,
  },
  render: h => h(App),
}).$mount('#app')
