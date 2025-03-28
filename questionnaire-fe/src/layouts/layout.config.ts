import { InjectionKey } from 'vue'
export interface ILayoutConfig {
  breadcrumb: boolean,
  menuType: 'left' | 'top' | 'topLeft',
  theme: 'dark' | 'light',
  logo: boolean,
  footer: {
    show: boolean,
    text1: string,
    text2: string
  }
}
export default {
  breadcrumb: true,
  menuType: 'left',
  theme: 'dark',
  logo: true,
  footer: {
    show: true,
    text1: 'YOU——WANT 提供计算服务',
    text2: `Copyright © ${new Date().getFullYear()} YOU——WANT 出品`
  }
}
export const key: InjectionKey<ILayoutConfig> = Symbol('AppConfig')
