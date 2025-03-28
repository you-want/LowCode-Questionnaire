<template>
  <div class="r-setting">
    <a-card
      v-for="(item, index) in relationData"
      :key="index"
      :title="`规则${index + 1}`"
      class="rule-card"
      size="small"
    >
      <template #extra>
        <a @click="deleteClick(index)">删除</a>
      </template>
      <a-form
        :model="item"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item
          label="如果"
          class="r-form-item"
        >
          <a-select
            v-model:value="item.key1"
            placeholder="请选择你的问题"
            :allow-clear="true"
          >
            <a-select-option
              v-for="(reItem, reIndex) in relationQuestion"
              :key="reItem.tag + reIndex"
              :value="reItem.key"
            >
              <a-tooltip>
                <template #title>
                  {{ reItem.formItemProps.label }}
                </template>
                {{ reItem.formItemProps.label }}
              </a-tooltip>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label=" "
          :colon="false"
          class="r-form-item"
        >
          <a-select
            v-model:value="item.key2"
            :allow-clear="true"
          >
            <a-select-option value="1">
              选中
            </a-select-option>
            <a-select-option value="2">
              未选中
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label=" "
          :colon="false"
          class="r-form-item"
        >
          <a-select
            v-model:value="item.key3"
            :allow-clear="true"
            :mode="'multiple'"
          >
            <a-select-option
              v-for="(opItem, opIndex) in getCurrentAnswer(item.key1)"
              :key="opItem.value + opIndex"
              :value="opItem.value"
            >
              {{ opItem.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="则"
          class="r-form-item"
        >
          <a-select
            v-model:value="item.key4"
            :allow-clear="true"
          >
            <a-select-option value="1">
              显示
            </a-select-option>
            <a-select-option value="2">
              跳转
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label=" "
          :colon="false"
          class="r-form-item"
        >
          <a-select
            v-model:value="item.key5"
            :allow-clear="true"
          >
            <a-select-option
              v-for="(wiItem, wiIndex) in getWidgetList"
              :key="wiItem.tag + wiIndex"
              :value="wiItem.key"
            >
              <a-tooltip>
                <template #title>
                  {{ wiItem.formItemProps.label }}
                </template>
                {{ wiItem.formItemProps.label }}
              </a-tooltip>
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-card>
    <a-button
      type="primary"
      class="createBtn"
      @click="createClick"
    >
      新增规则
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import _ from 'lodash'
import { QSettingFormFields, QSettingFormProps } from './formConfig'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'

export default defineComponent({
  components: {},
  setup () {
    const formList = ref(QSettingFormFields)
    const formProps = reactive(QSettingFormProps)
    const relationData = ref<any[]>([])
    const relationQuestion = ref<any[]>([])
    const {
      getQSettingFormData,
      setQSettingFormData,
      getWidgetList,
      getSelectedWidget,
      getRelationData,
      setRelationData
    } = useEditorHelpers()
    // 节流
    const _throttle = _.throttle(() => {
      setRelationData(relationData.value)
    }, 1000)
    watch([relationData.value], ([data], [prevData]) => {
      _throttle()
    })
    watch([getWidgetList.value, getSelectedWidget], ([list, select]) => {
      setRelationQuestion()
    })
    onMounted(() => {
      relationData.value = getRelationData.value
      //
      setRelationQuestion()
      //
      const model: { [key: string]: any } = {}
      formList.value?.map((item: any) => {
        model[item.key] =
          getQSettingFormData.value[item.key] ||
          item.nodeProps?.value ||
          undefined
        delete item.nodeProps?.value
        return item
      })
      formProps.model = model
      setQSettingFormData(model)
    })
    const setRelationQuestion = () => {
      const OptionalTags = ['radio', 'checkbox', 'select']
      relationQuestion.value = []
      getWidgetList.value?.map((item: any) => {
        if (OptionalTags.includes(item.tag)) {
          relationQuestion.value.push(item)
        }
        return item
      })
    }
    const createClick = () => {
      const obj = {
        key1: '',
        key2: '',
        key3: [],
        key4: '',
        key5: ''
      }
      relationData.value.push(obj)
    }
    const deleteClick = (index: number) => {
      relationData.value.splice(index, 1)
    }
    const getCurrentAnswer = (currentKey: string) => {
      let answer: any[] = []
      relationQuestion.value.map((item: any) => {
        if (item.key === currentKey) {
          answer = item.nodeProps?.options || []
        }
        return item
      })
      return answer
    }
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      relationData,
      createClick,
      deleteClick,
      relationQuestion,
      getWidgetList,
      getCurrentAnswer
    }
  }
})
</script>

<style lang="less" scoped>
.r-setting {
  padding: 0 16px 16px;
  .createBtn {
    width: 100%;
    margin-bottom: 10px;
  }
  .rule-card {
    margin-bottom: 16px;
    .r-form-item {
      margin-bottom: 8px;
    }
  }
}
</style>
