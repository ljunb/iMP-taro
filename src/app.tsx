import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index';

import './app.scss'

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/mine/mine'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0068C4',
      navigationBarTitleText: 'Taro',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: '#626567',
      selectedColor: '#2A8CE5',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
        },
        {
          pagePath: 'pages/index/index',
          text: '首页',
        },
        {
          pagePath: 'pages/mine/mine',
          text: '我的',
        }
      ]
    }
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
