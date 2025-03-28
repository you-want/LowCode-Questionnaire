import { defineComponent, provide, PropType } from 'vue'
import config, { ILayoutConfig, key } from '@/layouts/layout.config'

const AppProvider = defineComponent({
  name: 'AppProvider',
  props: {
    config: {
      type: Object as PropType<ILayoutConfig>,
      default: () => config
    }
  },
  setup (props, { slots }) {
    provide(key, props.config)
    return slots.default
  }
})

export default AppProvider
