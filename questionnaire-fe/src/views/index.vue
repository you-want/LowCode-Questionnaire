<template>
  <a-card title="布局">
    <a-button-group>
      <a-button
        :type="active('left')"
        @click="switchType('left')"
      >
        Left
      </a-button>
      <a-button
        @click="switchType('top')"
        :type="active('top')"
      >
        Top
      </a-button>
      <a-button
        @click="switchType('topLeft')"
        :type="active('topLeft')"
      >
        TopLeft
      </a-button>
    </a-button-group>
  </a-card>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const active = computed(() => (type: string) => store.state.layout.menuType === type ? 'primary' : 'default')
function switchType (type: string) {
  store.commit('layout/setMenuType', type)
}
</script>
