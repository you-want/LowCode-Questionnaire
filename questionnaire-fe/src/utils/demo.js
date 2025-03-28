const moment = require('moment-timezone')

// 后端生成
function timestampUTC (date) {
  date = new Date(date)
  const timestamp = date.getTime() + new Date().getTimezoneOffset() * 60 * 1000
  date = new Date(timestamp)
  let dateStr = ''
  dateStr = `${date.getFullYear()}-${getNumTwoBit((date.getMonth() + 1))}-${getNumTwoBit(date.getDate())}T${getNumTwoBit(date.getHours())}:${getNumTwoBit(date.getMinutes())}:${getNumTwoBit(date.getSeconds())}Z`
  return dateStr
}
function getNumTwoBit (n) {
  n = Number(n)
  return (n > 9 ? '' : '0') + n
}

const date = new Date()
const dateStr = timestampUTC(moment(date).utc().format())
console.log(dateStr)

// 前端处理
const dealTime = (time) => {
  const zone = moment(new Date(time)).tz('Asia/Shanghai')
  return zone.format('YYYY-MM-DD HH:mm:ss')
  // const jsonDate = new Date(time).toJSON()
  // return new Date(Number(new Date(jsonDate)) + 0 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

const myTime = dealTime(dateStr)
console.log(myTime)
