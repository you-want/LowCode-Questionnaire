<template>
  <a-tabs
    v-model:activeKey="activeKey"
    :tab-bar-gutter="0"
    :centered="true"
    class="tabPane"
  >
    <a-tab-pane
      key="1"
      tab="组件设置"
      style="height: 100%; overflow: scroll"
    >
      <CSetting />
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="关联设置"
      style="height: 100%; overflow: scroll"
    >
      <RSetting />
    </a-tab-pane>
    <a-tab-pane
      key="3"
      tab="问卷设置"
      style="height: 100%; overflow: scroll"
    >
      <QSetting />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import QSetting from './q-setting.vue'
import CSetting from './c-setting.vue'
import RSetting from './r-setting.vue'

export default defineComponent({
  name: 'SettingPanel',
  components: { QSetting, CSetting, RSetting },
  props: {
    formList: { type: Array, default: () => [] },
    formProps: { type: Object, default: () => {} }
  },
  setup (props) {
    const activeKey = ref('1')
    return {
      activeKey
    }
  }
})
</script >

<style lang="less">
.tabPane {
  height: 100%;
}
</style >
