import type { ObjectDirective } from 'vue'
import { useManagerStore } from '@/stores/manager'
import { storeToRefs } from 'pinia'

let managerStore = null
let ruleNames: any = null

function hasPermission(value: string[], el: Element | null = null): boolean {
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
  }

  const hasAuth = value.findIndex(v => ruleNames.includes(v)) !== -1

  if (el && !hasAuth) {
    el.parentNode && el.parentNode.removeChild(el)
  }

  return hasAuth
}

const permissionDirective: ObjectDirective<Element> = {
  mounted(el, binding) {
    managerStore = useManagerStore()
    ruleNames = managerStore.ruleNames
    hasPermission(binding.value as string[], el)
  }
}

export default {
  install(app: any) {
    app.directive('permission', permissionDirective)
  }
}
