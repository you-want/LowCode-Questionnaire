<template>
  <a-modal
    v-model:visible="visiblePreview"
    :destroy-on-close="true"
    :footer="null"
    :width="800"
    :body-style="{padding: 0}"
    title="预览"
  >
    <Preview />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Preview from '@/views/question/preview.vue'

export default defineComponent({
  components: { Preview },
  props: {
    visible: { type: Boolean, default: () => false }
  },
  setup (props, context) {
    const visiblePreview = ref<Boolean>(false)
    const setVisiblePreview = (id?: string) => {
      visiblePreview.value = !visiblePreview.value
    }
    return {
      visiblePreview,
      setVisiblePreview
    }
  }
})
</script >

<style lang="less" scoped>
</style >
