<template>
  <div class="OptionsSetting">
    <a-divider>选项设置</a-divider>
    <!-- 多选 -->
    <a-checkbox-group
      v-if="currentTag==='checkbox'"
      v-model:value="valueCheck"
    >
      <a-checkbox
        v-for="(item, index) in options"
        :key="item.value + index"
        v-model:value="item.value"
        class="checkbox-item"
      >
        <a-space>
          <a-input
            v-model:value="item.value"
            placeholder="value"
          />
          <a-input
            v-model:value="item.label"
            placeholder="label"
          />
          <MinusCircleOutlined @click="deleteClick(index)" />
        </a-space>
      </a-checkbox>
    </a-checkbox-group>
    <!-- 单选 -->
    <a-radio-group
      v-else
      v-model:value="value"
    >
      <a-radio
        v-for="(item, index) in options"
        :key="item.value + index"
        :style="radioStyle"
        v-model:value="item.value"
        class="radio-item"
      >
        <a-space>
          <a-input
            v-model:value="item.value"
            placeholder="value"
            allow-clear
          />
          <a-input
            v-model:value="item.label"
            placeholder="label"
            allow-clear
          />
          <MinusCircleOutlined @click="deleteClick(index)" />
        </a-space>
      </a-radio>
    </a-radio-group>
  </div>
  <a-button
    type="link"
    @click="createOption"
  >
    增加选项
  </a-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { useEditorHelpers } from '@/store/helpers/editorhelpers'
import _ from 'lodash'

export default defineComponent({
  components: { MinusCircleOutlined },
  props: {
    currentTag: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const value = ref('')
    const valueCheck = ref([])
    const radioStyle = reactive({
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    })
    const initOptions = [
      { value: '1', label: 'label1' },
      { value: '2', label: 'label2' },
      { value: '3', label: 'label3' }
    ]
    const options = ref(_.cloneDeep(initOptions))
    const { getSelectedWidget, setSelectedWidget } = useEditorHelpers()
    watch(getSelectedWidget, (SelectedWidget, prevSelectedWidget) => {
      // 修改选择组件重新初始化
      if (SelectedWidget.key !== prevSelectedWidget.key) {
        options.value = SelectedWidget.nodeProps?.options || initOptions
      }
    })
    watch([value, options.value, valueCheck], ([value, options, valueCheck]) => {
      setSelectedWidget({
        options,
        value: props.currentTag === 'checkbox' ? valueCheck : value
      })
    })
    onMounted(() => {
      // 第一次初始化
      options.value = getSelectedWidget.value?.nodeProps?.options || initOptions
    })
    const deleteClick = (index: number) => {
      options.value.splice(index, 1)
    }
    const createOption = () => {
      const option = {
        value: `${options.value.length + 1}`,
        label: `label${options.value.length + 1}`
      }
      options.value.push(option)
    }
    return {
      value,
      valueCheck,
      radioStyle,
      options,
      deleteClick,
      createOption
    }
  }
})
</script>

<style lang="less" scoped>
.OptionsSetting {
  padding-right: 8px;
  .radio-item {
    margin-bottom: 8px;
  }
  .checkbox-item{
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    margin-left: 8px;
  }
}
</style>
