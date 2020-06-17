import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// import error from '../assets/images/image-placeholder.png'
// import loading from '../assets/images/image-placeholder.png'

Vue.use(VueLazyload, {
  preLoad: 1,
  // error: loading,
  // loading,
  attempt: 1
})
