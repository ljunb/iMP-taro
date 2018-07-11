import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export interface IProps {
  title?: string,
  onPress?: (title?: string) => void,
}

export default class IButton extends Component<IProps> {
  static defaultProps = {
    title: '按钮'
  }

  handleClick = () => {
    const { title, onPress } = this.props;
    onPress && onPress(title);
  };

  render() {
    return (
      <View onClick={this.handleClick}>
        <Text>{this.props.title}</Text>
      </View>
    )
  }
}