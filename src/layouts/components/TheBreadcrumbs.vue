<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// INTERFACES
interface Breadcrumb {
  label: string
  path: string
}

// VARIABLES
const route = useRoute()
const router = useRouter()

// COMPUTED
const breadcrumbs = computed<Array<Breadcrumb>>(() => {
  const arr: Array<Breadcrumb> = []

  const routeBreadcrumbs: Array<string> = route?.meta.breadcrumbs

  for (const routeName of routeBreadcrumbs) {
    const breadcrumb = getBreadcrumbByRouteName(routeName)
    if (breadcrumb)
      arr.push(breadcrumb)
  }

  return arr
})

// METHODS
function getBreadcrumbByRouteName(routeName: string): Breadcrumb | undefined {
  const routes = router.getRoutes()
  const route = routes.find(r => r.name === routeName)

  if (!route)
    return undefined

  return {
    path: route.path,
    label: route?.meta.title ?? 'No title',
  }
}
</script>

<template>
  <ul class="breadcrumbs">
    <li
      v-for="item of breadcrumbs" :key="item.path"
      class="breadcrumbs__item"
    >
      <router-link
        :to="item.path"
        class="breadcrumbs__item__link"
        exact-active-class="breadcrumbs__item__link--active"
      >
        {{ item.label }}
      </router-link>
      <span class="breadcrumbs__item__separator">/</span>
    </li>
  </ul>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  list-style: none;
}

.breadcrumbs__item__link {
  text-decoration: none;
  color: #888888;
}

.breadcrumbs__item__link:not(.breadcrumbs__item__link--active):hover {
  color: #000000;
  transition: color 200ms ease-in-out;
}

.breadcrumbs__item__link--active {
  color: #000000;
}

.breadcrumbs__item__separator {
  margin: 0 12px;
  color: #888888;
}

.breadcrumbs__item:last-child .breadcrumbs__item__separator {
  display: none;
}
</style>
