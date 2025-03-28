<template>
  <a-card>
    <slot
      name="querys"
      v-if="slots.querys"
    />
    <TableQuerys
      v-if="querys"
      :querys="querys"
      @search="onSearch"
    />
    <a-table
      v-bind="$attrs"
      :loading="table.loading"
      :data-source="props.dataSource"
      :columns="columns"
      :pagination="table.pagination"
      :row-key="props.rowKey"
      @change="onTableChange"
      style="margin-top: 20px;"
    >
      <template
        v-for="slot in customRenderSlots"
        #[slot]="row"
      >
        <slot
          :name="slot"
          :row="row.record"
          :index="row.index"
          :vnode="row.column"
          v-if="slots[slot]"
        />
        <span
          v-else
          :key="slot"
        >{{ defaultSlotValue(row) }}</span>
      </template>
      <!-- 默认action || 传入的action -->
      <template
        v-if="props.actions && !slots.action"
        #action="row"
      >
        <template
          v-for="action in actions"
          :key="action.title"
        >
          <a-button
            v-if="!action.icon"
            type="link"
            @click="actionEvent(row, action.event)"
          >
            {{ action.title }}
          </a-button>
          <a-tooltip
            :title="action.title"
            v-if="action.icon"
          >
            <a-button
              ghost
              @click="actionEvent(row, action.event)"
              class="action-icon"
            >
              <template #icon>
                <component :is="action.icon" />
              </template>
            </a-button>
          </a-tooltip>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
<script lang="ts" setup>
import { computed, useSlots, onMounted, ref, toRaw } from 'vue'
import { useTableCfg } from '@/composables/table'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import TableQuerys from './components/TableQuerys.vue'
import { ITableAction, ITableQuerys } from './types'
import { PaginationProps } from 'ant-design-vue/lib/pagination'

interface ITableProps {
  columns: ColumnProps[];
  dataSource: Record<string, any>[];
  rowKey: string;
  actions?: ITableAction[] | boolean;
  querys?: ITableQuerys[] | boolean;
  fetchHandler?: (params?: any) => void;
}
const emit = defineEmits(['fetch'])
const slots = useSlots()
// 坑：这里的默认参数不能传独立变量
const props = withDefaults(defineProps<ITableProps>(), {
  columns: () => [],
  actions: () => [
    { title: '编辑', event: 'edit' },
    { title: '删除', event: 'delete' }
  ],
  rowKey: 'id',
  querys: () => false,
  dataSource: () => [],
  fetchHandler: () => {}
})
const table = useTableCfg(props.columns)

// 重新组织columns
const columns = computed(() => {
  const result = props.columns
  const hasActionColumn = props.columns.some(item => item.slots && item.slots.customRender === 'action')
  if (!hasActionColumn) {
    result.push({
      title: '操作',
      align: 'center',
      slots: {
        customRender: 'action'
      }
    })
  }
  return result
})
// 计算actions，解决volar报错问题
const actions = computed(() => props.actions as ITableAction[])
const querys = computed(() => props.querys as ITableQuerys[])
const actionEvent = (row: any, action?: Function | string) => {
  if (!action) return null
  else if (typeof action === 'function') return action(row)
  // @ts-ignore
  else return emit(action, row)
}

const customRenderSlots = computed<string[]>(() => {
  const customSlots: string[] = []
  props.columns.forEach(item => {
    if (item.slots && typeof item.slots === 'object') {
      for (const key in item.slots) {
        customSlots.push(item.slots[key]!)
      }
    }
  })
  return customSlots
})

// 插槽默认值
const defaultSlotValue = computed(() => (row: any) => typeof row.text === 'object' ? '' : row.text)

const params = ref<Record<string, any>>({})
querys.value.forEach(item => { params.value[item.name] = item.value })
const getData = async () => {
  params.value.page = table.pagination.current
  params.value.pageSize = table.pagination.pageSize
  if (props.fetchHandler && typeof props.fetchHandler === 'function') {
    table.loading = true
    try {
      await props.fetchHandler(toRaw(params.value))
      table.loading = false
    } catch (e) {
      console.error(e)
      table.loading = false
    }
  }
  emit('fetch', toRaw(params.value))
}
const onSearch = async (queryParams: Record<string, any>) => {
  params.value = queryParams
  getData()
}
const onTableChange = (pagination: PaginationProps) => {
  table.pagination = pagination
  getData()
}
onMounted(getData)
</script>
