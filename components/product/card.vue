<script setup lang="ts">
import { HeartIcon, StarIcon } from '@heroicons/vue/24/outline'

import type { FeaturedProduct } from '~/lib/db/schema'

defineProps<{ product: FeaturedProduct }>()
</script>

<template>
  <client-only>
    <div class="group card hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div class="relative overflow-hidden rounded-lg mb-4">
        <img
          :src="product.image || '' "
          :alt="product.title"
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
        <div v-if="product.onSale" class="absolute top-2 left-2">
          <span class="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
            PROMO
          </span>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-2">
        <div class="flex items-start justify-between">
          <h3 class="font-semibold text-gray-100 group-hover:text-primary-400 transition-colors duration-200 leading-tight truncate">
            {{ product.title }}
          </h3>
          <div class="flex items-center ml-2">
            <StarIcon class="h-4 w-4 text-accent-400 fill-current" />
            <span class="text-sm text-gray-400 ml-1">{{ product.rating }}</span>
          </div>
        </div>

        <!-- Product description -->
        <p class="text-sm text-gray-400 line-clamp-2">
          {{ product.description }}
        </p>

        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center space-x-2">
            <span class="text-lg font-bold text-primary-400">{{ product.price }}$</span>
            <span v-if="product.originalPrice" class="text-ms text-gray-500 line-through">{{ product.originalPrice }}$</span>
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
  </client-only>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
