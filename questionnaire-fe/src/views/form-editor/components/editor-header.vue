<template>
  <div class="editor-header">
    <a-radio-group
      v-model:value="device"
      @change="deviceChange"
    >
      <a-radio-button value="PC">
        PC
      </a-radio-button>
      <a-radio-button value="H5">
        H5
      </a-radio-button>
    </a-radio-group>
    <a-space>
      <a-button
        type="primary"
        @click="common('clearClick')"
      >
        清空
      </a-button>
      <a-button
        type="primary"
        @click="common('previewClick')"
      >
        预览
      </a-button>
      <a-button
        type="primary"
        @click="common('editClick')"
      >
        保存
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'

export default defineComponent({
  setup (props, { emit }) {
    const { setDevice } = useEditorHelpers()
    const device = ref<string>('PC')

    const deviceChange = () => {
      setDevice(device.value)
    }

    const common = (flag: string) => {
      emit('common', { flag })
    }

    return {
      device,
      deviceChange,
      common
    }
  }
})
</script >

<style lang="less" scoped>
.editor-header {
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style >
