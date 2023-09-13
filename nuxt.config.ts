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
  runtimeConfig: {
    public: {
      gtm: {
        id: 'GTM-N7BN33VN',
        defer: false,
        compatibility: false,
        nonce: '2726c7f26c',
        enabled: true,
        debug: true,
        trackOnNextTick: false,
        devtools: true,
      }
    }
  }
})
