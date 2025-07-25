// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/icon', ['@nuxtjs/tailwindcss', {
    configPath: './tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css',

  }], '@nuxtjs/supabase'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  app: {
    head: {
      title: 'OnyxStore - Premium Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional e-commerce platform built with Nuxt 3' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
      htmlAttrs: {
        class: 'dark',
      },
    },
  },
  runtimeConfig: {
    databaseURL: process.env.NUXT_DATABASE_URL,
    public: {
      fakeStoreURL: process.env.NUXT_FAKE_STORE_URL,
      freeShippingThreshold: process.env.NUXT_FREE_SHIPPING_THRESHOLD,
      appEnv: process.env.NUXT_PUBLIC_APP_ENV || 'dev',
    },
  },
  supabase: {
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    redirect: false,
  },
  imports: {
    dirs: ['lib/business'], // pour auto‑importer applyDiscountCents, formatCents, etc.
  },

})
