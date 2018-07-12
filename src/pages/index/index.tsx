import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "Taro天气"
  };

  state = {
    weather: null
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = async () => {
    try {
      const options = {
        header: { 'content-type': 'application/json' },
        url: 'http://tj.nineton.cn/Heart/index/all',
        data: {
          city: 'CHGD000000',
          language: 'zh-chs'
        }
      };
      const { data } = await Taro.request(options);
      if (data.status === 'OK') {
        this.setState({
          weather: data.weather[0]
        });
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { weather } = this.state;
    const cityName = weather && weather.city_name || '未定位';
    const temperature = weather && weather.now.temperature || 0;
    const temperatureText = weather && weather.now.text || '';
    const humidity = weather && weather.now.humidity || 0; // 空气湿度
    const windScale = weather && weather.now.wind_scale || 0; // 风力大小
    const o3Num = weather && weather.now.air_quality.city.o3 || 0; // 臭氧指数
    const airQuality = weather && weather.now.air_quality.city.quality || ''; // 空气质量
    
    return (
      <ScrollView className="index">
        <View className='header'>
          <View className='city-wrp'>
            <View className='city-add-btn'/>
            <Text className='city-name'>{cityName}</Text>
          </View>
          <View className='input-wrp'>
            <View className='input-icon'/>
            <Text className='input-text'>请输入城市名，快速查询天气信息</Text>
          </View>
          <View className='weather-wrp'>
            <View className='weather-left'>
              <Text className='weather-text'>{temperature}°</Text>
              <View className='wind-wrp'>
                <View className='wind-icon'/>
                <Text className='wind-text'>{humidity}%</Text>
                <View className='wind-icon' style='margin-left:10px;'/>
                <Text className='wind-text'>{windScale}级</Text>
              </View>
              <View className='air-quality-wrp'>
                <View className='air-quality-icon'/>
                <Text className='air-quality-text'>{`${o3Num} ${airQuality}`}</Text>
              </View>
            </View>
            <Text className='weather-now'>{temperatureText}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
