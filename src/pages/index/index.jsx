/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.less'

const TITLE = '焦虑自评量表'
const PEOPLE = '22.5万人在测'
const DESCRIPTION = '没错，我们处于“全民焦虑”的年代。适度的焦虑会唤醒我们的神经，让我们保持生活的活力。但是焦虑过度则会影响我们的生活质量。想了解近一个星期你的焦虑水平如何吗？就让焦虑自评量表（SAS）告诉你吧！'

export default class Index extends Component {

  config = {
    navigationBarTitleText: ''
  }
  // 判断宿主环境，只有抖音APP才支持播放激励视频
  componentWillMount() {
    const res = Taro.getSystemInfoSync()
    const { platform, version, appName } = res || {};
    const MinAndroidVersion = 10.3
    const MinIosVersion = 10.7
    let canUseAwardAd = false
    if (appName && appName.toUpperCase() === 'DOUYIN') {
      if (platform.toUpperCase() === 'IOS' && parseFloat(version) > MinIosVersion) {
        canUseAwardAd = true
      } else if (platform.toUpperCase() === 'ANDROID' && parseFloat(version) > MinAndroidVersion) {
        canUseAwardAd = true
      } else {
        canUseAwardAd = false
      }
    }
    Taro.setStorageSync('canUseAwardAd', canUseAwardAd)

  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  goToQuestions = () => {
    Taro.navigateTo({
      url: '/pages/question/index'
    })
  }

  render() {
    return (
      <View className='index'>
        <Image src='https://tva1.sinaimg.cn/large/007S8ZIlgy1gg8icw24s9j30q00f01kx.jpg' />
        <View className='app-container'>
          <View className='app-container__name'>{TITLE}</View>
          <View className='app-container__count'>{PEOPLE}</View>
          <View className='app-container__desc'>{DESCRIPTION}</View>
          <View className='app-container__test'>
            <Text className='app-container__test-btn' onClick={this.goToQuestions}>开始测试</Text>
          </View>
        </View>
        <View className='bottom-tips'>--仅供娱乐参考--</View>
      </View>
    )
  }
}
