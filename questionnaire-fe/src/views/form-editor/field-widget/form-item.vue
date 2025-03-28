<template>
  <div
    class="form-item-box"
    :class="{ selected: diffSelected }"
    @click="selectField"
  >
    <!-- 表单项 -->
    <a-form-item
      v-if="!(purpose==='render' && widget.hidden)"
      class="form-item"
      v-bind="formItemProps"
      :name="widget.key"
      :label="getLabel"
    >
      <slot />
    </a-form-item>
    <!-- 标签名字 -->
    <div
      class="tool1 drag-handler"
      v-if="diffSelected"
    >
      <a-space>
        <a-tooltip
          placement="top"
        >
          <template #title>
            <span>可拖拽</span>
          </template>
          <DragOutlined />
        </a-tooltip>
        {{ widget.tagName }}
        <a-tooltip
          placement="top"
          v-if="widget.hidden"
        >
          <template #title>
            <span>已隐藏</span>
          </template>
          <EyeInvisibleOutlined />
        </a-tooltip>
      </a-space>
    </div>
    <!-- 标签操作区域 -->
    <div
      class="tool2"
      v-if="diffSelected"
    >
      <a-space>
        <a-tooltip
          v-if="indexOfParentList !== 0"
          placement="bottom"
        >
          <template #title>
            <span>上移</span>
          </template>
          <ArrowUpOutlined

            @click.stop="moveUpWidget(indexOfParentList)"
          />
        </a-tooltip>
        <a-tooltip
          placement="bottom"
          v-if="indexOfParentList !== parentList.length - 1"
        >
          <template #title>
            <span>下移</span>
          </template>
          <ArrowDownOutlined
            @click.stop="moveDownWidget(indexOfParentList)"
          />
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template #title>
            <span>复制</span>
          </template>
          <CopyOutlined @click.stop="copyFieldWidget(indexOfParentList)" />
        </a-tooltip>
        <a-tooltip placement="bottom">
          <template #title>
            <span>删除</span>
          </template>
          <DeleteOutlined @click.stop="removeFieldWidget(indexOfParentList)" />
        </a-tooltip>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  DragOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons-vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'

export default defineComponent({
  name: 'FormItem',
  components: {
    DragOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CopyOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined
  },
  props: {
    formItemProps: { type: Object, default: () => {} },
    widget: { type: Object, default: () => {} },
    indexOfParentList: { type: Number, default: -1 },
    parentList: { type: Array, default: () => [] },
    // render 渲染，setting 设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props) {
    const {
      getSelectedWidget,
      setSelected,
      moveUpWidget,
      moveDownWidget,
      removeFieldWidget,
      copyFieldWidget
    } = useEditorHelpers()

    const selectField = () => {
      props.purpose === 'drag' && setSelected(props.widget)
    }

    const diffSelected = computed(() => {
      const selectedKey = getSelectedWidget.value?.key || ''
      return props.purpose === 'drag' && props.widget.key === selectedKey
    })

    const getLabel = computed(() => {
      let label: string = ''
      // if (props.purpose === 'render' || props.purpose === 'drag') {
      //   label += `${props.indexOfParentList + 1}. `
      // }
      label += `${props.formItemProps.label}`
      return label
    })

    return {
      selectField,
      diffSelected,
      getSelectedWidget,
      moveUpWidget,
      moveDownWidget,
      removeFieldWidget,
      copyFieldWidget,
      getLabel
    }
  }
})
</script>

<style lang="less" scoped>
.form-item-box {
  position: relative;
  :hover {
    cursor: pointer;
  }
}
.selected {
  outline: 2px solid #409eff;
  .tool1 {
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    line-height: 20px;
    z-index: 9;
    background: rgba(64, 158, 255, 0.7);
    font-size: 12px;
    font-style: normal;
    color: #fff;
    padding: 0 8px;
    cursor: move;
  }
  .tool2 {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 22px;
    line-height: 22px;
    background: #409eff;
    z-index: 9;
    cursor: pointer;
    color: #fff;
    padding: 0 8px;
  }
}
</style>
