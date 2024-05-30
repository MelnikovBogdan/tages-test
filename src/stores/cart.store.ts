import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useCartStore = defineStore('cartStore', () => {
  // STATE
  const storage = useStorage<Array<string>>('cart', [])

  // GETTERS
  const cart = computed(() => storage.value)
  const cartItemsCount = computed(() => storage.value.length)

  // ACTIONS
  function addToCart(itemId: string) {
    storage.value.push(itemId)
  }

  function removeFromCart(itemId: string) {
    storage.value = storage.value.filter(id => id !== itemId)
  }

  function isAlreadyInCart(itemId: string) {
    return cart.value.includes(itemId)
  }

  return {
    cart,
    cartItemsCount,
    addToCart,
    removeFromCart,
    isAlreadyInCart,
  }
})
