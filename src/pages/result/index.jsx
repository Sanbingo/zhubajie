/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

const TITLE = '焦虑自评量表'
const PEOPLE = '22.5万人在测'

let rewardedVideoAd = null
const AD_UNIT_ID = '20dj4bbf266a35g0ja'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '查看结果'
  }
  constructor(props) {
    super(props)
    this.state = {
      showResult: false
    }
  }
  // 初始化广告组件
  componentWillMount() {
    if (Taro.createRewardedVideoAd) {
      rewardedVideoAd = Taro.createRewardedVideoAd({ adUnitId: AD_UNIT_ID })
      rewardedVideoAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      rewardedVideoAd.onError((err) => {
        console.log('onError event emit', err)
      })
      rewardedVideoAd.onClose((res) => {
        console.log('onClose event emit', res)
        if (res.isEnded) {
          // 已观看完视频
          this.setState({
            showResult: true
          })
        }
      })
    }
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  analysisContext(scores) {
    const score = +scores
    if (score > 69) {
      return '重度焦虑，你的心理状态可能不太理想，建议寻求专业的医生进行心理疏导和理疗。'
    } else if (score > 59) {
      return '中度焦虑，多与人沟通，多对别人诉说，多参加一些户外体育活动，种种花，舒缓心情，进行简单心理辅导，放松心态，相信你会恢复到更好的心理健康状态。'
    } else if (score > 49) {
      return '轻度焦虑，正视它，而不要用自认为合理的其它理由来掩饰它的存在。树立起消除焦虑心理的信心，充分调动主观能动性，运用注意力转移的原理，及时将注意力转移到其它的事情上，以消除焦虑。'
    } else {
      return '心理状况正常，很棒！保持的很好，继续保持哦。'
    }
  }

  renderAds() {
    const canUseAwardAd = Taro.getStorageSync('canUseAwardAd')
    return (
      <View className='view-ads'>
        <View className='view-ads__btn' onClick={() => {
          if (rewardedVideoAd && canUseAwardAd) {
            rewardedVideoAd.show().then(() => {
              console.log("广告显示成功");
            }).catch(err => {
              console.log("广告组件出现问题", err);
              // 可以手动加载一次
              rewardedVideoAd.load().then(() => {
                console.log("手动加载成功");
                // 加载成功后需要再显示广告
                return rewardedVideoAd.show();
              });
            });
          }
        }}
        >观看广告查看内容</View>
      </View>
    )
  }
  renderResults() {
    const { params } = this.$router;
    const description = this.analysisContext(params.scores)
    return (
      <View className='results'>
        <View className='result-score'>你的得分：{params.scores}分</View>
        <View className='result-content__head'>详细分析:</View>
        <View className='result-content__body'>{description}</View>
      </View>
    )
  }
  render() {
    const canUseAwardAd = Taro.getStorageSync('canUseAwardAd')
    return (
      <View className='index'>
        <View className='result-container'>
          <View className='title'>{TITLE}</View>
          <View className='count'>{PEOPLE}</View>
          <View className='horizontal-line'></View>
          <View>
            <View className='small-text'>测试结果：</View>
            {this.state.showResult || !canUseAwardAd ? this.renderResults() : this.renderAds()}
          </View>
        </View>
        <View className='bottom-tips'>--仅供娱乐参考--</View>
      </View>
    )
  }
}
