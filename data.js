import axios from 'axios'
import cheerio from 'cheerio'
import template from './template.js'
import fs from 'fs'

const generalCourses = []
const frontCourses = []
const backCourses = []

const fetchData = async () => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    $('#general .col-md-3').each(function () {
      generalCourses.push(
        [
          'https://wdaweb.github.io/' + $(this).find('img').attr('src').slice(2),
          ...$(this).text().replace(/\t/g, '').split('\n').filter(text => text.length > 0)
        ]
      )
    })
    $('#fe .col-md-3').each(function () {
      frontCourses.push(
        [
          'https://wdaweb.github.io/' + $(this).find('img').attr('src').slice(2),
          ...$(this).text().replace(/\t/g, '').split('\n').filter(text => text.length > 0)
        ]
      )
    })
    $('#be .col-md-3').each(function () {
      backCourses.push(
        [
          'https://wdaweb.github.io/' + $(this).find('img').attr('src').slice(2),
          ...$(this).text().replace(/\t/g, '').split('\n').filter(text => text.length > 0)
        ]
      )
    })
  } catch (error) {
    console.log(error)
  }
}

const replyCoursesOne = (event) => {
  const bubbles = generalCourses.map(course => {
    const bubble = JSON.parse(JSON.stringify(template))
    bubble.hero.url = course[0]
    bubble.body.contents[0].text = course[1]
    bubble.body.contents[1].text = course[2]
    return bubble
  })
  console.log(JSON.stringify(bubbles, null, 2))
  fs.writeFileSync('bubblesGeneral.json', JSON.stringify(bubbles, null, 2))
  event.reply([
    {
      type: 'flex',
      altText: '共通課程',
      contents: {
        type: 'carousel',
        contents: bubbles.slice(0, 6)
      }
    }
  ])
}

const replyCoursesTwo = (event) => {
  const bubbles = frontCourses.map(course => {
    const bubble = JSON.parse(JSON.stringify(template))
    bubble.hero.url = course[0]
    bubble.body.contents[0].text = course[1]
    bubble.body.contents[1].text = course[2]
    return bubble
  })
  console.log(JSON.stringify(bubbles, null, 2))
  fs.writeFileSync('bubblesFront.json', JSON.stringify(bubbles, null, 2))
  event.reply([
    {
      type: 'flex',
      altText: '前端課程',
      contents: {
        type: 'carousel',
        contents: bubbles
      }
    }
  ])
}

const replyCoursesThree = (event) => {
  const bubbles = backCourses.map(course => {
    const bubble = JSON.parse(JSON.stringify(template))
    bubble.hero.url = course[0]
    bubble.body.contents[0].text = course[1]
    bubble.body.contents[1].text = course[2]
    return bubble
  })
  console.log(JSON.stringify(bubbles, null, 2))
  fs.writeFileSync('bubblesBack.json', JSON.stringify(bubbles, null, 2))
  event.reply([
    {
      type: 'flex',
      altText: '後端課程',
      contents: {
        type: 'carousel',
        contents: bubbles
      }
    }
  ])
}

export default {
  fetchData,
  generalCourses,
  frontCourses,
  backCourses,
  replyCoursesOne,
  replyCoursesTwo,
  replyCoursesThree
}
