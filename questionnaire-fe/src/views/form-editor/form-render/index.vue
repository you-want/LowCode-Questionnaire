
<template>
  <div
    class="form-render"
    :class="{
      'layout-h5':
        (purpose === 'render' || purpose === 'drag') && getDevice === 'H5',
    }"
  >
    <a-form
      ref="formRef"
      v-bind="formProps"
      :scroll-to-first-error="true"
    >
      <template
        v-for="(item, index) in purpose === 'render' ? getWidgetList : formList"
        :key="item.key"
      >
        <component
          :is="getWidgetName(item)"
          :purpose="purpose"
          :widget="item"
          :parent-list="purpose === 'render' ? getWidgetList : formList"
          :index-of-parent-list="index"
          :parent-widget="null"
          :design-state="true"
        />
      </template>
      <a-form-item
        v-if="purpose === 'render'"
        :wrapper-col="{ span: 14, offset: 0 }"
      >
        <a-button
          type="primary"
          html-type="submit"
          @click="onSubmit"
        >
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import FieldComponents from '../field-widget/index'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { Moment } from 'moment'

interface FormState {
  name: string;
  region: string | undefined;
  date1: Moment | undefined;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}

export default defineComponent({
  name: 'FormRender',
  components: { ...FieldComponents },
  props: {
    formList: { type: Array, default: () => [] },
    formProps: { type: Object, default: () => {} },
    // render 渲染，setting 设置，drag 拖拽
    purpose: { type: String, default: 'render' }
  },
  setup (props, { emit }) {
    const formRef = ref()
    // 跳转状态只能走一次
    const jumpState: { [key: string]: boolean } = {}
    const {
      getDevice,
      getRenderFormData,
      getRelationData,
      getWidgetList
    } = useEditorHelpers()

    watch(getRenderFormData.value, (formData) => {
      dealRelation()
    })

    const dealRelation = () => {
      if (props.purpose === 'render') {
        getRelationData.value?.map((item: any) => {
          const valueData = getRenderFormData.value[item.key1]
          let ValuesHasValue = false
          // 多选值的处理
          if (Array.isArray(valueData)) {
            for (const v of valueData) {
              if (item.key3?.includes(v)) {
                ValuesHasValue = true
                break
              }
            }
          } else {
            // 单选值的处理
            ValuesHasValue = item.key3?.includes(valueData)
          }
          // 正向操作
          // 选中的条件 || 未选中的条件
          if (
            (item.key2 === '1' && ValuesHasValue) ||
            (item.key2 === '2' && !ValuesHasValue)
          ) {
            if (item.key4 === '1') {
              // 显示
              getWidgetList.value?.map((li: any) => {
                if (li.key === item.key5) li.hidden = false
                return li
              })
            } else if (item.key4 === '2') {
              // 跳转
              if (!jumpState[JSON.stringify(item)]) {
                formRef.value?.scrollToField(item.key5)
                jumpState[JSON.stringify(item)] = true
              }
            }
          } else {
            if (item.key4 === '1') {
              // 恢复隐藏
              getWidgetList.value?.map((li: any) => {
                if (li.key === item.key5) li.hidden = true
                return li
              })
            } else if (item.key4 === '2') {
              // 恢复跳转
              jumpState[JSON.stringify(item)] = false
            }
          }
          return item
        })
      }
    }

    const getWidgetName = (widget: any) => {
      return widget.tag + '-widget'
    }

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async (res: any) => {
          console.log('submitData', res, getRenderFormData.value)
          emit('submitData', getRenderFormData.value)
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.error(error)
        })
    }

    const resetFields = () => {
      return formRef.value?.resetFields()
    }

    const validate = () => {
      return formRef.value?.validate()
    }

    return {
      formRef,
      getDevice,
      getWidgetList,
      getWidgetName,
      onSubmit,
      resetFields,
      validate
    }
  }
})
</script>

<style lang="less" scoped>
.layout-h5 {
  margin: 20px auto;
  width: 420px;
  border-radius: 15px;
  box-shadow: 0 0 1px 10px #495060;
}
</style >
