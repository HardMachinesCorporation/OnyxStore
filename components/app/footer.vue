<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dark-900 border-t border-dark-800 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">0</span>
            </div>
            <span class="ml-1 text-xl font-bold text-gray-100">nyx Premium store</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mx-w-md">
            Your premium destination for exceptional products.
            We are committed to delivering you with a superior shopping experience.
          </p>
          <div class="flex space-x-4 mt-6">
            <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors duration-200">
              <span class="sr-only">Facebook</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a class="text-gray-400 hover:text-primary-400 transition-colors duration-200">
              <span class="sr-only">Linkedin</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM7.25 19H3.75V8.75h3.5V19zM5.5 7.5c-.966 0-1.75-.784-1.75-1.75S4.534 4 5.5 4A1.754 1.754 0 017.25 5.75 1.754 1.754 0 015.5 7.5zM20.5 19h-3.5v-4.5c0-1.038-.019-2.375-1.448-2.375-1.448 0-1.671 1.131-1.671 2.303V19h-3.5V8.75h3.364v1.353h.048c.468-.887 1.609-1.821 3.309-1.821 3.537 0 4.195 2.329 4.195 5.356V19z" />
              </svg>
            </a>
            <a class="text-gray-400 hover:text-primary-400 transition-colors duration-200">
              <span class="sr-only">X</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/products/products" class="footer-quick-links">
                Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories" class="footer-quick-links">
                Categories
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="footer-quick-links">
                About the developer
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="footer-quick-links">
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
            Support
          </h3>
          <ul class="space-y-3">
            <li><a href="#" class="footer-quick-links">Help Center</a></li>
            <li><a href="#" class="footer-quick-links">Shipping</a></li>
            <li><a href="#" class="footer-quick-links">Returns</a></li>
            <li><a href="#" class="footer-quick-links">Warranty</a></li>
          </ul>
        </div>
      </div>
      <!-- Bottom Bar -->
      <div class="border-t border-dark-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} Onyx Premium Store. by <span><a class="footer-quick-links">Jordach MAKAYA</a></span> All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
            Terms and Conditions
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
