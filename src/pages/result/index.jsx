/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '查看结果'
  }
  constructor (props) {
    super(props)
    this.state = {
      showResult: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  renderAds() {
      return (
        <View className='view-ads'>
            <View className='view-ads__btn' onClick={() => this.setState({ showResult: true })}>观看广告查看内容</View>
        </View>
      )
  }
  renderResults() {
      return (
        <View className='results'>
            <View className='result-score'>情商值：70分</View>
            <View className='result-content__head'>详细分析:</View>
            <View className='result-content__body'>相对来说你还算一个谨慎的人，指导什么话该说什么话不该说，懂得看人脸色把握分寸</View>
        </View>
      )
  }
  render () {
    return (
      <View className='index'>
          <View className='result-container'>
                <View className='title'>你的情商有多高？</View>
                <View className='count'>423.5万人在测</View>
                <View className='horizontal-line'></View>
                <View>
                    <View className='small-text'>测试结果：</View>
                    { this.state.showResult ? this.renderResults() : this.renderAds()}
                </View>
          </View>
        
      </View>
    )
  }
}
