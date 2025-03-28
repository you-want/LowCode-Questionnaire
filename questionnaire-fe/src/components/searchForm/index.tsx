import { defineComponent, reactive, UnwrapRef } from 'vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import Styles from './index.module.less'

interface FormState {
  questionId?: string;
  name?: string;
  creator?: string;
  status?: string;
}

export default defineComponent({
  emits: ['getQuestionList'],
  setup (props, { emit }) {
    const formState: UnwrapRef<FormState> = reactive({
      questionId: '',
      name: '',
      creator: '',
      status: ''
    })
    const handleFinish = (values: FormState) => {
      emit('getQuestionList', formState)
    }
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.error(errors)
    }

    return () => (
      <div class={Styles.searchForm}>
        <a-card bordered={false}>
          <a-form
            layout="inline"
            model={formState}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
          >
            <a-form-item label="问卷ID">
              <a-input
                value={formState.questionId}
                onUpdate:value={($event: any) => { formState.questionId = $event }}
                allowClear={true}
                placeholder="请填写问卷ID"
              ></a-input>
            </a-form-item>
            <a-form-item label="问卷名称">
              <a-input
                value={formState.name}
                onUpdate:value={($event: any) => { formState.name = $event }}
                allowClear={true}
                placeholder="请填写问卷名称"
              ></a-input>
            </a-form-item>
            {/* <a-form-item label="创建人">
              <a-input
                value={formState.creator}
                onUpdate:value={($event: any) => formState.creator = $event}
                allowClear={true}
                placeholder="请填写创建人"
              ></a-input>
            </a-form-item> */}
            <a-form-item label="状态">
              <a-select
                value={formState.status}
                onUpdate:value={($event: any) => { formState.status = $event }}
                placeholder="请选择状态">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="pre_publish">未发布</a-select-option>
                <a-select-option value="published">已发布</a-select-option>
                <a-select-option value="after_publish">已结束</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
              >
                查询
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    )
  }
})
