<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 100, width: '100%' }">
      <div class="logo-box">
        <Logo :show-title="true" />
      </div>
    </a-layout-header>
    <a-layout-content class="editor-box">
      <router-view class="route-view" />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from './components/Logo.vue'

export default defineComponent({
  components: { Logo },
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
.logo-box{
  float: left;
}
.editor-box{
  padding: 0;
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow: hidden;
}
</style >
