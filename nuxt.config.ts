// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: {
      brotli: true
    }
  },
  modules: [
    '@nuxt/content',
    '@zadigetvoltaire/nuxt-gtm',
    'nuxt-simple-sitemap',
    'nuxt-jsonld'
  ],
  components: [
    { path: '~/components/common'},
    { path: '~/components/global'}
  ],
  content: {
    documentDriven: true
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  site: {
    url: 'https://comolimpiarcomoexpertas.com',
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { dir: 'ltr', lang: 'es'}
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
