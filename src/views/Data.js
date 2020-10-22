import React from 'react';
import Computed from '../asset/js/computed';
import store from '../store/createStore';

import Header from '../components/Header';
import Button from '../components/Button';
import Title from '../components/Title';
import Input from '../components/Input';
import Notice from '../components/Notice';

import {Toast} from 'antd-mobile';

class Data extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: "",
            year: "",
            money: "",
            notice: "",
            data: {
                name: "",
                sex: "",
                age: "",
                date: "",
                money: ""
            },
            infomations: []
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        const params = new URLSearchParams(this.props.location.search);
        const data  = {
            name: params.get("name"),
            sex: params.get("sex"),
            age: params.get("age"),
            date: params.get("date"),
            money: params.get("money")
        }
        if(data.sex!=null && data.age!=null && data.date!=null && data.money!=null) {
            var infomations = Computed(data);
            console.log(data,infomations,'999')

            this.setState({
                data,
                infomations
            })
        } else {
            this.props.history.replace("/");
        }


        store.dispatch({type: "CHANGENAME",value: ""});
        store.dispatch({type: "CHANGESEX",value: [{
                title: "男",
                is: false
            },
            {
                title: "女",
                is: false
            }
        ]});
        store.dispatch({type: "CHANGEAGE",value: ""});
        store.dispatch({type: "CHANGETIME",value: [{
                title: "3年",
                cont: 3,
                is: false
            },
            {
                title: "5年",
                cont: 5,
                is: false
            },
            {
                title: "10年",
                cont: 10,
                is: false
            },
            {
                title: "15年",
                cont: 15,
                is: false
            },
            {
                title: "20年",
                cont: 20,
                is: false
            }
        ]});
        store.dispatch({type: "CHANGEINIT",value: ""});
    }

    //计算估算减保金额范围
    computed() {
        var self = this;
        var age = Number(this.state.age)-1;
        var index = age - Number(this.state.data.age);
        var value = this.state.money;
        console.log(age,index,value);
        if(index >= 0 && value !== "") {
            var infos = self.state.infomations[index];
            var single = (infos.bottomMoney/Number(this.state.data.money)).toFixed(2);
            var notice = Math.round((Number(value) * single)/1000)*1000;
            this.setState({
                notice
            })
        }
    }

    render() {
        return (
            <div className="flex_main_frame">
                <Notice top={5}></Notice>
                <Header title="" goHome={
                    (e)=>{
                        this.props.history.replace("/")
                    }
                }></Header>


                <div className="data_frame">
                    <div className={"benfit_item"} style={{marginTop: "0rem"}}>
                        <Title title="年龄"></Title>
                        <Input placeholder="请输入周岁" changeContent={(e)=>{
                            var value = e.target.value.replace(/\D/g,'');
                            var min = Number(this.state.data.age);
                            if(value > 105) {
                                value = 105;
                            }
                            if(Number(value) > min) {
                                this.setState({
                                    age: value,
                                    year: Number(value) - min
                                })
                                var self = this;
                                var age = Number(value)-1;
                                var index = age - Number(this.state.data.age);
                                var money = this.state.money;
                                if(index >= 0 && money !== "") {
                                    var infos = self.state.infomations[index];
                                    // var single = (infos.bottomMoney/Number(this.state.data.money)).toFixed(2);
                                    // var notice = Math.round((Number(money) * single)/1000)*1000;
                                    var notice = (Number(money)/infos.cash*1000).toFixed(2);
                                    notice = Math.round(notice/1000)*1000;
                                    this.setState({
                                        notice
                                    })
                                }
                            } else {
                                this.setState({
                                    age: value,
                                    year: "",
                                    notice: ""
                                })
                            }
                        }} value={this.state.age}></Input>
                        <div className={"data_last"}>周岁</div>
                    </div>
                    {this.state.age!==""&&Number(this.state.age)<=Number(this.state.data.age)?<div className="data_notice"><span className="span">*</span>输入周岁不能小于保单年龄</div>:<div></div>}
                    <div className="data_notice">第<span className="data_end_of">{this.state.year}</span>个保单年度末</div>
                    <div className={"benfit_item"}>
                        <Title title="约现金价值"></Title>
                        <Input placeholder="最低为1000" changeContent={(e)=>{
                            var value = e.target.value.replace(/\D/g,'');
                            if(value >= 1000 && value%1000 === 0) {
                                var self = this;
                                var age = Number(this.state.age)-1;
                                var index = age - Number(this.state.data.age);
                                var money = value;
                                if(index >= 0 && money !== "") {
                                    var infos = self.state.infomations[index];
                                    console.log(infos.radio,1333)
                                    // var single = (infos.bottomMoney/Number(this.state.data.money)).toFixed(2);
                                    // var notice = Math.round((Number(money) * single)/1000)*1000;
                                    // var notice = (Number(money)/infos.cash*1000).toFixed(2);
                                    var notice = ((Number(money)/infos.radio)*infos.cash).toFixed(2);

                                    notice = Math.round(notice/1000)*1000;

                                    this.setState({
                                        notice
                                    })
                                }
                            } else {
                                this.setState({
                                    notice: ""
                                })
                            }
                            this.setState({
                                money: value
                            })
                        }} blurContent={(e)=>{
                            var value = Number(e.target.value);
                            if(value<1000||value%1000!==0) {
                                Toast.info("现金价值最低为1000元,并以1000元整数为单位输入。");
                            }
                        }} value={this.state.money}></Input>
                        <div className={"data_last"}>元</div>
                    </div>

                    <div className="data_notice"><span className="span">*</span>以1000元整数为单位输入</div>
                    <div className="data_money_notice" style={{paddingLeft: "1rem"}}>估算减保的基本保险金额：约<span className="data_end_of">{this.state.notice}</span>元</div>
                    <div className="data_notice" style={{paddingLeft: "1rem"}}><span className="span">*</span>数据四舍五入,保留到千位</div>
                    <div className="data_main_notice">注：以上数据为粗略估算,不代表实际的减保金额所对应的现金价值</div>
                </div>
                
                
                <div className="benfit_bottom" style={{marginTop: "28rem"}}>保险公司不得违规销售非保险金融产品,请勿参加非法集资</div>
               
               
                <Button title="返回" submitFunc={(e)=>{
                    this.props.history.goBack();
                }}></Button>
            </div>
        )
    }
}

export default Data;