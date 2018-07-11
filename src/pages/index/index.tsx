import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import "./index.scss";

interface Person {
  name: string,
  time: string
}

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  state = {
    count: 0
  };
  options = [
    { name: "测试" },
    { name: "开发" },
    { name: "产品" },
    { name: "运营" }
  ];
  people: Person[] = [
    { name: "小明1", time: "2018/07/11 22:11" },
    { name: "小明2", time: "2018/07/11 22:12" },
    { name: "小明3", time: "2018/07/11 22:13" },
    { name: "小明4", time: "2018/07/11 22:14" },
    { name: "小明5", time: "2018/07/11 22:15" },
    { name: "小明6", time: "2018/07/11 22:16" }
  ];

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <ScrollView className="index">
        <View className="banner" />
        <View className="options">
          <View className="item">
            <Text>测试</Text>
            <View className="img" />
          </View>
          <View className="item">
            <Text>测试</Text>
            <View className="img" />
          </View>
          <View className="item">
            <Text>测试1</Text>
            <View className="img" />
          </View>
          <View className="item">
            <Text>测试</Text>
            <View className="img" />
          </View>
        </View>
        {this.people.map((item: Person, key: number) => {
          return (
            <View className="row" key={`Row_${key}`}>
              <View className="avatar" />
              <View className="name-wrapper">
                <Text className="name">{item.name}</Text>
                <Text className="time">{item.time}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
