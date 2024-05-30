<template>
  <Transition>
    <slot />
  </Transition>
</template>

<style scoped>
/*noinspection ALL*/
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

/*noinspection ALL*/
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
