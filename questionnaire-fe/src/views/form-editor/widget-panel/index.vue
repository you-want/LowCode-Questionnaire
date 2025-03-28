<template>
  <a-card
    title="组件库"
    class="widget-panel"
    size="small"
    :body-style="{ padding: '16px' }"
    :head-style="{ padding: '4px 16px' }"
  >
    <draggable
      tag="ul"
      :list="basicFields"
      item-key="key"
      :group="{ name: 'dragGroup', pull: 'clone', put: false }"
      :clone="handleFieldWidgetClone"
      ghost-class="ghost"
      :sort="false"
    >
      <template #item="{ element: fld }">
        <a-button
          class="field-widget-item"
          @dblclick="addFieldByDbClick(fld)"
        >
          {{ fld.tagName }}
        </a-button>
      </template>
    </draggable>
    <!-- <a-collapse
      v-model:activeKey="activeKey"
      expand-icon-position="right"
    >
      <a-collapse-panel
        key="1"
        header="基础组件"
      >
        <draggable
          tag="ul"
          :list="basicFields"
          item-key="key"
          :group="{name: 'dragGroup', pull: 'clone', put: false}"
          :clone="handleFieldWidgetClone"
          ghost-class="ghost"
          :sort="false"
        >
          <template #item="{ element: fld }">
            <a-button
              class="field-widget-item"
              @dblclick="addFieldByDbClick(fld)"
            >
              {{ fld.tagName }}
            </a-button>
          </template>
        </draggable>
      </a-collapse-panel>
    </a-collapse> -->
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'
import { BasicFields } from './widgetsConfig'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
import { deepClone, getRandomCode } from '@/utils/utils'

export default defineComponent({
  components: { draggable },
  props: {},
  setup (props) {
    const { copyNewWidget, addNewWidget } = useEditorHelpers()

    const activeKey = ref(['1'])
    const basicFields = ref(BasicFields)

    // 拖拽clone 出新组件
    const handleFieldWidgetClone = (origin: any) => {
      const newWidget = deepClone(origin)
      newWidget.key = getRandomCode(5)
      copyNewWidget(newWidget)
      return newWidget
    }
    // 双击增加新组件
    const addFieldByDbClick = (widget: any) => {
      const newWidget = deepClone(widget)
      newWidget.key = getRandomCode(5)
      addNewWidget(newWidget)
    }
    return {
      activeKey,
      basicFields,
      handleFieldWidgetClone,
      addFieldByDbClick
    }
  }
})
</script>

<style lang="less">
.widget-panel {
  height: 100%;
  overflow: auto;
}
.field-widget-item {
  display: inline-block;
  width: 115px;
  margin: 2px 6px 6px 0;
  cursor: move;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background: #f1f2f3;
}
</style >
