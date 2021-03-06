/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

const NEXT_TIMEOUT = 300
const ANSWER_LIST = [{ key: 'A', value: '没有或很少时间有' }, { key: 'B', value: '小部分时间有' }, { key: 'C', value: '较多时间有' }, { key: 'D', value: '绝大部分或全部时间有' }]
const SCORE_MAP = {
    'A': 2,
    'B': 3,
    'C': 4,
    'D': 5
}
const PEOPLE = '22.5万人在测'

export default class Index extends Component {

    config = {
        navigationBarTitleText: '开始测试'
    }
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            scores: 0,
            questionList: [{
                question: '我觉得平常容易紧张和着急',
                answer: ANSWER_LIST
            }, {
                question: '我无缘无故地感到害怕',
                answer: ANSWER_LIST
            }, {
                question: '我容易心里烦乱或觉得惊恐',
                answer: ANSWER_LIST
            }, {
                question: '觉得自己可能会发疯',
                answer: ANSWER_LIST
            }, {
                question: '我觉得一切都很好，也不会发生什么不幸',
                answer: ANSWER_LIST
            }, {
                question: '手脚发抖打颤',
                answer: ANSWER_LIST
            }, {
                question: '我会因为头疼、颈痛而烦恼',
                answer: ANSWER_LIST
            }, {
                question: '我感到容易衰弱和疲乏',
                answer: ANSWER_LIST
            }, {
                question: '我觉得心平气和，并且容易安静坐着',
                answer: ANSWER_LIST
            }, {
                question: '我觉得心跳得很快',
                answer: ANSWER_LIST
            }, {
                question: '我因为一阵阵头晕而苦恼',
                answer: ANSWER_LIST
            }, {
                question: '我会有晕倒或觉得要晕倒的情况',
                answer: ANSWER_LIST
            }, {
                question: '我呼气、吸气都感到很容易',
                answer: ANSWER_LIST
            }, {
                question: '手脚麻木刺痛',
                answer: ANSWER_LIST
            }, {
                question: '我因为胃痛和消化不良而苦恼',
                answer: ANSWER_LIST
            }, {
                question: '我常常要小便',
                answer: ANSWER_LIST
            }, {
                question: '我的手脚常常是干燥温暖的',
                answer: ANSWER_LIST
            }, {
                question: '我脸红发热',
                answer: ANSWER_LIST
            }, {
                question: '我容易入睡，并且一夜睡得很好',
                answer: ANSWER_LIST
            }, {
                question: '我做恶梦',
                answer: ANSWER_LIST
            }]
        }
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    calculateScore(key) {
        const { scores } = this.state;
        return scores + SCORE_MAP[key]

    }
    handleClick = (index, key) => () => {
        this.setState({
            hoverIndex: index,
            scores: this.calculateScore(key)
        })
        const { currentIndex, questionList } = this.state;
        setTimeout(() => {
            if (currentIndex < questionList.length - 1) {
                this.setState({
                    currentIndex: currentIndex + 1,
                    hoverIndex: null
                })
            } else {
                const { scores } = this.state
                Taro.navigateTo({ url: `/pages/result/index?scores=${scores}` })
            }
        }, NEXT_TIMEOUT)

    }
    render() {
        const { currentIndex, questionList, hoverIndex } = this.state;
        const { question, answer } = questionList[currentIndex]
        const totalQuestions = questionList.length;
        return (
            <View>
                <View className='index'>
                    <View className='info-bar'>
                        <View className='info-bar__index'>{currentIndex + 1}/{totalQuestions}</View>
                        <View className='info-bar__count'>{PEOPLE}</View>
                    </View>
                    <View>
                        <View className='question-desc'>
                            {question}
                        </View>
                        <View className='answer-options'>
                            {answer.map((item, index) => <View key={index} className={`answer-options-item ${index === hoverIndex ? 'active-bar' : ''}`} onClick={this.handleClick(index, item.key)}>{item.key}. {item.value}</View>)}
                        </View>
                    </View>
                </View>
                <View className='bottom-tips'>--仅供娱乐参考--</View>
            </View>
        )
    }
}
