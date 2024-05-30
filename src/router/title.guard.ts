import type { NavigationGuard } from 'vue-router'
import { useTitle } from '@vueuse/core'

const titleGuard: NavigationGuard = async function (to) {
  useTitle(to?.meta.title ?? 'No title')
}

export default titleGuard
