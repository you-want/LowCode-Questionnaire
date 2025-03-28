<template>
  <div class="searchtable">
    <a-card :bordered="false">
      <template #extra>
        <a-button
          type="primary"
          @click="createClick"
        >
          新建问卷
        </a-button>
      </template>
      <a-table
        :columns="columns"
        :row-key="'question_id'"
        :data-source="tableData.list || []"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #created_time="{ record }">
          <span>{{ record.createdTime }}</span>
        </template>
        <template #updated_time="{ record }">
          <span>{{ record.updatedTime }}</span>
        </template>
        <template #status="{ text: tag }">
          <span>
            <a-tag
              :color="
                tag === 'after_publish'
                  ? 'volcano'
                  : tag === 'pre_publish'
                    ? 'geekblue'
                    : 'green'
              "
            >
              {{ stateText(tag) }}
            </a-tag>
          </span>
        </template>
        <template #action="{ record }">
          <a-space>
            <a
              v-if="record.status === 'pre_publish'"
              @click="commonClick(record, 'editClick')"
            >编辑</a>
            <a @click="commonClick(record, 'copyClick')">复制</a>
            <!-- <a
              v-if="record.status!=='pre_publish'"
              @click="commonClick(record, 'previewClick')"
            >预览</a> -->
            <a-popconfirm
              title="您确定删除该问卷吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="commonClick(record, 'deleteClick')"
            >
              <a>删除</a>
            </a-popconfirm>
            <a-popconfirm
              v-if="record.status === 'pre_publish'"
              title="您确定发布该问卷吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="commonClick(record, 'publishClick')"
            >
              <a>发布</a>
            </a-popconfirm>
            <a
              v-if="record.status === 'published'"
              @click="commonClick(record, 'copyUrlClick')"
            >复制链接</a>
            <a
              v-if="record.status !== 'pre_publish'"
              @click="commonClick(record, 'lookClick')"
            >查看</a>
            <a-popconfirm
              v-if="record.status === 'published'"
              title="您确定结束该问卷吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="commonClick(record, 'endClick')"
            >
              <a>结束</a>
            </a-popconfirm>
            <a
              v-if="record.status !== 'pre_publish'"
              @click="commonClick(record, 'downloadClick')"
            >数据下载</a>
            <a
              v-if="record.status !== 'pre_publish'"
              @click="commonClick(record, 'analysisClick')"
            >数据分析</a>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import monmentTz from 'moment-timezone'
import {
  TableState,
  TableStateFilters
} from 'ant-design-vue/es/table/interface'

const columns = [
  {
    title: '问卷ID',
    dataIndex: 'question_id',
    key: 'question_id'
  },
  {
    title: '问卷名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator'
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    sorter: true,
    key: 'created_time',
    slots: { customRender: 'created_time' }
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time',
    sorter: true,
    key: 'updated_time',
    slots: { customRender: 'updated_time' }
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    slots: { customRender: 'status' }
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

type Pagination = TableState['pagination'];

export default defineComponent({
  components: {},
  props: {
    tableData: {
      type: Object,
      default: () => ({
        list: [],
        total: 0
      })
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['handleTableChange', 'createQuestionTemplatePOST', 'commonClick'],
  setup (props, { emit }) {
    const handleTableChange = (
      pag: Pagination,
      filters: TableStateFilters,
      sorter: any
    ) => {
      emit('handleTableChange', pag, filters, sorter)
    }

    const createClick = () => {
      emit('createQuestionTemplatePOST')
    }
    const commonClick = (record: any, flag: string) => {
      emit('commonClick', record.question_id, flag)
    }
    const stateText = (state: string) => {
      const stateMap: { [key: string]: string } = {
        pre_publish: '未发布',
        published: '已发布',
        after_publish: '已结束'
      }
      return stateMap[state]
    }
    const dealTime = (time: string) => {
      // const zone = monmentTz(new Date(time)).tz('Asia/Shanghai')
      // return zone.format('YYYY-MM-DD HH:mm:ss')
      const jsonDate = new Date(time).toJSON()
      return new Date(Number(new Date(jsonDate)) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
    }
    return {
      columns,
      createClick,
      stateText,
      dealTime,
      commonClick,
      handleTableChange
    }
  }
})
</script>

<style lang="less" scoped>
</style>
