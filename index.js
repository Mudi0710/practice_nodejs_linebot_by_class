import 'dotenv/config'
import linebot from 'linebot'
import schedule from 'node-schedule'
import data from './data.js'

data.fetchData()

schedule.scheduleJob('0 0 * * *', () => {
  data.fetchData()
})

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (event.message.type === 'text') {
    if (event.message.text === '共通課程') {
      data.replyCoursesOne(event)
    } else if (event.message.text === '前端課程') {
      data.replyCoursesTwo(event)
    } else if (event.message.text === '後端課程') {
      data.replyCoursesThree(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動123')
})
