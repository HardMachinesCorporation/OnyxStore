<script setup lang="ts">
import { HeartIcon, StarIcon } from '@heroicons/vue/24/outline'

import type { ProductProps } from '~/lib/types/products/product'

const props = withDefaults(defineProps<ProductProps>(), {
  id: 12,
  title: 'Product Title',
  discountedPrice: 2878,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: 'https://plus.unsplash.com/premium_photo-1687892170417-f9a11a402ef7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  originalPrice: 3500,
  rating: 3.8,
  price: 2878,
  onSale: true,
})
</script>

<template>
  <div class="group card hover:scale-105 hover:shadow-2xl cursor-pointer">
    <div class="relative overflow-hidden rounded-lg mb-4">
      <img
        :src="props.image || '' "
        :alt="props.title"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Quick Actions -->
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button class="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors duration-200">
          <HeartIcon class="h-4 w-4" />
        </button>
      </div>

      <!-- Sale Badge -->
      <div v-if="props.onSale" class="absolute top-2 left-2">
        <span class="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
          PROMO
        </span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="space-y-2">
      <div class="flex items-start justify-between">
        <h3 class="font-semibold text-gray-100 group-hover:text-primary-400 transition-colors duration-200 leading-tight">
          {{ props.title }}
        </h3>
        <div class="flex items-center ml-2">
          <StarIcon class="h-4 w-4 text-accent-400 fill-current" />
          <span class="text-sm text-gray-400 ml-1">{{ props.rating }}</span>
        </div>
      </div>

      <!-- Product description -->
      <p class="text-sm text-gray-400 line-clamp-2">
        {{ props.description }}
      </p>

      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold text-primary-400">{{ props.price }}$</span>
          <span v-if="props.originalPrice" class="text-ms text-gray-500 line-through">{{ props.originalPrice }}$</span>
        </div>

        <button
          class="btn-primary text-xs px-3 py-1 opacity-0
        group-hover:opacity-100 transition-all duration-300
        transform translate-y-2 group-hover:translate-y-0"
        >
          Add to card
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
