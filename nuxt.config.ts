// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  routeRules: {
    '/**': { prerender: true }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/404.html"],
    },
    compressPublicAssets: {
      brotli: true,
    },
  },
  // "@zadigetvoltaire/nuxt-gtm",
  modules: [
    "@nuxt/content",
    "nuxt-jsonld",
    "@stefanobartoletti/nuxt-social-share",    
    "@nuxtjs/sitemap",
  ],
  components: [
    { path: "~/components/common" },
    { path: "~/components/global" },
  ],
  content: {
    documentDriven: true,
    experimental: {
      clientDB: true,
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  site: {
    url: "https://blog.astroingeo.org",
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: { dir: "ltr", lang: "es" },
    },
  },
  runtimeConfig: {
    public: {
      enableAdsense: true
    }
  }
  // runtimeConfig: {
  //   public: {
  //     gtm: {
  //       id: 'GTM-5TWXHMZ6',
  //       defer: false,
  //       compatibility: false,
  //       nonce: '2726c7f26c',
  //       enabled: true,
  //       debug: true,
  //       trackOnNextTick: false,
  //       devtools: true,
  //     }
  //   }
  // },
});
