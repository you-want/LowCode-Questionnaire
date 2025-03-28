<template>
  <div class="question">
    <template v-if="!limit">
      <!-- 搜索表单 -->
      <SearchForm @getQuestionList="getQuestionList" />
      <!-- 表格数据 -->
      <SearchTable
        :table-data="dataSource"
        :pagination="pagination"
        :loading="loading"
        @createQuestionTemplatePOST="createQuestionTemplatePOST"
        @commonClick="commonClick"
        @handleTableChange="handleTableChange"
      />
    </template>
    <a-alert
      v-else
      message="无权限"
      description="对不起！您暂无权限。如需要申请权限，请联系 Rain9..."
      type="info"
      show-icon
    />
    <!-- 新建问卷弹框 -->
    <a-modal
      v-model:visible="visibleCreate"
      title="新建问卷"
      @ok="handleOk"
    >
      <a-form :model="formState">
        <a-form-item
          label="问卷名称"
          required
          placeholder="请输入"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 预览弹框 -->
    <PreviewModal ref="previewModalRef" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  UnwrapRef,
  computed
} from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import SearchForm from '@/components/searchForm/index'
import SearchTable from '@/components/searchTable/index.vue'
import PreviewModal from '@/views/form-editor/components/preview-modal.vue'
import {
  questionList,
  questionTemplatePOST,
  questionCopy,
  questionTemplate,
  questionPublish,
  questionPublishPATCH,
  questionDownload
} from '@/api/editor'
import { getUser, isLimitUser } from '@/utils/auth'
import {
  TableState,
  TableStateFilters
} from 'ant-design-vue/es/table/interface'
import { usePagination } from 'vue-request'
import monmentTz from 'moment-timezone'

interface FormState {
  name: string;
}

type Pagination = TableState['pagination'];

export default defineComponent({
  components: { SearchForm, SearchTable, PreviewModal },
  setup () {
    const visibleCreate = ref<boolean>(false)
    const formState: UnwrapRef<FormState> = reactive({
      name: ''
    })
    const router = useRouter()

    const previewModalRef = ref()

    const page = ref<number>(1)

    const limit = ref(isLimitUser())

    onMounted(() => {
    })

    const dealTime = (time: string) => {
      if (location.origin === 'https://cloud.tal.com') {
        const zone = monmentTz(new Date(time)).tz('Asia/Shanghai')
        return zone.format('YYYY-MM-DD HH:mm:ss')
      } else {
        const jsonDate = new Date(time).toJSON()
        return new Date(Number(new Date(jsonDate)) + 0 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      }
    }
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize
    } = usePagination(questionList, {
      manual: isLimitUser(), // 权限
      defaultParams: [
        {
          page: 1,
          page_size: 10,
          created_time_sort: 'DESC'
        }
      ],
      formatResult: (res) => {
        res.list?.map((item: any) => {
          item.createdTime = dealTime(item.created_time)
          item.updatedTime = dealTime(item.updated_time)
          return item
        })
        return res || { list: [], total: 0 }
      },
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'page_size',
        totalKey: 'dataSource.total'
      }
    })

    const pagination = computed(() => ({
      total: dataSource.value?.total || 0,
      current: current.value,
      pageSize: pageSize.value
    }))

    const handleTableChange = (
      pag: Pagination,
      filters: TableStateFilters,
      sorter: any
    ) => {
      let createdTimeSort
      let updatedTimeSort
      if (sorter.field === 'created_time') {
        updatedTimeSort = undefined
        createdTimeSort = sorter.order === 'descend' ? 'DESC' : 'ASC'
      }
      if (sorter.field === 'updated_time') {
        createdTimeSort = undefined
        updatedTimeSort = sorter.order === 'descend' ? 'DESC' : 'ASC'
      }
      page.value = pag?.current || 1
      getQuestionList({
        page: pag?.current,
        page_size: pag!.pageSize!,
        created_time_sort: createdTimeSort,
        updated_time_sort: updatedTimeSort
      })
    }

    // 问卷列表
    const getQuestionList = (query: any) => {
      const data = {
        page: query.page || page.value,
        page_size: query.page_size || 10,
        creator: query.creator,
        name: query.name,
        status: query.status,
        question_id: query.questionId,
        created_time_sort: query.created_time_sort,
        updated_time_sort: query.updated_time_sort
      }
      run(data)
    }

    const createQuestionTemplatePOST = () => {
      visibleCreate.value = true
    }
    // 创建问卷
    const handleOk = async () => {
      if (!formState.name) return
      try {
        const data = {
          creator: getUser()?.username,
          name: formState.name
        }
        await questionTemplatePOST(data)
        message.success('创建成功！')
        visibleCreate.value = false
        getQuestionList({})
      } catch (e) {
        console.error(e)
      }
    }
    // 复制
    const copyClick = async (id: string) => {
      try {
        const data = {
          question_id: id
        }
        await questionCopy(data)
        message.success('复制成功！')
        getQuestionList({})
      } catch (e) {
        console.error(e)
      }
    }
    // 删除
    const deleteClick = async (id: string) => {
      try {
        const data = {
          question_id: id
        }
        await questionTemplate(data)
        message.success('删除成功！')
        getQuestionList({})
      } catch (e) {
        console.error(e)
      }
    }
    // 发布
    const publishClick = async (id: string) => {
      try {
        const data = {
          question_id: id
        }
        await questionPublish(data)
        message.success('发布成功！')
        getQuestionList({})
      } catch (e) {
        console.error(e)
      }
    }
    // 结束
    const endClick = async (id: string) => {
      try {
        const data = {
          question_id: id
        }
        await questionPublishPATCH(data)
        message.success('结束成功！')
        getQuestionList({})
      } catch (e) {
        console.error(e)
      }
    }
    // 数据分析
    const analysisClick = async (id: string) => {
      const routeUrl = router.resolve({
        path: '/analysis',
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    }
    // 预览
    const previewClick = async (id: string) => {
      previewModalRef.value.setVisiblePreview(id)
    }
    // 数据下载
    const downloadClick = async (id: string) => {
      try {
        const data = {
          question_id: id
        }
        await questionDownload(data)
      } catch (e) {
        console.error(e)
      }
    }
    // 编辑
    const editClick = async (id: string) => {
      const routeUrl = router.resolve({
        path: '/editor',
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    }
    // 复制链接
    const copyUrlClick = async (id: string) => {
      const routeUrl = `qn?id=${id}`
      const clipBoardContent = `${location.href}${routeUrl}`
      const oInput = document.createElement('input')
      oInput.value = clipBoardContent
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      oInput.style.display = 'none'
      document.body.removeChild(oInput)
      message.success('复制成功！')
    }
    // 复制链接
    const lookClick = async (id: string) => {
      const routeUrl = router.resolve({
        path: '/qn',
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    }
    const commonClick = (id: string, flag: string) => {
      const objClick: { [key: string]: any } = {
        copyClick: copyClick,
        deleteClick: deleteClick,
        publishClick: publishClick,
        endClick: endClick,
        analysisClick: analysisClick,
        downloadClick: downloadClick,
        editClick: editClick,
        previewClick: previewClick,
        copyUrlClick: copyUrlClick,
        lookClick: lookClick
      }
      objClick[flag](id)
    }

    return {
      previewModalRef,
      visibleCreate,
      formState,
      pagination,
      loading,
      dataSource,
      getQuestionList,
      createQuestionTemplatePOST,
      handleOk,
      commonClick,
      handleTableChange,
      limit
    }
  }
})
</script>

<style lang="less" scoped>
.question {
  padding: 16px;
  height: 100%;
  overflow: scroll;
}
</style>
