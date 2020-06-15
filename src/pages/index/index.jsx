/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '心里测试'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goToQuestions = () => {
    Taro.navigateTo({
      url: '/pages/question/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <Image src='https://tva1.sinaimg.cn/large/007S8ZIlgy1gfnod6gxb2j316m0s4hdu.jpg' />
        <View className='app-container'> 
          <View className='app-container__name'>你的情商有多高？</View>
          <View className='app-container__count'> 252.万人在测</View>
          <View className='app-container__desc'>情商（Emotional Quotient）通常是指情绪商数，简称EQ，主要是指人在情绪、意志、耐受挫折等方面的品质，其包括导商（LQ）等。它是近年来心理学家们提出的与智商相对应的概念。从最简单的层次上下定义，提高情商的基础是培养自我意识，从而增强理解自己及表达自己的能力。总的来讲，人与人之间的情商并无明显的先天差别，更多与后天的培养息息相关。</View>
          <View className='app-container__test'>
            <Text className='app-container__test-btn' onClick={this.goToQuestions}>开始测试</Text>
          </View>
        </View>
        
      </View>
    )
  }
}
