<script setup lang="ts">
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

import GoogleSvg from '~/components/social/google-svg.vue'
import LinkedinSvg from '~/components/social/linkedin-svg.vue'
import type { AddNotificationFn } from '~/types/notification'
import { SignInSchema } from '~/types/user-schema'
import type { SignInDto } from '~/types/user-schema'

// reactive data
const form = reactive<SignInDto & { remember: boolean }>({
  email: '',
  password: '',
  remember: false,
})

const errors = ref<Partial<Record<keyof SignInDto, string>>>({})
const loading = ref(false)
const showPassword = ref(false)

// validation
function validateForm() {
  const resultValidation = SignInSchema.safeParse(form)
  errors.value = {}
  if (!resultValidation.success) {
    for (const issue of resultValidation.error?.issues) {
      const path = issue.path[0] as keyof SignInDto
      errors.value[path] = issue.message
    }
    return false
  }
  // reset errors if validation is successful
  errors.value = {}
  return resultValidation.success
}

const addNotification = inject<AddNotificationFn>('addNotification') as AddNotificationFn

async function handleLogin() {
  if (!validateForm())
    return

  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    addNotification('Login successful! Welcome. ', 'success')

    // Mock successful login

    // Redirect to home or dashboard
    navigateTo('/')
  }
  catch (error) {
    // TODO debug only
    console.error(error)
    addNotification('something went wrong, please try again later', 'error')
  }
}

definePageMeta({
  layout: 'default',
  title: 'Sign In',
})

useHead({
  title: 'Sign In – Professional E-commerce for High-Quality Products',
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
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-4">
          <UserIcon class="h-8 w-8 text-white" />
        </div>
        <h2 class="text-3xl font-bold text-gray-100">
          Sign In
        </h2>
        <p class="mt-2 text-gray-400">
          Access your Premium Store account
        </p>
      </div>

      <!-- Login Form -->
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email address
            </label>
            <div class="relative">
              <input
                id="email" v-model="form.email"
                required
                class="input pl-10"
                :class="{ 'border-red-500': errors.email }"
                placeholder="your@email.com"
              >
              <EnvelopeIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-400">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password' "
                required
                class="input pl-10 pr-10"
                :class="{ 'border-red-500': errors.password }"
                placeholder="your password"
              >
              <LockClosedIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                @click="showPassword = !showPassword"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-400">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              v-model="form.remember"
              type="checkbox"
              class="rounded border-dark-700 bg-dark-800 text-primary-600 focus:ring-primary-500 focus:ring-offset-dark-950"
            >
            <span class="ml-2 text-sm text-gray-300">Remember me</span>
          </label>
          <NuxtLink
            to="/auth/forgot-password"
            class="text-sm text-primary-400 hover:text-primary-300"
          >
            Forgot password
          </NuxtLink>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary text-lg py-3 flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="loading-spinner block" />
          <span v-else>Sign in</span>
        </button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-dark-800" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-dark-950 text-gray-400">or</span>
          </div>
        </div>

        <!-- Social Login ------------------>
        <div class="space-y-3">
          <button
            type="button"
            class="w-full py-3 btn-secondary flex items-center justify-center space-x-2"
          >
            <GoogleSvg />
            <span>Continue with Google</span>
          </button>

          <button
            class="w-full btn-secondary py-3
             flex place-items-center justify-center
             space-x-2"
          >
            <LinkedinSvg />
            <span>Continue with Linkedin</span>
          </button>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <p class="text-gray-400">
            Don't have an account yet?
          </p>
          <NuxtLink to="/auth/register" class="font-medium text-primary-400 underline hover:text-primary-300 cursor-pointer">
            Create an account
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
