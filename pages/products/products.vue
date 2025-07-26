<script setup lang="ts">
// Mock products data
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

import LoadingSpinner from '~/components/app/loadingSpinner.vue'
import type { ProductType } from '~/lib/types/products/product'
import type { AddNotificationFn } from '~/types/notification'

const addNotification = inject<AddNotificationFn>('addNotification') as AddNotificationFn
const productListState = useState<ProductType[]>('PaginatedProduct', () => [])
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const categoryOptions = ref<string[]>([])
// Computed properties
const filteredProducts = computed(() => {
  let filtered = productListState.value
  if (searchQuery.value) {
    // Try to find match in name or description
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(query)
      ?? product.description.toLowerCase().includes(query),
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // sort product
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return a.title.localeCompare(b.title)
    }
  })
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / 12))
const { execute, pending: isLoading, data: paginatedProducts } = await useFetch<{ data: ProductType[], categories: string[] }>('/api/products/with-category', {
  onResponseError({ response }) {
    const err = response._data as { publicMessage?: string }
    const message = err.publicMessage || 'Something went wrong'
    addNotification(message, 'error')
  },
})

onMounted(async () => {
  await execute()
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

watch(
  () => paginatedProducts.value,
  (newData) => {
    if (newData) {
      productListState.value = newData.data
      if (newData.categories && newData.categories.length !== categoryOptions.value.length) {
        categoryOptions.value = newData.categories
        addNotification(` ${newData.categories.length} categories added`, 'success')
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-screen py-8 animate-fade-in">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-100 mb-4">
          Our Products
        </h1>
        <p class="text-gray-400 text-lg">
          Discover our premium selection
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-8 card">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1">
            <!-- Search bar -->
            <label class="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Find a product"
              class="input"
            >
          </div>
          <!-- Categories Filter -->
          <div class="w-full lg:w-48">
            <label class="block text-sm font-medium text-gray-50 mb-2">Categories</label>
            <select
              v-model="selectedCategory"
              class="input"
            >
              <option value="">
                All categories
              </option>
              <option
                v-for="cat in categoryOptions"
                :key="cat"
                :value="cat"
              >
                {{ cat === '' ? 'All categories' : cat }}
              </option>
            </select>
          </div>
          <!-- Filter By -->
          <div class="w-full lg:w-48">
            <label class="block text-sm font-medium text-gray-300 mb-2">Filter by</label>
            <select
              v-model="sortBy"
              class="input"
            >
              <option value="name">
                Name
              </option>
              <option value="price">
                Price asc
              </option>
              <option value="price-desc">
                Price desc
              </option>
              <option value="rating">
                Rating
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <LoadingSpinner text="Loading products..." />
      </div>

      <!-- Products Grid -->
      <div
        v-else
        class="grid grid-cols-1 mg:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-8 "
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @click="navigateTo(`/products/${product.id}`)"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && filteredProducts.length === 0" class="text-center py-12">
        <div class="card max-w-md mx-auto">
          <div class="w-16 h-16 bg-dark-800 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlassIcon class="h-8 w-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-100 mb-2">
            No products found
          </h3>
          <p class="text-gray-400">
            Try adjusting your search criteria
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="!isLoading && filteredProducts.length" class="mt-12 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button class="btn-secondary px-3 py-2" :disabled="currentPage === 1">
            Previous
          </button>
          <span class="px-4 py-2 text-gray-300">Page {{ currentPage }} of {{ totalPages }}</span>
          <button class="btn-secondary px-3 py-2" :disabled="currentPage === totalPages">
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
