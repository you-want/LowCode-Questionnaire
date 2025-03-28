import type { App, Plugin } from 'vue'

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

export const downloadFile = (data: any, title?: string) => {
  if (!data) return
  const url = window.URL.createObjectURL(data.data)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  title && link.setAttribute('download', title + '.xls')

  document.body.appendChild(link)
  link.click()
}
