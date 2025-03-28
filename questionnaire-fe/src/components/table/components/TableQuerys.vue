<template>
  <a-form
    class="query-item-wrapper"
    :model="queryModel"
  >
    <template
      v-for="(query) in querys"
      :key="query.name"
    >
      <a-form-item
        :label="query.label"
        :name="query.name"
        :rules="query.rules"
        class="query-item"
      >
        <!-- input -->
        <a-input
          v-model:value="queryModel[query.name]"
          v-if="query.type === 'input'"
          :placeholder="query.placeholder"
        />
        <!-- radio -->
        <a-radio-group
          v-model:value="queryModel[query.name]"
          v-if="query.type === 'radio'"
        >
          <a-radio
            v-for="item in query.options"
            :key="item.key"
            :value="item.key"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
        <!-- select -->
        <a-select
          v-model:value="queryModel[query.name]"
          :placeholder="query.placeholder"
          :allow-clear="true"
          v-if="query.type === 'select'"
        >
          <a-select-option
            v-for="item in query.options"
            :key="item.key"
            :value="item.key"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
        <!-- date -->
        <a-date-picker
          v-model:value="queryModel[query.name]"
          v-if="query.type === 'date'"
        />
        <!-- dateRange -->
        <a-range-picker
          v-model:value="queryModel[query.name]"
          v-if="query.type === 'dateRange'"
        />
        <!-- inputSearch -->
        <a-input-search
          :placeholder="query.placeholder"
          v-model:value="queryModel[query.name]"
          v-if="query.type === 'inputSearch'"
        />
      </a-form-item>
    </template>
    <a-button
      type="primary"
      @click="onSearch"
    >
      查询
    </a-button>
    <a-button
      style="margin-left: 10px"
      @click="onReset"
    >
      重置
    </a-button>
    <a-button
      type="link"
      @click="onExpand"
      v-if="more.show"
    >
      {{ more.expanded ? '收起' : '展开' }}
      <template #icon>
        <DownOutlined v-if="!more.expanded" />
        <UpOutlined v-else />
      </template>
    </a-button>
  </a-form>
</template>
<script lang="ts" setup>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { computed, reactive } from '@vue/reactivity'
import { PropType } from '@vue/runtime-core'
import { useForm } from 'ant-design-vue/lib/form'
import { SUPORTED_FORM_TYPE } from '../constans'
import { ITableQuerys } from '../types'

const props = defineProps({
  querys: {
    type: Array as PropType<ITableQuerys[]>,
    default: () => []
  },
  defaultQuerysCount: {
    type: Number,
    default: 3
  }
})
const emit = defineEmits(['search', 'reset'])

const more = reactive({
  show: props.querys.length > props.defaultQuerysCount,
  expanded: false
})
const onExpand = () => {
  more.expanded = !more.expanded
}
const querys = computed(() => {
  return props.querys
    .filter(query => SUPORTED_FORM_TYPE.includes(query.type))
    .slice(0, more.expanded ? props.querys.length : props.defaultQuerysCount)
})
const queryModel = reactive<{[key: string]: any}>({})
const rules = reactive<{[key: string]: any}>({})
querys.value.forEach(item => {
  queryModel[item.name] = item.value
  rules[item.name] = Array.isArray(item.rules) ? item.rules : [item.rules || {}]
})
const formRef = useForm(queryModel, rules)

const onSearch = () => {
  const queryParams:{[key: string]: any} = {}
  for (const i in queryModel) {
    if (queryModel[i]) {
      queryParams[i] = queryModel[i]
    }
  }
  emit('search', queryParams)
}
const onReset = () => {
  formRef.resetFields()
  emit('reset')
}
</script>
<style>
.query-item-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.query-item {
  width: auto;
  margin-right: 40px;
}
</style>
