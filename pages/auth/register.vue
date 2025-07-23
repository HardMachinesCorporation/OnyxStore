<script setup lang="ts">
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserPlusIcon,
} from '@heroicons/vue/24/outline'
import { AuthError } from '@supabase/auth-js'

import { useAppEn } from '~/composables/useAppEn'
import { useAuthErrorHandler } from '~/composables/useAuthErrorHandler'
import type { AddNotificationFn } from '~/types/notification'
import { SignUpSchema } from '~/types/user-schema'
import type { SignUpDto } from '~/types/user-schema'

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const registrationErrors = ref<Partial<Record<keyof SignUpDto, string> & { acceptTerms: boolean }>>({})
const form = reactive<SignUpDto & { acceptTerms: boolean }>({
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  acceptTerms: false,
  confirmPassword: '',
})

function validateForm(): boolean {
  const resultValidation = SignUpSchema.safeParse(form)
  registrationErrors.value = {}
  if (!resultValidation.success) {
    for (const issue of resultValidation.error?.issues) {
      const path = issue.path[0] as keyof SignUpDto
      registrationErrors.value[path] = issue.message
    }
    return false
  }
  registrationErrors.value = {}
  return resultValidation.success
}

/**
 * Password strength calculation
 * Password must contain
 * - min 8 chars
 * - min 1 Maj & 1 Min Alphabetic letter
 * - min 1 Alphanumeric value
 * - min 1 special char
 */
const passwordStrength = computed(() => {
  if (!form.password)
    return 0
  let score = 0
  if (form.password.length >= 8)
    score += 1
  if (/[a-z]/.test(form.password))
    score += 1
  if (/[A-Z]/.test(form.password))
    score += 1
  if (/\d/.test(form.password))
    score += 1
  if (/[^a-z0-9]/i.test(form.password))
    score += 1
  return score
})

const passwordStrengthColor = computed(() => {
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-primary-500']
  return colors[passwordStrength.value - 1] || 'bg-red-500'
})

const passwordStrengthText = computed(() => {
  const texts = ['Low', 'Medium', 'Good', 'Excellent']
  return texts[passwordStrength.value - 1] || 'Very Weak'
})

// Registraiton logic
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const addNotification = inject<AddNotificationFn>('addNotification') as AddNotificationFn

if (user.value) {
  addNotification('You are already signed in.', 'warning')
  navigateTo('/')
}

const environment = useAppEn()
const isProd = environment === 'prod'
const urlRedirection = isProd ? 'https://onyx-store.vercel.app/auth/confirm-email' : 'http://localhost:3000/auth/confirm-email'

const { handleAuthError } = useAuthErrorHandler()
async function handleRegister() {
  if (!validateForm())
    return

  loading.value = true
  try {
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
        },
        emailRedirectTo: urlRedirection,
      },

    })

    /**
     * An Error might be not of type AuthError
     * handleAuthError require an instance of AuthError
     */
    if (error instanceof AuthError) {
      handleAuthError(error)
      loading.value = false
      return
    }
    else if (error) {
      // An error other than an instance of AuthError
      addNotification('Something went wrong, please try again later', 'error')
      loading.value = false
      return
    }
  }
  catch (error: unknown) {
    addNotification('Network error, please try again later.', 'error')
  }
  finally {
    loading.value = false
  }

  // Success -> clear all
  registrationErrors.value = {}
  loading.value = false
  addNotification('Welcome ! Please check your email to activate your account', 'success')
  navigateTo(urlRedirection, { external: isProd })
}

useHead({
  title: 'Inscription – Professional E-commerce for High-Quality Products',
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
        <div
          class="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center
              justify-center mb-4"
        >
          <UserPlusIcon class="h-8 w-8 text-white" />
        </div>
        <h2 class="text-3xl font-bold text-gray-100">
          Create an account
        </h2>
        <p class="mt-2 text-gray-400">
          Sign up for Premium Store today
        </p>
      </div>

      <!-- Registration Form -->
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-6">
          <!-- First name Fields -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label for="firstname" class="block text-sm font-medium text-gray-300 mb-2">First name</label>
              <input
                id="firstname"
                v-model="form.firstName"
                type="text"
                required
                class="input"
                :class="{ 'border-red-500': registrationErrors.firstName }"
                placeholder="Jordach"
              >
              <p v-if="registrationErrors" class="mt-1 text-sm text-red-400">
                {{ registrationErrors.firstName }}
              </p>
            </div>
            <!-- Last name Fields -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-300 mb-2">Last name</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="input"
                :class="{ 'border-red-500': registrationErrors.lastName }"
                placeholder="MAKAYA"
              >
              <p v-if="registrationErrors.lastName" class="mt-1 text-sm text-red-400">
                {{ registrationErrors.lastName }}
              </p>
            </div>
          </div>

          <!-- Email Fields -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
              Address email
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="form.email"
                required
                class="input pl-10"
                :class="{ 'border-red-500': registrationErrors.email }"
                placeholder="jordach@example.com"
              >
              <EnvelopeIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <p v-if="registrationErrors.email" class="mt-1 text-sm text-red-400">
              {{ registrationErrors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password' "
                required
                class="input pl-10 pr-10"
                :class="{ 'border-red-500': registrationErrors.password }"
                placeholder="strong password"
              >
              <LockClosedIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-400 hover:text-gray-300"
                @click="showPassword = !showPassword"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="registrationErrors.password" class="mt-1 text-sm text-red-400">
              {{ registrationErrors.password }}
            </p>

            <!-- Password Strength Indicator -->
            <div class="mt-2">
              <div class="flex items-center space-x-2">
                <div class="flex-1 bg-dark-800 rounded-full h-2">
                  <div
                    class="h-2 rounded-full transition-all duration-300"
                    :class="passwordStrengthColor"
                    :style="{ width: `${passwordStrength * 25}%` }"
                  />
                </div>
                <span class="text-xs text-gray-400">{{ passwordStrengthText }}</span>
              </div>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Confirm your password</label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password' "
                required
                class="input pl-10 pr-10"
                :class="{ 'border-red-500': registrationErrors.confirmPassword }"
                placeholder="confirm strong password"
              >
              <LockClosedIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 hover:text-gray-400" />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="registrationErrors.confirmPassword" class="mt-1 text-sm text-red-400">
              {{ registrationErrors.confirmPassword }}
            </p>
          </div>
        </div>

        <!-- Terms & Conditions -->
        <div class="flex items-start">
          <input
            id="terms"
            v-model="form.acceptTerms"
            type="checkbox"
            required
            :class="{ 'border-red-500': registrationErrors.acceptTerms }"
            class="mt-1 rounded border-dark-700 bg-dark-800 text-primary-600 focus:ring-primary-500 focus:ring-offset-dark-950"
          >
          <label for="terms" class="ml-3 text-sm text-gray-300">
            I agree to the <a href="#" class="text-primary-400 hover:text-primary-300">terms of use</a> and
            <a href="#" class="text-primary-400 hover:text-primary-300">privacy policy</a>
          </label>
        </div>
        <p v-if="registrationErrors.acceptTerms">
          {{ registrationErrors.acceptTerms }}
        </p>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-primary text-lg py-3 flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="block loading-spinner" />
          <span v-else>Create an account</span>
        </button>

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-gray-400">
            Already have account ?
          </p>
          <NuxtLink to="/auth/login" class="font-medium text-primary-400 hover:text-primary-300">
            Sign in
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
