import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useFavoritesStore = defineStore('favoritesStore', () => {
  // STATE
  const storage = useStorage<Array<string>>('favorites', [])

  // GETTERS
  const favorites = computed(() => storage.value)
  const favoritesCount = computed(() => storage.value.length)

  // ACTIONS
  function addToFavorites(itemId: string) {
    storage.value.push(itemId)
  }

  function removeFromFavorites(itemId: string) {
    storage.value = storage.value.filter(id => id !== itemId)
  }

  function isAlreadyFavorite(itemId: string) {
    return favorites.value.includes(itemId)
  }

  return {
    favorites,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    isAlreadyFavorite,
  }
})
