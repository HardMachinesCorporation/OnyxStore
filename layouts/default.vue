<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import Footer from '~/components/app/footer.vue'
import type { AddNotificationFn, INotification, NotificationType } from '~/types/notification'

const pending = ref(false)
const notifications = ref<INotification[]>([])

const addNotification: AddNotificationFn = (message: string, type: NotificationType = 'success') => {
  const id: number = Date.now()
  notifications.value.push({ id, message, type })

  setTimeout(() => {
    removeNotification(id)
  }, 5000)
}

function removeNotification(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}
// Provide global functions
provide('showLoading', (show = true) => {
  pending.value = show
})
provide<AddNotificationFn>('addNotification', addNotification)
</script>

<template>
  <div class="min-h-screen bg-dark-950">
    <AppHeader />

    <main class="relative">
      <slot />
    </main>

    <Footer />

    <!-- Global Loading Overlay -->
    <div v-if="pending" class="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="card text-center">
        <div class="loading-spinner mx-auto mb-4" />
        <p class="text-gray-300">
          Loading in progress...
        </p>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <transition-group name="slide" tag="div">
        <div
          v-for="notification in notifications" :key="notification.id" class="card max-w-sm"
          :class="{
            'border-1-4 border-primary-500': notification.type === 'success',
            'border-1-4 border-red-500': notification.type === 'error',
            'border-1-4 border-yellow-500': notification.type === 'warning',
          }"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <CheckCircleIcon v-if="notification.type === 'success'" class="h-5 w-5 text-primary-400" />
              <ExclamationTriangleIcon v-else-if="notification.type === 'warning' " class="h-5 w-5 text-accent-400" />
              <XCircleIcon v-else-if="notification.type = 'error'" class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-100">
                {{ notification.message }}
              </p>
            </div>
            <div>
              <button class="text-gray-400 hover:text-gray-300" @click="removeNotification(notification.id)">
                <XMarkIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
