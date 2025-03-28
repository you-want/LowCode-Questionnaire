<template>
  <div class="analysis">
    <a-card title="数据概况">
      <div class="data-box">
        <div class="data-item">
          <div class="label">
            今日新增数据
          </div>
          <div class="value">
            <CountTo
              :start-val="0"
              :end-val="analysisData.today"
            />
          </div>
        </div>
        <div class="data-item">
          <div class="label">
            总数据
          </div>
          <div class="value">
            <CountTo
              :start-val="0"
              :end-val="analysisData.all"
            />
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, unref } from 'vue'
import { useRouter } from 'vue-router'
import { questionData } from '@/api/editor'
import { CountTo } from '@/components/CountTo'

export default defineComponent({
  components: { CountTo },
  setup () {
    const analysisData = ref({
      today: 0,
      all: 0
    })
    const router = useRouter()
    const { currentRoute } = router
    const route = unref(currentRoute)
    const query = route.query
    onMounted(() => {
      getQuestionDat()
    })
    const getQuestionDat = async () => {
      if (!query.id) return
      try {
        const data = {
          question_id: query.id
        }
        const res = await questionData(data)
        analysisData.value = res
      } catch (e) {
        console.error(e)
      }
    }
    return {
      analysisData
    }
  }
})
</script>

<style lang="less" scoped>
.analysis{
  padding: 20px;
  .data-box{
    display: flex;
    justify-content: space-around;
    .data-item{
      text-align: center;
      .label{
        font-size: 30px;
        margin-bottom: 30px;
      }
      .value{
        font-size: 20px;
      }
    }
  }
}
</style>
