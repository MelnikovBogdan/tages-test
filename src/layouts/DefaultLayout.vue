<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import TheBreadcrumbs from '@/layouts/components/TheBreadcrumbs.vue'

// VARIABLES
const route = useRoute()

// COMPUTED
const title = computed(() => {
  return route?.meta.title ?? 'No title'
})
</script>

<template>
  <div class="container">
    <header>
      <TheBreadcrumbs
        class="breadcrumbs"
      />
      <h1>
        {{ title }}
      </h1>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .container {
    max-width: 100%;
    margin: auto;
    padding: 24px 24px;
  }
}

@media only screen and (min-width: 600px) {
  .container {
    padding: 24px 24px;
    margin: auto;
    max-width: 576px;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .container {
    padding: 24px 0;
    margin: auto;
    max-width: 740px;
  }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .container {
    padding: 24px 0;
    margin: auto;
    max-width: 900px;
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .container {
    padding: 24px 0;
    margin: auto;
    max-width: 1100px;
  }
}

@media only screen and (min-width: 1536px) {
  .container {
    padding: 24px 0 ;
    margin: auto;
    max-width: 1300px;
  }
}

@media only screen and (min-width: 1780px) {
  .container {
    padding: 24px 0 ;
    margin: auto;
    max-width: 1500px;
  }
}

header {
  margin-bottom: 32px;
}

header .breadcrumbs {
  margin-bottom: 32px;
}

header h1 {
  font-weight: 600;
  line-height: 48px;
}

main {
  display: flex;
  flex-direction: column;
}
</style>
