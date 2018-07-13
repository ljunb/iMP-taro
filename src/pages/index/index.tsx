import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView, Image, CoverImage } from "@tarojs/components";
import "./index.scss";
import BgCoverIcon from "../../assets/bg_cover.png";

const SuggestionMap = {
  car_washing: '洗车',
  dressing: '穿衣',
  flu: '感冒',
  sport: '运动',
  travel: '出行',
  uv: '紫外线'
}

export default class Index extends Component {
  config = {
    navigationBarTitleText: "Taro天气"
  };

  state = {
    weather: null,
    windowHeight: 0
  };

  componentDidMount() {
    this.setupBaseLocationInfo();

    this.fetchWeatherData();
    const res = Taro.getSystemInfoSync();
    this.setState({ windowHeight: res.screenHeight });
    console.log(res);
  }

  setupBaseLocationInfo = async () => {
    try {
      const locationInfo = await Taro.getLocation();
      const options = {
        header: { "content-type": "application/json" },
        url: "https://apis.map.qq.com/ws/geocoder/v1/",
        data: {
          location: `${locationInfo.latitude},${locationInfo.longitude}`,
          key: "C5XBZ-QLEKW-QKMR7-OTJPD-OWBZT-ZQFD3",
          get_poi: 1
        }
      };
      const {
        statusCode,
        data: { result, message }
      } = await Taro.request(options);
      if (statusCode === 200) {
        console.log(result);
      } else {
        console.log(message);
      }
    } catch (e) {
      console.log(`获取位置出错：${e}`);
    }
  };

  fetchWeatherData = async () => {
    try {
      const options = {
        header: { "content-type": "application/json" },
        url: "http://tj.nineton.cn/Heart/index/all",
        data: {
          city: "CHGD000000",
          language: "zh-chs"
        }
      };
      const { data } = await Taro.request(options);
      if (data.status === "OK") {
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
    const cityName = (weather && weather.city_name) || "未定位";
    const temperature = (weather && weather.now.temperature) || 0;
    const temperatureText = (weather && weather.now.text) || "";
    const humidity = (weather && weather.now.humidity) || 0; // 空气湿度
    const windScale = (weather && weather.now.wind_scale) || 0; // 风力大小
    const o3Num = (weather && weather.now.air_quality.city.o3) || 0; // 臭氧指数
    const airQuality = (weather && weather.now.air_quality.city.quality) || ""; // 空气质量
    const suggestionObj = weather && weather.today.suggestion || []; // 生活指数
    const suggestions = [];
    for (const key in suggestionObj) {
      suggestions.push({ ...suggestionObj[key], type: key });
    }

    return (
      <View>
        <Image
          src={BgCoverIcon}
          style={`width:100%;height:${this.state.windowHeight - 64}px;`}
        />
        <View className="scroll-view">
          <ScrollView>
            <View className="header">
              <View className="city-wrp">
                <View className="city-add-btn" />
                <Text className="city-name">{cityName}</Text>
              </View>
              <View className="input-wrp">
                <View className="input-icon" />
                <Text className="input-text">
                  请输入城市名，快速查询天气信息
                </Text>
              </View>
              <View className="weather-wrp">
                <View className="weather-left">
                  <Text className="weather-text">{temperature}°</Text>
                  <View className="wind-wrp">
                    <Text className="wind-icon">湿度</Text>
                    <Text className="wind-text">{humidity}%</Text>
                    <Text className="wind-icon" style="margin-left:10px;">
                      风力
                    </Text>
                    <Text className="wind-text">{windScale}级</Text>
                  </View>
                  <View className="air-quality-wrp">
                    <View className="air-quality-icon" />
                    <Text className="air-quality-text">{`${o3Num}  ${airQuality}`}</Text>
                  </View>
                </View>
                <Text className="weather-now">{temperatureText}</Text>
              </View>
            </View>
            <View
              className="bottom-wrp"
              style={`margin-top:${this.state.windowHeight - 114}px;`}
            />
            <View className="life-suggestion">
              <Text className='suggest-text'>生活指数</Text>
              <View className='suggest-wrap'>
                {suggestions.map((item, key) => {
                  return (
                    <View key={`Suggesstion_${key}`} className='suggest-item'>
                      <View className='suggest-icon'/>
                      <Text className='suggest-brief'>{item.brief}</Text>
                      <Text className='suggest-type'>{SuggestionMap[item.type]}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
