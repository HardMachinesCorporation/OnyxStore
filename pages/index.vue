<script setup lang="ts">
import { ChatBubbleLeftRightIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/vue/24/outline'

import { useFormat } from '~/lib/business/useFormat'
import type { ProductType } from '~/lib/db/schema'
import type { AddNotificationFn } from '~/types/notification'

const addNotification = inject<AddNotificationFn>('addNotification') as AddNotificationFn
const config = useRuntimeConfig()
const freeShippingThreshold = Number(config.public.freeShippingThreshold)

const featuredProducts = ref<ProductType[]>([])
const { formatCents } = useFormat()

if (import.meta.client) {
  document.head.insertAdjacentHTML('afterbegin', '<!-- Built by Jordach MAKAYA with Nuxt 3 🚀 -->')
}

const { data: products, execute, error } = await useFetch<ProductType[] | null>('/api/products/featured', {
  onResponseError({ response }) {
    const err = response._data as { publicMessage?: string }
    const message = err.publicMessage || 'Something went wrong'
    addNotification(message, 'error')
  },
})

onMounted(async () => {
  await execute()
  if (error.value) {
    const msg
        = (error.value.data as { publicMessage?: string })?.publicMessage || error.value.message
    addNotification(msg, 'error')
  }
})

watch(() => products.value, (newValue) => {
  if (newValue) {
    featuredProducts.value = newValue
  }
}, {
  immediate: true,
})

useHead({
  title: 'Premium Store – Professional E-commerce for High-Quality Products',
  meta: [
    {
      name: 'description',
      content: 'Discover Premium Store, your destination for top-quality products. Shop electronics, fashion, home essentials, and more with secure checkout and fast delivery.',
    },
    {
      name: 'keywords',
      content: 'premium, e-commerce, online store, high quality, electronics, fashion, home, secure payment, fast shipping, best deals, nuxt, vuejs',
    },
    // Built with Nuxt - meta custom
    {
      name: 'generator',
      content: 'Nuxt',
    },
    // Open Graph / Twitter / Canonical (comme précédemment)
    { property: 'og:title', content: 'Premium Store – Professional E-commerce for High-Quality Products' },
    { property: 'og:description', content: 'Discover Premium Store: Electronics, fashion, and essentials with secure payment and express delivery.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://onyx-store.vercel.app//' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Premium Store – Professional E-commerce for High-Quality Products' },
    { name: 'twitter:description', content: 'Discover Premium Store: Electronics, fashion, and essentials with secure payment and express delivery.' },
    { name: 'framework', content: 'Nuxt 3' },
    { name: 'creator', content: 'Jordach Makaya' },
    { name: 'publisher', content: 'Jordach Makaya' },
  ],
  link: [
    { rel: 'canonical', href: 'https://onyx-store.vercel.app//' },
  ],
})
</script>

<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-dark-900 to divide-dark-950 py-24">
      <!-- Hero IMG -->
      <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg')] bg-cover bg-center opacity-10" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-px8 text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-gray-100 mb-6 animate-slide-up">
          Onyx<span class="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Store
          </span>
        </h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay:0.2s">
          Discover our exclusive selection of premium products, carefully chosen to offer you excellence
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.4s">
          <NuxtLink to="/products/products" class="btn-primary text-lg px-8 py-4">
            Discover our products
          </NuxtLink>
          <button class="btn-secondary text-lg px-8 py-4">
            Learn more
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-20 bg-dark-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-100 mb-4">
            Featured Products
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of our most popular and trending items right now
          </p>
        </div>

        <!-- Products Div wrapper -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <!-- TODO Products Component goes here -->
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/products/products" class="btn-primary text-lg px-8 py-4">
            View all products
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-dark-900">
      <!-- Why choose us  -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-100 mb-4">
            Why choose us?
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            A premium shopping experience with guaranteed quality
          </p>
        </div>

        <!-- Free Shipping -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div class="card text-center group hover:border-primary-500/50">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <TruckIcon class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-100 mb-4">
              Free Shipping
            </h3>
            <p class="text-gray-400">
              All deliveries are Free on all orders over €{{ freeShippingThreshold }}
            </p>
          </div>

          <!-- Quality Guarantee -->
          <div class="card text-center group hover:border-primary-500/50">
            <div class="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-100 mb-4">
              Quality Guarantee
            </h3>
            <p class="text-gray-400">
              All our products are guaranteed and certified premium
            </p>
          </div>

          <!-- Support 24/7 -->
          <div class="card text-center group hover:border-primary-500/50">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChatBubbleLeftRightIcon class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-100 mb-4">
              Support 24/7
            </h3>
            <p class="text-gray-400">
              Our team is available to assist you at any time
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
