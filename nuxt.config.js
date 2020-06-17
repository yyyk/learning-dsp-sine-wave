const builtAt = new Date().toISOString()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { property: 'og:updated_time', content: builtAt }
    ],
    link: [],
    script: [{ src: '/MathJax/MathJax.js?config=TeX-AMS_HTML', async: true }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/style.scss', '@/assets/scss/nuxt-content.scss'],
  styleResources: {
    scss: ['@/assets/scss/utility/*.scss']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vue-lazyload'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxt/content'
  ],
  content: {
    markdown: {
      externalLinks: {
        target: '_blank',
        rel: ['noopener', 'noreferrer']
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto'
      })
    }
  },
  router: {
    middleware: ['menu']
  },
  generate: {
    // subFolders: false,
    // fallback: true,
    // exclude: [],
    fallback: '404.html', // Netlify reads a 404.html, Nuxt will load as an SPA
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content()
        .only(['path'])
        .fetch()

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    }
  }
}
