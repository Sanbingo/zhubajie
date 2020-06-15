/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

const NEXT_TIMEOUT = 500

export default class Index extends Component {

  config = {
    navigationBarTitleText: '开始测试'
  }
  constructor(props) {
      super(props);
      this.state = {
          currentIndex: 0,
          questionList: [{
              question: '遇到问题，你是否擅于换位思考？',
              answer: [{ key: 'A', value: '是的'}, { key: 'B', value: '不是'}, { key: 'C', value: '还好'}]
          }, {
              question: '碰到不清楚的问题，你是否会马上回答？',
              answer: [{ key: 'A', value: '是的'}, { key: 'B', value: '不是'}, { key: 'C', value: '还好'}]
          }, {
              question: '假如对方不想聊天了，你是否会主动结束对话？',
              answer: [{ key: 'A', value: '是的'}, { key: 'B', value: '不是'}, { key: 'C', value: '还好'}]
          }, {
              question: '如果对方有负面情绪，你是否会讲大道理？',
              answer: [{ key: 'A', value: '是的'}, { key: 'B', value: '不是'}, { key: 'C', value: '还好'}]
          }]
      }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick = index => () => {
      this.setState({
          hoverIndex: index
      })
      const { currentIndex, questionList } = this.state;
      setTimeout(() => {
        if (currentIndex < questionList.length-1) {
            this.setState({
                currentIndex: currentIndex +1,
                hoverIndex: null
            })
          } else {
            Taro.navigateTo({ url: '/pages/result/index'})
          }
      }, NEXT_TIMEOUT)
      
  }
  render () {
      const { currentIndex, questionList, hoverIndex } = this.state;
      const { question, answer } = questionList[currentIndex]
      const totalQuestions = questionList.length;
    return (
      <View className='index'>
        <View className='info-bar'>
            <View className='info-bar__index'>{currentIndex+1}/{totalQuestions}</View>
            <View className='info-bar__count'>234.3万人在测</View>
        </View>
        <View>
            <View className='question-desc'>
                {question}
            </View>
            <View className='answer-options'>
                {answer.map((item, index) => <View key={index} className={`answer-options-item ${index === hoverIndex ? 'active-bar' : ''}`} onClick={this.handleClick(index)}>{item.key}. {item.value}</View> )}
            </View>
        </View>
      </View>
    )
  }
}
