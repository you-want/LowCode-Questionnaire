<template>
  <a-layout>
    <LeftSide
      v-if="layout.menuType !== 'top'"
      :logo="layout.logo"
    />
    <a-layout class="content-wrapper">
      <Nav
        :menu-type="layout.menuType"
        :theme="layout.theme"
      />
      <a-layout-content>
        <Breadcrumb v-if="layout.breadcrumb && layout.menuType !== 'left'" />
        <route-view class="route-view" />
        <Footer v-if="layout.footer.show" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import RouteView from './RouteView.vue'
import LeftSide from './components/LeftSide.vue'
// import { inject } from '@vue/runtime-core'
// import { key } from './layout.config'
import { useStore } from '@/store'
// const config = inject(key)!

const store = useStore()
const layout = computed(() => store.state.layout)

</script>

<style>
.layout-sider {
  min-height: 100vh;
}
.content-wrapper {
  max-width: 100%;
  min-width: 1200px;
  overflow: auto;
}
.route-view {
  min-height: calc(100vh - 70px - 64px);
}
</style>
