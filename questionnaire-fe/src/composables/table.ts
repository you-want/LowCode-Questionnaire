import { PaginationProps } from 'ant-design-vue'
import { ColumnProps, TableStateFilters } from 'ant-design-vue/lib/table/interface'
import { reactive } from 'vue'

export function rowKey (key: string = 'id', record: any, index: number) {
  return record[key]
}
export function useTableCfg (columns: ColumnProps[]) {
  const config = reactive({
    columns,
    dataSource: [],
    loading: false,
    selection: {
      selectedRowKeys: [] as string [],
      selectedRows: [],
      onChange: function (selectedRowKeys: string[], selectedRows: any) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    },
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number, range: number[]) =>
            `当前${range[0]}-${range[1]}条，共${total}条`
    } as PaginationProps,
    filters: [],
    rowKey,
    onChange (pagination: PaginationProps, filters: TableStateFilters, handler: Function) {
      this.pagination = pagination
      handler()
    }
  })
  return config
}
