<script setup lang="ts">
import {
  ArrowRightEndOnRectangleIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'
import { isAuthApiError, isAuthError } from '@supabase/auth-js'

import LoadingSpinner from '~/components/app/loadingSpinner.vue'
import { useAuthErrorHandler } from '~/composables/useAuthErrorHandler'
import type { AddNotificationFn } from '~/types/notification'

const addNotification = inject<AddNotificationFn>('addNotification') as AddNotificationFn
const loading = ref(false)

const { handleLogoutError } = useAuthErrorHandler()
onMounted(async () => {
  try {
    const { error } = await useSupabaseClient().auth.signOut({ scope: 'local' })

    if (error)
      throw error
    // Error “Server” GoTrue (AuthApiError)
    // success
    addNotification('You have been disconnected', 'success')
    setTimeout(() => navigateTo('/'), 2000)
  }
  catch (error) {
    // ── “server” GoTrue (AuthApiError) Error──
    if (isAuthApiError(error)) {
      // is also responsible for showing the toasts
      handleLogoutError(error)
    }
    // ── “Client” or Network Error──
    else if (isAuthError(error)) {
      addNotification('Logout failed. Please check your connection.', 'error')
    }
    else {
      // ── Unknown Errors unexpected ──
      addNotification('Logout failed. Please try again later.', 'error')
    }
  }
  finally {
    loading.value = false
  }
})

useHead({
  title: 'Logout – Professional E-commerce for High-Quality Products',
  meta: [
    {
      name: 'description',
      content: 'Disconnect from your onyxStore.',
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

    // Custom meta for framework (utilisé parfois par des outils SEO/dev)
    { name: 'framework', content: 'Nuxt 3' },
  ],
  link: [
    { rel: 'canonical', href: 'https://onyx-store.vercel.app/' },
  ],
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
    <div class="max-w-md w-full text-center space-y-8">
      <div class="card">
        <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <ArrowRightEndOnRectangleIcon class="h-8 w-8 text-white" />
        </div>

        <h2 class="text-3xl font-bold text-gray-100 mb-4">
          Disconnect
        </h2>

        <!---If Loading -->
        <div v-if="loading" class="space-y-4">
          <!--- Display Loading spinner -->
          <LoadingSpinner text="Disconnection you..." />
        </div>

        <!---If Not Loading -->
        <div v-else class="space-y-6">
          <div class="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircleIcon class="h-8 w-8 text-primary-400" />
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-100 mb-2">
              Successfully disconnected
            </h3>
            <p class="text-gray-400">
              You have been logged out. Thank you for visiting OnyxStore
            </p>
          </div>

          <div class="space-y-3">
            <NuxtLink to="/auth/login" class="w-full btn-primary py-3">
              Sign back in
            </NuxtLink>
            <NuxtLink to="/" class="w-full btn-secondary py-3">
              Go to homepage
            </NuxtLink>
          </div>

          <div class="border-t border-dark-800 pt-6">
            <p class="text-sm text-gray-400 mb-4">
              Would you like to stay signed in next time?
            </p>
            <NuxtLink to="/auth/register">
              Create a new account
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
