<template>
  <t-table
    :columns="columns"
    :actions="actions"
    :querys="querys"
    :fetch-handler="getData"
    :data-source="dataSource"
    row-key="login"
    @edit="onEdit"
  />
</template>
<script lang="ts" setup>
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import TTable from '@/components/table/Table.vue'
import { CloudFilled, DeleteFilled, EditFilled } from '@ant-design/icons-vue'
import { ITableAction, ITableQuerys } from '@/components/table/types'
import { getUsers, IGithubUsers } from '@/api'
import { ref } from '@vue/reactivity'

const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'login',
    slots: {
      customRender: 'login'
    }
  }
]

function onEdit (data: any) {
}
const actions:ITableAction[] = [
  { title: '编辑', event: 'edit', icon: EditFilled },
  { title: '删除', event: onEdit, icon: DeleteFilled },
  { title: '发布', event: onEdit, icon: CloudFilled }
]
const querys: ITableQuerys[] = [
  {
    type: 'input',
    name: 'id',
    label: 'ID',
    placeholder: '请输入'
  },
  {
    type: 'radio',
    name: 'sex',
    label: '性别',
    value: 1,
    rules: { required: true, message: '请选择' },
    options: [
      { key: 1, label: '男' },
      { key: 2, label: '女' }
    ]
  },
  {
    type: 'select',
    name: 'role',
    label: '角色',
    rules: { required: true, message: '请选择' },
    placeholder: '请选择角色',
    options: [
      { key: '1', label: '管理员' },
      { key: '2', label: '普通用户' }
    ]
  },
  {
    type: 'dateRange',
    name: 'date',
    label: '日期',
    rules: { required: true, message: '请选择' }
  },
  {
    type: 'inputSearch',
    name: 'search',
    label: '关键词',
    rules: { required: true, message: '请输入' },
    placeholder: '输入关键词搜索'
  }
]

const dataSource = ref<IGithubUsers[]>([])
const getData = async (params: Record<string, any>) => {
  const data = await getUsers(params)
  dataSource.value = data
}
</script>
<style lang="less">
</style>
