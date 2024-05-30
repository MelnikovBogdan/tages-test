<script setup lang="ts">
import { computed, ref } from 'vue'
import itemsData from '@/assets/json/items.json'
import materialsData from '@/assets/json/meterials.json'
import VListbox from '@/components/VListbox.vue'
import type { Item } from '@/types/item'
import ItemCard from '@/views/storage-systems/shelving-kits/components/ItemCard.vue'

// INTERFACES
interface Material {
  id: string
  name: string
}

interface CostSortOption {
  id: 'ASC' | 'DESC'
  name: string
}

interface Filter {
  material: Material | undefined
  costSort: CostSortOption
}

// CONSTANTS
const COST_SORT_OPTIONS: Array<CostSortOption> = [
  { id: 'ASC', name: 'Цена по возрастанию' },
  { id: 'DESC', name: 'Цена по убыванию' },
]

// VARIABLES
const filter = ref<Filter>({
  costSort: COST_SORT_OPTIONS[0],
  material: undefined,
})

const materials: Array<Material> = materialsData
const items = ref<Array<Item>>(itemsData)

// COMPUTED
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    if (!filter.value.material) {
      return true
    }

    return item.material === +filter.value.material.id
  })
})

const sortedItems = computed(() => {
  const copyItems = [...filteredItems.value]

  return copyItems.sort((a, b) => {
    if (filter.value.costSort.id === 'ASC') {
      return a.price.current_price - b.price.current_price
    }

    return b.price.current_price - a.price.current_price
  })
})
</script>

<template>
  <div class="filter">
    <VListbox
      v-model="filter.costSort"
      label="Сортировать по:"
      :options="COST_SORT_OPTIONS"
      name-field="name"
      value-field="id"
    />
    <VListbox
      v-model="filter.material"
      :options="materials"
      label="Материал"
      name-field="name"
      value-field="id"
    />
  </div>
  <div class="items-wrapper">
    <ItemCard
      v-for="item in sortedItems" :key="item.id"
      :item="item"
    />
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 24px;
  margin-bottom: 41px;
  container-name: filter;
  container-type: inline-size;
}

@media (max-width: 767px){
  .items-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}

.items-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(336px, 0fr));
  gap: 24px;
}

@media (max-width: 767px){
  .items-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
  .filter {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
