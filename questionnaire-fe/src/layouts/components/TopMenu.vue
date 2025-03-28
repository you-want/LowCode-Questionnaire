<template>
  <div class="top-menu-wrapper">
    <Menu
      :data="menuData"
      mode="horizontal"
      :item-click="onItemClick"
      :selected-keys="selectedKeys"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { useLayoutConfig } from '@/store/helpers/layoutHelpers'
import Menu from './Menu'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = useLayoutConfig()
const selectedKeys = ref<string[]>([route.matched[1].name as string])

const menuData = computed(() => {
  return layout.menu.data.map(item => {
    if (layout.menuType !== 'topLeft') {
      return item
    } else {
      const itemData = cloneDeep(item)
      delete itemData.children
      return itemData
    }
  })
})
const onItemClick = (index: number) => {
  selectedKeys.value = [layout.menu.data[index].name]
}
</script>

<style lang="less">
.top-menu {
  margin-left: 20px;
  height: 64px;
  display: inline-block;
  .top-menu-item {
    height: 100%;
    font-size: 15px;
    font-weight: 600;
  }
}
.top-menu-wrapper {
  .ant-menu-item-selected {
    border-bottom: 2px solid @errorColor!important;
    height: 64px;
  }
}

</style>
