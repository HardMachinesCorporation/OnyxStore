<script setup lang="ts">
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

function handleLogout() {
  showUserMenu.value = false
  // TODO Logout logic will be implemented here
  navigateTo('/auth/logout')
}

/*
*This pattern lets you automatically close your user-menu when the user clicks
* anywhere outside it, and it cleans up the event listener when
* the component is destroyed
*/
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // 1) Ensure the ref actually points to an element
    // 2) Check that the click target is *not* inside that element
    if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
      // If the click was outside the menu, close it
      showUserMenu.value = false
    }
  }
  /*
   * Each time you click, handleClickOutside checks if
   * it happened outside the menu and closes it
   * *if so onUnmounted(() => { … })
   */
  document.addEventListener('mousedown', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })
})
</script>

<template>
  <header class="sticky top-0 z-40 bg-dark-950/95 backdrop-blur-sm border-b-dark-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">O</span>
            </div>
            <span class="ml-1 text-xl font-bold text-gray-100">nyx Premium store</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            to="/products"
            class="navigation-link"
          >
            Products
          </NuxtLink>
          <NuxtLink
            to="/categories"
            class="navigation-link"
          >
            Categories
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="navigation-link"
          >
            About me
          </NuxtLink>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <button class="p-2 text-gray-300 hover:text-primary-400 transition-colors duration-200">
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>
          <!-- Cart -->
          <button class="relative p-2 text-gray-300 hover:text-primary-400 transition-colors duration-200">
            <ShoppingCartIcon class="h-5 w-5" />
            <span class="absolute -top-1 -right-1 h-4 w-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
              <!--- TODO Must be reactive -->
              3
            </span>
          </button>

          <!-- User Menu -->

          <div ref="userMenuRef" class="relative">
            <!-- in each click, take the opposite value -->
            <button
              class="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors duration-200"
              @click="showUserMenu = !showUserMenu"
            >
              <UserIcon class="h-5 w-5" />
              <ChevronDownIcon class="h-4 w-4" />
            </button>

            <!-- Dropdown -->
            <transition name="fade">
              <div
                v-show="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-dark-900 border-dark-700 rounded-lg shadow-lg py-1"
              >
                <NuxtLink
                  to="/auth/login"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-800 hover:text-primary-400 transition-colors duration-200"
                  @click="showUserMenu = false"
                >
                  Login
                </NuxtLink>
                <NuxtLink
                  to="/auth/register"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-800 hover:text-primary-400 transition-colors duration-200"
                  @click="showUserMenu = false"
                >
                  Register
                </NuxtLink>
                <!-- separator line -->
                <div class="border-t border-dark-700 my-1" />
                <button
                  class="w-full text-left px-4 text-sm text-gray-300 hover:bg-dark-800 hover:text-red-400 transition-colors duration-200"
                  @click="handleLogout"
                >
                  Logout
                </button>
              </div>
            </transition>
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 text-gray-300 hover:text-primary-400 transition-colors duration-200"
            @click="showMobileMenu = !showMobileMenu"
          >
            <Bars3Icon v-if="!showMobileMenu" class="h-6 w-6" />
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition name="slide">
        <div v-show="showMobileMenu" class="md:hidden border-t border-dark-800 py-4 space-y-2 ">
          <NuxtLink to="/products" class="block text-gray-300 hover:text-primary-400 px-3 py-2 text-base font-medium transition-colors duration-200">
            Products
          </NuxtLink>
          <NuxtLink
            to="/categories"
            class="block text-gray-300 hover:text-primary-400 px-3 py-2  text-base font-medium transition-colors duration-200"
          >
            Categories
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="block text-gray-300 hover:text-primary-400 px-3 py-c text-base font-medium transition-colors duration-200"
          >
            About the developer
          </NuxtLink>
        </div>
      </transition>
    </div>
  </header>
</template>
