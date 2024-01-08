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
    'nuxt-simple-sitemap',
    'nuxt-jsonld',
    'nuxt-og-image',
    '@stefanobartoletti/nuxt-social-share'
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
    url: 'https://caleidoscopioastrale.it',
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { dir: 'ltr', lang: 'es'}
    }
  }
})
