<template>
  <a-layout-sider
    width="256px"
    class="layout-sider"
    :collapsed="menu.collapsed"
  >
    <Logo :show-title="!menu.collapsed" />
    <Menu :data="data" />
  </a-layout-sider>
</template>
<script lang="ts" setup>
import { useLayoutConfig, useMenuState } from '@/store/helpers/layoutHelpers'
import { computed, toRefs, watch } from 'vue'
import Menu from './Menu'
import Logo from './Logo.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const { menuType } = toRefs(useLayoutConfig())
const { menu } = useMenuState()
if (menuType.value === 'topLeft') {
  watch(() => route, (val) => {
    const routeName = val.matched[1].name
    const matchedData = menu.data.find(item => item.name === routeName)
    const subData = matchedData?.children && matchedData.children.length ? matchedData.children : [matchedData]
    store.commit('layout/setSubData', subData)
  }, { immediate: true, deep: true })
}
const data = computed(() => menuType.value === 'topLeft' ? menu.subData : menu.data)
</script>
<style lang="less">
  .layout-sider {
    .ant-menu-item-selected {
      border-bottom: none!important;
    }
  }
</style>
