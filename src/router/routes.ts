import type { RouteRecordRaw } from 'vue-router'
import MainView from '@/views/MainView.vue'
import StorageSystemsView from '@/views/storage-systems/StorageSystemsView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ShelvingKitsView from '@/views/storage-systems/shelving-kits/ShelvingKitsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    meta: {
      title: 'Главная',
      layout: DefaultLayout,
      breadcrumbs: ['main'],
    },
  },
  {
    path: '/storage-systems',
    name: 'storage-systems',
    component: StorageSystemsView,
    meta: {
      title: 'Системы хранения',
      layout: DefaultLayout,
      breadcrumbs: ['main', 'storage-systems'],
    },
  },
  {
    path: '/storage-systems/shelving-kits',
    name: 'shelving-kits',
    component: ShelvingKitsView,
    meta: {
      title: 'Комплекты стеллажных систем',
      layout: DefaultLayout,
      breadcrumbs: ['main', 'storage-systems', 'shelving-kits'],
    },
  },
]

export default routes
