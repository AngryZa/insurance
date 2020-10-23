import React from 'react';
import Computed from '../asset/js/computed';
import store from '../store/createStore';

import Header from '../components/Header';
import Notice from '../components/Notice';

var topScroll;
var bottomScroll;
class Plan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "***",
                sex: "***",
                age: "***",
                date: "***",
                money: "***",
                minus: []
            },
            informations: [],
            yearMoney: 0,
            topBoom: false
        }
        this.listenerWinFunc  = this.listenerWinFunc.bind(this);
    }

    componentDidMount() {

        window.scrollTo(0,0);
        const params = new URLSearchParams(this.props.location.search);
        const data  = {
            name: params.get("name"),
            sex: params.get("sex"),
            age: params.get("age"),
            date: params.get("date"),
            money: params.get("money"),
            minus: params.get("minus")
        }
        
        if(data.sex!=null && data.age!=null && data.date!=null && data.money!=null) {
            var minusArr = JSON.parse(data.minus);
            console.log(minusArr)
            console.log(data,'paln')
            // 又计算了一次有没有，所以前面的页面错误不后影响这个页面的渲染和数据，主要传输的参数是对的就行了
            var informations = Computed(data,minusArr);
            // console.log(informations,'informations')
            this.setState({
                data: {...data,minus: JSON.parse(data.minus)},
                informations,
                yearMoney: Number(data.date) !== 1000 ? informations[informations.length - 1].finishAllMoney : informations[0].finishAllMoney,
                allMinusMoney: informations[informations.length-1].allMinusMoney,
                minusAllMoney: informations[informations.length-1].minusAllMoney
            },()=>{
                console.log(this.state.data)
                // this.setState是异步的
            })
            

        } else {
            this.props.history.replace("/");
        }
        window.addEventListener("scroll",this.listenerWinFunc,false);
        topScroll = document.getElementById("topBoomTop");
        bottomScroll = document.getElementById("topBoomBoom");
        topScroll.addEventListener("scroll",this.listenerTopFunc,false);
        bottomScroll.addEventListener("scroll",this.listenerBottomFunc,false);
        // console.log(informations,'ininin')
    }

    componentWillUnmount() {
        window.removeEventListener("scroll",this.listenerWinFunc);
        topScroll.removeEventListener("scroll",this.listenerTopFunc);
        bottomScroll.removeEventListener("scroll",this.listenerBottomFunc);

        /* store.dispatch({type: "CHANGEDURING",value: [{
            age_start: "",
            age_end: "",
            diminish: "",
            cash: "",
            finish: ""
        }]}); */

    }

    listenerWinFunc() {
        let t = document.getElementById("topBoom").getBoundingClientRect().top;
        var is = false;
        if(t<0) {
            is = true;
        } else {
            is = false;
        }
        this.setState({
            topBoom: is
        })
    }

    listenerTopFunc() {
        let t= topScroll.scrollLeft;
        bottomScroll.scrollLeft =  t;
    }

    listenerBottomFunc() {
        let t= bottomScroll.scrollLeft;
        topScroll.scrollLeft = t;
    }

    render() {
        return (
            <div>
                <Notice top={5}></Notice>
                <Header title="逐年数据" goHome={
                    (e)=>{
                        this.props.history.replace("/")
                    }
                }></Header>
                <div className="result_header">
                    <div className="result_header_title">《幸福财富尊享终身寿险详情》</div>
                    <div className="result_header_cont">被保险人<span className="span">{this.state.data.name}</span>，<span className="span">{this.state.data.age}</span>周岁，<span className="span">{Number(this.state.data.sex)===0?"男":"女"}</span>性，<br/>投保《幸福财富尊享终身寿险》， 基本保险金额<span className="span">{this.state.data.money}</span>元，选择<span className="span">{Number(this.state.data.date) === 1000?"一次性":this.state.data.date+"年"}</span>交费，实际共缴纳保费<span className="span">{this.state.yearMoney}</span>元。共减保<span className="span">{this.state.minusAllMoney}</span>元基本保险金额，累计对应现金价值<span className="span">{this.state.allMinusMoney}</span>元。</div>
                </div>
                {this.state.data.minus.length>0?<div className="result_header">
                    <div className="plan_title">减保数据</div>
                    <div className="minus_frame">
                        <div className="minus_top_frame">
                            <div className="plan_scroll_header_title">年度末到达年龄</div>
                            <div className="plan_scroll_header_title">减保基本保险金额</div>
                            <div className="plan_scroll_header_title">减保部分对应的现金价值</div>
                            <div className="plan_scroll_header_title">年度末现金价值（减保后）</div>
                        </div>
                        {this.state.data.minus.map((item,index)=>(
                            <div className="minus_top_frame" key={index}>
                                <div className="plan_scroll_content_title">{item.year}</div>
                                <div className="plan_scroll_content_title">{item.value}</div>
                                <div className="plan_scroll_content_title">{item.result}</div>
                                <div className="plan_scroll_content_title">{item.finish}</div>
                            </div>
                        ))}
                        <div className="minus_top_frame">
                            <div className="plan_scroll_content_title">合计</div>
                            <div className="plan_scroll_content_title">{this.state.data.minus.map((item)=>{
                                return Number(item.value);
                            }).reduce((a,b)=>{
                                return a + b;
                            })}</div>
                            <div className="plan_scroll_content_title">{this.state.data.minus.map((item)=>{
                                return Number(item.result);
                            }).reduce((a,b)=>{
                                return a + b;
                            }).toFixed(2)}</div>
                            <div className="plan_scroll_content_title">-</div>
                        </div>
                    </div>
                </div>:<div></div>}
                <div style={{backgroundColor: "#fff",padding: "3rem 2rem",marginBottom: "2rem"}}>
                    <div className="plan_title">逐年数据查询</div>
                    <div className="top_boom">
                        <div className={this.state.topBoom?"plan_scroll_header_title_top":"plan_scroll_header_title"}>保单年度</div>
                        <div id="topBoom"></div>
                        <div className={this.state.topBoom?"plan_scroll_header_top":"plan_scroll_header"} id="topBoomTop">
                            {/* <div className="plan_scroll_header_title">保单年度</div> */}
                            <div className="plan_scroll_header_title">年度末到达年龄</div>
                            <div className="plan_scroll_header_title">当年度保险费</div>
                            {/* <div className="plan_scroll_header_title">累计实际交纳保费</div> */}
                            <div className="plan_scroll_header_title plan_scroll_header_title_right">
                                <div>
                                    <span>年度末已交保险费</span><span className="span">*</span>
                                </div>
                            </div>
                            <div className="plan_scroll_header_title">年度末保险金额</div>
                            <div className="plan_scroll_header_title">减保前基本保险金额</div>
                            <div className="plan_scroll_header_title">年末减保的基本保险金额</div>
                            <div className="plan_scroll_header_title">减保后基本保险金额</div>
                            <div className="plan_scroll_header_title">减保部分对应的现金价值</div>
                            <div className="plan_scroll_header_title">累计减保部分对应的现金价值</div>
                            <div className="plan_scroll_header_title">年度末身故/全残保险金</div>
                            <div className="plan_scroll_header_title">年度末现金价值</div>
                        </div>
                    </div>
                    <div className="plan_scroll_frame">
                        <div className="plan_scroll_left">
                            {this.state.informations.map((item,index)=>
                                <div className="plan_scroll_content" key={index}>
                                    <div className="plan_scroll_content_title">{item.index}</div>
                                </div>    
                            )}
                        </div>
                        <div className="plan_scroll_box" id="topBoomBoom">
                            {this.state.informations.map((item,index)=>
                                <div className="plan_scroll_content" key={index}>
                                    {/* <div className="plan_scroll_content_title">{item.index}</div> */}
                                    <div className="plan_scroll_content_title">{item.age}</div>
                                    {Number(this.state.data.date) === 1000?<div className="plan_scroll_content_title">{index===0?item.nowMoney:0}</div>:<div className="plan_scroll_content_title">{item.nowMoney}</div>}
                                    {/* <div className="plan_scroll_content_title">xxx</div> */}
                                    <div className="plan_scroll_content_title">{item.finishMoney}</div>
                                    <div className="plan_scroll_content_title">{item.overMoney}</div>
                                    <div className="plan_scroll_content_title">{item.initMoney}</div>
                                    <div className="plan_scroll_content_title">{item.minusMoney}</div>
                                    <div className="plan_scroll_content_title">{item.lastMoney}</div>
                                    <div className="plan_scroll_content_title">{item.minusLastMoney}</div>
                                    <div className="plan_scroll_content_title">{item.allMinusMoney}</div>
                                    <div className="plan_scroll_content_title">{item.lameMoney}</div>
                                    <div className="plan_scroll_content_title">{item.bottomMoney}</div>
                                </div>    
                            )}
                        </div>
                    </div>
                    <div className="last_notice">
                        <span className="span">*</span>已交保险费：指您依据本主险合同约定已经向我们交纳的保险费;如本主险合同发生过减保情形,则已交保险费为扣除每次减保所对应的保险费后的余额;如本主险合同发生过减额交清情形,则已交保险费为减额交清后基本保险金额所对应的保险费。
                    </div>
                </div>
                <div style={{backgroundColor: "#fff",padding: "3rem 4rem"}}>
                    <div className="plan_title">温馨提示</div>
                    <div style={{color: "#333",fontSize: "1.3rem",lineHeight: "2.35rem",marginTop: "2rem"}}>具体保险责任详见保险合同。我公司在保险合同约定情况下不承担保险责任,请关注保险条款中责任免除部分。自您收到保险单并书面签收次日起可享有10天的犹豫期,在犹豫期后退保会产生一定的费用损失。</div>
                </div>
                <div className={"benfit_bottom"}>保险公司不得违规销售非保险金融产品,请勿参加非法集资</div>
            </div>
        )
    }
}

export default Plan;