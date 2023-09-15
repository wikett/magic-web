// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  components: [
    { path: '~/components/common'},
    { path: '~/components/global'}
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  runtimeConfig: {
    public: {
      gtm: {
        id: 'GTM-N7BN33VN',
        defer: false,
        compatibility: false,
        nonce: '2726c7f26c',
        enabled: false,
        debug: true,
        trackOnNextTick: false,
        devtools: true,
      }
    }
  }
})
