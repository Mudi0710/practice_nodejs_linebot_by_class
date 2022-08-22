export default {
  type: 'bubble',
  size: 'kilo',
  hero: {
    type: 'image',
    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
    size: 'full',
    aspectRatio: '1:1',
    aspectMode: 'cover'
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'HTML',
        weight: 'bold',
        size: 'lg',
        align: 'center',
        color: '#0000FF',
        margin: 'none'
      },
      {
        type: 'text',
        text: 'HTML 是基礎網頁技術，網頁瀏覽器可以讀取 HTML 檔案，成為視覺化網頁。',
        margin: 'md',
        wrap: true,
        maxLines: 5
      },
      {
        type: 'separator'
      },
      {
        type: 'button',
        action: {
          type: 'uri',
          label: '前往查看',
          uri: 'https://wdaweb.github.io/'
        }
      }
    ],
    backgroundColor: '#FFE4B5'
  }
}
