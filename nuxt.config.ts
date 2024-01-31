// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
  },
  modules: [
    "@nuxt/content",
    "nuxt-simple-sitemap",
    "@zadigetvoltaire/nuxt-gtm",
    "nuxt-jsonld",
    "nuxt-og-image",
    "@stefanobartoletti/nuxt-social-share",
  ],
  components: [
    { path: "~/components/common" },
    { path: "~/components/global" },
  ],
  content: {
    documentDriven: true,
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
  gtm: {
    id: "GTM-N7BN33VN",
    defer: true,
    compatibility: false,
    nonce: "2726c7f26c",
    enabled: true,
    debug: true,
    trackOnNextTick: false,
    devtools: true,
  },
  runtimeConfig: {
    public: {
      gtm: {
        id: "GTM-N7BN33VN",
        defer: true,
        compatibility: false,
        nonce: "2726c7f26c",
        enabled: true,
        debug: true,
        trackOnNextTick: false,
        devtools: true,
      },
    },
  },
});
