<script setup lang="ts">
type ColorType = 'primary' | 'accent' | 'white' | 'gray'
const props = withDefaults(defineProps<{
  text?: string
  size?: string
  color?: ColorType
  containerClass?: string
}>(), {
  size: '2rem',
  text: '',
  color: 'primary',
  containerClass: 'p-8',
})

const spinnerClass = computed(() => {
  const colors = {
    primary: 'border-primary-600',
    accent: 'border-accent-600',
    white: 'border-white',
    gray: 'border-gray-400',
  }
  return colors[props.color] || colors.primary
})

const textClass = computed(() => {
  const colors = {
    primary: 'text-primary-400',
    accent: 'text-accent-400',
    white: 'text-white',
    gray: 'text-gray-400',
  }
  return `text-s; font-medium ${colors[props.color] || colors.primary}`
})
</script>

<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <div
        class="loading-spinner"
        :class="spinnerClass"
        :style="{ width: size, height: size }"
      />
      <div v-if="text" class="mt-3 text-center">
        <p :class="textClass">
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>
