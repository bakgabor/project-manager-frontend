// eslint-disable-next-line nuxt/no-cjs-in-config
const routes = require('./routes/index.js')
/*
 ** This is for GitHub pages
 */
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/admin-one-nuxt/',
        },
      }
    : {}

export default {
  /*
   ** Concat router base setting
   */
  ...routerBase,
  ssr: false,
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Project manager' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/project.ico' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/nunito/nunito.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/material-design/css/materialdesignicons.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/fontawesome/css/all.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/css/bootstrap.min.css',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/after-each.js', mode: 'client' },
    { src: '~/providers/api_repository_provider' },
    { src: '~/providers/plugin_provider' },
    { src: '~/providers/module_provider', mode: 'client' },
    { src: '~/plugins/default_system/bus' },
    { src: '~/plugins/default_system/axios' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { materialDesignIcons: false }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxtjs/proxy',
  ],

  moment: {
    defaultLocale: 'hu',
    locales: ['hu'],
    defaultTimezone: 'Europe/Budapest',
  },

  /*
   ** i18n module configuration
   */
  i18n: {
    locales: [
      {
        name: 'Hungary',
        code: 'hu',
        iso: 'hu-HU',
        file: 'hu-HU.js',
      },
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'hu',
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://192.168.0.100:4000',
    browserBaseURL: 'http://192.168.0.100:4000',
  },

  // Authentication
  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: 'userToken',
          global: true,
          // required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: '/api/authentication/login',
            method: 'post',
          },
          logout: { url: '/api/authentication/logout', method: 'post' },
          user: {
            url: '/api/authentication/user',
            method: 'get',
            propertyName: 'user',
          },
        },
        // tokenRequired: true,
        tokenType: 'bearer',
      },
    },
    redirect: {
      login: '/authentication/login',
      logout: '/',
      callback: '/authentication/login',
      home: '/',
    },
  },

  // Routes
  router: {
    extendRoutes(nuxtRoutes, resolve) {
      routes.forEach((route) => {
        nuxtRoutes.push({
          name: route.name,
          path: route.path,
          component: resolve(__dirname, route.component),
        })
      })
    },
  },

  proxy: {
    '/uploads/': {
      target: process.env.BACKEND_URL,
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vue-json-edit'],
    extend(config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }

      // Remove moment.js from chart.js
      // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
      // config.externals.moment = 'moment'
    },
  },
}
