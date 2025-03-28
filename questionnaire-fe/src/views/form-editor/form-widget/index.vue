<template>
  <div
    class="form-widget-container"
  >
    <div
      class="form-widget-box"
      :class="{ 'layout-h5': getDevice === 'H5' }"
    >
      <a-form
        class="full-height-width widget-form"
        v-bind="getDragFormProps"
      >
        <div class="form-widget-list">
          <!-- <draggable
            :list="getWidgetList"
            item-key="key"
            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            tag="transition-group"
            :component-data="{ name: 'fade' }"
            handle=".drag-handler"
            @end="onDragEnd"
            @add="onDragAdd"
            @update="onDragUpdate"
            :move="checkMove"
          > -->
          <draggable
            :list="getWidgetList"
            item-key="key"
            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
            :component-data="{ name: 'fade' }"
            handle=".drag-handler"
            @end="onDragEnd"
            @add="onDragAdd"
            @update="onDragUpdate"
            :move="checkMove"
          >
            <template #item="{ element: widget, index }">
              <component
                :is="getWidgetName(widget)"
                purpose="drag"
                :widget="widget"
                :key="widget.key"
                :parent-list="getWidgetList"
                :index-of-parent-list="index"
                :parent-widget="null"
                :design-state="true"
              />
            </template>
          </draggable>
          <!-- 没有数据提示 -->
          <template v-if="getWidgetList.length === 0">
            <a-empty
              class="no-data"
              description="请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处."
            />
          </template>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, UnwrapRef } from 'vue'
import draggable from 'vuedraggable'
import FieldComponents from '../field-widget/index'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'

interface FormState {}

export default defineComponent({
  components: { draggable, ...FieldComponents },
  props: {},
  setup (props) {
    const {
      getDevice,
      getWidgetList,
      getDragFormProps,
      setSelected,
      emitHistoryChange
    } = useEditorHelpers()

    const formState: UnwrapRef<FormState> = reactive({})

    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }
    const onDragEnd = (evt: any) => {
      console.log('drag end000', evt)
    }
    const onDragAdd = (evt: any) => {
      console.log('drag add', evt)
      // 很奇怪，第一次newIndex 是 1 ，不是 0
      let newIndex = evt.newIndex
      if (!getWidgetList.value[newIndex] || getWidgetList.value.length > 0) {
        if (!getWidgetList.value[newIndex]) newIndex = getWidgetList.value.length - 1
        setSelected(getWidgetList.value[newIndex])
      }
      emitHistoryChange()
    }

    const onDragUpdate = () => {
      /* 在VueDraggable内拖拽组件发生位置变化时会触发update，未发生组件位置变化不会触发！！ */
      emitHistoryChange()
    }

    const checkMove = (evt: any) => {
      return true
      // return checkWidgetMove(evt);
    }
    const getWidgetName = (widget: any) => {
      return widget.tag + '-widget'
    }

    return {
      getDevice,
      getWidgetList,
      getDragFormProps,
      onSubmit,
      onDragEnd,
      onDragAdd,
      onDragUpdate,
      checkMove,
      getWidgetName
    }
  }
})
</script>

<style lang="less" scoped>
.form-widget-box{
  height: calc(100%);
}
.form-widget-container {
  height: calc(100% - 46px);
  padding: 10px;
  background: #f1f2f3;
  overflow-x: hidden;
  overflow-y: auto;

  .full-height-width {
    min-height: 100%;
    padding: 20px 20px 50px;
    background: #ffffff;

    .form-widget-list {
      min-height: 100%;
      padding: 3px;
    }
  }

  .no-data {
    margin: 50px auto;
  }
}
.layout-h5 {
  height: calc(100% - 40px);
  margin: 20px auto;
  width: 420px;
  border-radius: 15px;
  box-shadow: 0 0 1px 10px #495060;
  overflow: scroll;
}
</style >
