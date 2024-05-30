<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '@/types/item'
import HeartIcon from '@/assets/icons/HeartIcon'
import CartIcon from '@/assets/icons/CartIcon'
import { useFavoritesStore } from '@/stores/favorites.store'
import { useCartStore } from '@/stores/cart.store'

interface Props {
  item: Item
}

const props = defineProps<Props>()

// VARIABLES
const {
  addToFavorites,
  isAlreadyFavorite,
  removeFromFavorites,
} = useFavoritesStore()

const {
  addToCart,
  isAlreadyInCart,
  removeFromCart,
} = useCartStore()

// COMPUTED
const isSelling = computed(() => {
  return props.item.price.old_price !== null
    && props.item.price.old_price > props.item.price.current_price
})

// METHODS
function onFavoriteButtonClick() {
  if (isAlreadyFavorite(props.item.id)) {
    removeFromFavorites(props.item.id)
    return
  }

  addToFavorites(props.item.id)
}

function onCartButtonClick() {
  if (isAlreadyInCart(props.item.id)) {
    removeFromCart(props.item.id)
    return
  }

  addToCart(props.item.id)
}
</script>

<template>
  <article
    class="item-card"
  >
    <img
      class="item-card__image"
      :src="item.image.url"
      :alt="item.name"
    >
    <header class="item-card__header">
      <p class="item-card__code">
        {{ item.code }}
      </p>
      <h4 class="item-card__name">
        {{ item.name }}
      </h4>
      <p class="item-card__price">
        <span
          v-if="item.price.old_price"
          class="item-card__price__old"
        >
          {{ item.price.old_price }}₽
        </span>
        <span
          class="item-card__price__current"
        >
          {{ item.price.current_price }}₽
        </span>
      </p>
    </header>
    <div class="item-card__actions">
      <button
        type="button"
        class="item-card__favorite-button"
        :class="{ 'item-card__favorite-button--active': isAlreadyFavorite(item.id) }"
        @click="onFavoriteButtonClick"
      >
        <HeartIcon class="item-card__favorite-button__icon" />
      </button>
      <button
        type="button"
        class="item-card__cart-button"
        :class="{ 'item-card__cart-button--active': isAlreadyInCart(item.id) }"
        @click="onCartButtonClick"
      >
        <CartIcon class="item-card__cart-button__icon" />
      </button>
    </div>
    <div
      v-if="isSelling"
      class="item-card__selling-label"
    >
      Скидка
    </div>
  </article>
</template>

<style scoped>
.item-card {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 352px;
  padding: 9px 12px 10px 12px;
  border: 1px solid #EEEEEE;
}

.item-card__image {
  width: 238px;
  height: 237px;
}

.item-card__header {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6px;
}

.item-card__code {
  font-size: 10px;
  line-height: 14px;
  color: #888888;
  font-weight: 400;
}

.item-card__name {
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  font-weight: 500;
}

.item-card__price {
  display: flex;
  gap: 9px;
}

.item-card__price__old {
  font-size: 16px;
  line-height: 22px;
  color: #888888;
  text-decoration: line-through;
  font-weight: 400;
}

.item-card__price__current {
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  font-weight: 400;
}

.item-card__actions {
  display: flex;
  position: absolute;
  bottom: 4px;
  right: 14px;
  gap: 11px;
}

.item-card__favorite-button {
  width: 36px;
  height: 36px;
  padding: 7.2px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: 200ms ease-in-out;
  border-radius: 100%;
}

.item-card__favorite-button:hover {
  background-color: #ffb9b9;
  border-radius: 100%;
}

.item-card__favorite-button.item-card__favorite-button--active {
  background-color: #ffa6a6;
}

.item-card__favorite-button__icon {
  margin-top: 2px;
  fill: black;
}

.item-card__cart-button {
  width: 36px;
  height: 36px;
  padding: 7.2px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: 200ms ease-in-out;
  border-radius: 100%;
}

.item-card__cart-button:hover {
  background-color: #F2F2F2;
  border-radius: 100%;
}

.item-card__cart-button.item-card__cart-button--active {
  background-color: #d3d3d3;
}

.item-card__selling-label {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 8px;
  left: 0;
  width: 81px;
  height: 24px;
  background-color: #EB5757;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
}
</style>
