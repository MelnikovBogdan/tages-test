<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

// VARIABLES
const route = useRoute()

// COMPUTED
const layout = computed(() => {
  return route.meta?.layout || EmptyLayout
})
</script>

<template>
  <Component :is="layout">
    <RouterView />
  </Component>
  <div id="dropdownOverlay" />
</template>
