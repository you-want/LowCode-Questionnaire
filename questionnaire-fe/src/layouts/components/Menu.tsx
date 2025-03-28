import { defineComponent, PropType, reactive, watch } from 'vue'
import { Menu, MenuProps } from 'ant-design-vue'
import { useRoute, RouterLink } from 'vue-router'
import { MenuMode, MenuTheme } from 'ant-design-vue/lib/menu/src/interface'
const { Item, SubMenu } = Menu
export interface IMenuData {
  path: string;
  name: string;
  meta: {
    title: string;
    icon: string;
  },
  children?: IMenuData[]
}
const SideMenuWrapper = defineComponent({
  name: 'MenuWrapper',
  emits: ['subClick'],
  props: {
    data: {
      type: Array as PropType<IMenuData[]>,
      default: () => []
    },
    itemClick: {
      type: Function as PropType<(index: number) => void>,
      default: () => { }
    }
  },
  setup () {
    return function render (props: { data: IMenuData[], itemClick: Function }) {
      return props.data.map((item, index) => {
        if (item.children && item.children.length) {
          return <SideSubMenu data={item} />
        } else {
          return <SideMenuItem data={item} itemClick={props.itemClick && props.itemClick.bind(null, index)} />
        }
      })
    }
  }
})
const SideMenuItem = defineComponent({
  name: 'SideMenuItem',
  props: {
    data: {
      type: Object as PropType<IMenuData>,
      default: () => ({})
    },
    itemClick: {
      type: Function,
      default: () => { }
    }
  },
  setup () {
    return function render (props: { data: IMenuData, itemClick: Function }) {
      function onClick () {
        props.itemClick && props.itemClick()
      }
      const { meta: { icon, title }, name, path } = props.data
      return <Item key={name} onClick={onClick}>
        <RouterLink to={path}>
          <icon />
          <span>{title}</span>
        </RouterLink>
      </Item>
    }
  }
})
const SideSubMenu = defineComponent({
  name: 'SideSubMenu',
  emits: ['subClick'],
  props: {
    data: {
      type: Object as PropType<IMenuData>,
      default: () => ({})
    }
  },
  setup () {
    return function render (props: { data: IMenuData }) {
      const { meta: { icon, title }, name, children } = props.data
      return (
        <SubMenu
          title={title}
          icon={<icon />}
          key={name}
        >
          <SideMenuWrapper data={children} />
        </SubMenu>
      )
    }
  }
})
interface ISideMenuProps extends MenuProps {
  data: IMenuData[],
  collapsed: boolean,
  itemClick: (index: number) => void
}
const SideMenu = defineComponent({
  name: 'SideMenu',
  emits: ['subClick'],
  props: {
    data: {
      type: Array as PropType<IMenuData[]>,
      default: () => []
    },
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String as PropType<MenuMode>,
      default: 'inline'
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: () => null
    },
    itemClick: {
      type: Function as PropType<(index: number) => void>,
      default: () => { }
    }
  },
  setup (props) {
    const route = useRoute()
    const menuState = reactive({
      openKeys: route.matched.map(item => item.name),
      selectedKeys: [route.name]
    })
    // 没有传入selectedKeys， 根据路由变化生成一个
    if (!props.selectedKeys) {
      watch(() => route, (val) => {
        menuState.openKeys = route.matched.map(item => item.name)
        menuState.selectedKeys = [val.name]
      }, { deep: true })
    }

    return function render (props: ISideMenuProps) {
      return (
        <Menu
          theme={props.theme}
          mode={props.mode}
          inlineCollapsed={props.collapsed}
          openKeys={menuState.openKeys}
          selectedKeys={props.selectedKeys || menuState.selectedKeys}
        >
          <SideMenuWrapper
            data={props.data}
            itemClick={props.itemClick}
          />
        </Menu>
      )
    }
  }
})

export default SideMenu
