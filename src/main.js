import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

/*
    Structure: api.zippopotam.us/country/postal-code
    Example: api.zippopotam.us/us/90210

    NEW! City->Zip: api.zippopotam.us/country/state/city
    Example: api.zippopotam.us/us/ma/belmont
*/