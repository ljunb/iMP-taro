import Taro, { Component } from '@tarojs/taro';
import { View, Text } from "@tarojs/components";
import IButton from '../../components/IButton';

export default class Mine extends Component {
  handlePress = (title) => {
    console.log(title);
  }

  render() {
    return (
      <View>
        <Text>Mine</Text>
        <IButton title="测试" onPress={this.handlePress}/>
      </View>
    )
  }
}