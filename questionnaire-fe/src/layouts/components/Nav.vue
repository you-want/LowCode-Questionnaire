<template>
  <a-layout-header class="layout-header">
    <!-- logo -->
    <div
      class="nav-wrapper logo-wrapper"
      v-if="showLogo"
    >
      <Logo
        :show-title="!menu.collapsed"
      />
    </div>
    <!-- 折叠按钮 -->
    <div
      v-if="showFoldButton"
      class="nav-wrapper fold-icon-box"
      @click="toggleCollapsed"
    >
      <MenuFoldOutlined
        class="fold-icon"
        v-if="!menu.collapsed"
      />
      <MenuUnfoldOutlined
        class="fold-icon"
        v-else
      />
    </div>
    <!-- 面包屑 -->
    <div
      class="bread-wrapper"
      v-if="showBread"
    >
      <Breadcrumb color="white" />
    </div>
    <!-- 顶部菜单 -->
    <div
      class="nav-wrapper menu-wrapper"
    >
      <TopMenu v-if="showTopMenu" />
    </div>
    <!-- 用户信息 -->
    <div class="nav-wrapper user-wrapper">
      <User />
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { useLayoutConfig, useMenuState } from '@/store/helpers/layoutHelpers'
import User from './User.vue'
import Logo from './Logo.vue'
import TopMenu from './TopMenu.vue'
import Breadcrumb from './Breadcrumb.vue'
import { computed } from '@vue/reactivity'

const { menu, toggleCollapsed } = useMenuState()
const layout = useLayoutConfig()
const showFoldButton = computed(() => layout.menuType !== 'top')
const showBread = computed(() => layout.menuType === 'left')
const showTopMenu = computed(() => layout.menuType !== 'left')
const showLogo = computed(() => layout.menuType === 'top')

// const logoSpan = computed(() => (collapsed: Boolean) => collapsed ? 2 : 5)
</script>

<style lang="less">
.layout-header {
  padding-left: 10px!important;
  padding-right: 10px!important;
  display: flex;
  align-items: center;
  .fold-icon-box {
    display: inline-block;
    align-items: center;
    height: 100%;
    margin-right: 20px;
    .fold-icon {
      color: white;
      font-size: 20px;
      display: inline-block;
      vertical-align: middle;
    }
    .fold-icon:hover{
      cursor: pointer;
      color: @primaryColor;
    }
  }
  .logo-wrapper {
    width: 280px
  }
  .menu-wrapper {
    width: calc(100% - 256px - 256px);
    flex: 1;
    display: flex;
  }
  .user-wrapper {
    width: 256px;
    text-align: right;
  }
}

</style>
