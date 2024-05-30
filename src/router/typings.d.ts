// Ensure this file is parsed as a module regardless of dependencies.
import type { Component } from 'vue'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    layout?: InstanceType<Component>
    breadcrumbs: Array<string> // Routes names
  }
}
