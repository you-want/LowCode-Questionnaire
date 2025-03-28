import { GET, POST, DELETE, PATCH } from '@/utils/axios'

// 问卷列表
export function questionList (params?: {}) {
  return GET({
    url: '/question/api/question/list',
    params
  })
}

// 复制问卷
export function questionCopy (data?: {}) {
  return POST({
    url: '/question/api/question/copy',
    data
  })
}

// 删除问卷
export function questionTemplate (data?: {}) {
  return DELETE({
    url: '/question/api/question/template',
    data
  })
}

// 发布问卷
export function questionPublish (data?: {}) {
  return POST({
    url: '/question/api/question/publish',
    data
  })
}

// 结束问卷
export function questionPublishPATCH (data?: {}) {
  return PATCH({
    url: '/question/api/question/publish',
    data
  })
}

// 问卷分析
export function questionData (params?: {}) {
  return GET({
    url: '/question/api/question/data',
    params
  })
}

// 数据下载
export function questionDownload (params?: any) {
  // return GET({
  //   url: '/question/api/question/download',
  //   params,
  //   responseType: 'blob'
  // })
  window.open(location.origin + '/question/api/question/download?question_id=' + params.question_id)
}

// 创建问卷
export function questionTemplatePOST (data?: {}) {
  return POST({
    url: '/question/api/question/template',
    data
  })
}

// 编辑问卷
export function questionTemplatePATCH (data?: {}) {
  return PATCH({
    url: '/question/api/question/template',
    data
  })
}

// 获取问卷模版信息
export function questionTemplateGET (params?: {}) {
  return GET({
    url: '/question/api/question/template',
    params
  })
}

// 提交问卷
export function questionSubmit (data?: {}) {
  return POST({
    url: '/question/api/question/submit',
    data
  })
}
