import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index';

import './app.scss'

class App extends Component {
  config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Taro',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    }
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
