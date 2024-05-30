import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ShelvingKitsView from '@/views/storage-systems/shelving-kits/ShelvingKitsView.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'main',
  //   component: MainView,
  //   meta: {
  //     title: 'Главная',
  //     layout: DefaultLayout,
  //     breadcrumbs: ['main'],
  //   },
  // },
  // {
  //   path: '/storage-systems',
  //   name: 'storage-systems',
  //   component: StorageSystemsView,
  //   meta: {
  //     title: 'Системы хранения',
  //     layout: DefaultLayout,
  //     breadcrumbs: ['main', 'storage-systems'],
  //   },
  // },
  // /storage-systems/shelving-kits
  {
    path: '/',
    name: 'shelving-kits',
    component: ShelvingKitsView,
    meta: {
      title: 'Комплекты стеллажных систем',
      layout: DefaultLayout,
      breadcrumbs: ['main', 'storage-systems', 'shelving-kits'],
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: { name: 'shelving-kits' },
  },
]

export default routes
