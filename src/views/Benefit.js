import React from 'react';
import styles from '../asset/js/style';
import store from '../store/createStore';

import Header from '../components/Header';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import Notice from '../components/Notice';

import Computed from '../asset/js/computed2';
import {Toast} from 'antd-mobile';

class   Benefit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllPay: true,
            name: "",
            sex: [
                {
                    title: "男",
                    is: true
                },
                {
                    title: "女",
                    is: false
                }
            ],
            age: "",
            times: [
                {
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
                    is: true
                }
            ],
            init: ""
        }
    }
    //改变姓名
    changeName(event) {
        event.persist();
        store.dispatch({type: "CHANGENAME",value: event.target.value});
        this.setState({
            name: event.target.value
        })
    }
    //改变性别
    changeSexFunc(index) {
        var arr = this.state.sex;
        arr.forEach((item)=>{
            item.is = false
        })
        arr[index].is = true;
        this.setState({
            sex: arr
        })
        store.dispatch({type: "CHANGESEX",value: arr});
    }
    //改变投保年龄
    changeAge(event) {
        event.persist();
        var value = event.target.value;
        if(Number(event.target.value) > 70) {
            value = "70";
        }
        this.setState({
            age: value.replace(/\D/g,'')
        })
        store.dispatch({type: "CHANGEAGE",value: value.replace(/\D/g,'')});
    }
    //改变期间
    changeTimesFunc(index) {
        var arr = this.state.times;
        arr.forEach((item,num)=>{
            if(num === index) {
                item.is = true;
            } else {
                item.is = false;
            }
        })
        this.setState({
            times: arr
        })
        store.dispatch({type: "CHANGETIME",value: arr});
    }
    //改变基本保险金额
    changeInit(event) {
        // console.log(event,7)
        event.persist();
        var value = event.target.value.replace(/[^\d.]/g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3').replace(/^\./g,"");
        this.setState({
            init: value
        })
        store.dispatch({type: "CHANGEINIT",value: value});
    }
    //下一步
    submitFunc() {
        var name = store.getState().benefit.name;
        var sex;
        for(let i=0;i<store.getState().benefit.sex.length;i++) {
            if(store.getState().benefit.sex[i].is) {
                sex = i;
            }
        }
        var age = store.getState().benefit.age;
        var date;
        var isAllPay = this.state.isAllPay;
        if(isAllPay) {
            date = 1000;
        } else {
            for(let i=0;i<store.getState().benefit.times.length;i++) {
                if(store.getState().benefit.times[i].is) {
                    date = store.getState().benefit.times[i].cont;
                }
            }
        }
        var money = store.getState().benefit.init;
        if(name.length<=0) {
            Toast.info("姓名不能为空");
            return;
        } else if(sex === null || sex === undefined) {
            Toast.info("请选择性别");
            return;
        } else if (age.length<=0||Number(age)<0||Number(age)>70) {
            Toast.info("年龄有误");
            return;
        } else if (!date) {
            Toast.info("请选择交费期间");
            return;
        // } else if (money.length<=0||Number(money)<50000) {
        } else if (money<5000) {
            console.log(money.length)
            Toast.info("请输入基本保险金额,最低5千元");
            return;
        } else if(Number(money)>=5000 && Number(money)%1000 !== 0) {
            Toast.info("超过5千元的保险费必须是1000元的整数倍");
            return;
        } else {
            
            
            var data = {
                name,
                sex,
                age,
                date,
                money
            }
             var informations = Computed(data);
            console.log(informations,'9999')
            data.money=informations
            this.props.history.push({pathname: "/result",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}`}); 
        }
    }

    componentWillMount() {
        window.scrollTo(0,0);
    }

    componentDidMount() {
        this.setState({
            isAllPay: store.getState().benefit.isAllPay
        })
        store.dispatch({type: "CHANGEARR",value: [
            {
                year: "",
                result: "",
                value: ""
            }
        ]});
    }

    componentWillUnmount() {
        
        store.dispatch({type: "CHANGEBENEFIT",value: this.state.isAllPay});
    }

    render() {
        return (
            <div>
                <Notice top={4.0}></Notice>
                <Header title="利益测算" goHome={
                    (e)=>{
                        console.log(window.history);
                        this.props.history.replace("/");
                    }
                }></Header>
                <div style={styles.frame}>
                    <img className={"benfit_header"} src={require("../asset/img/beibaoren.png")} alt=""></img>
                    {/* 被保人姓名 */}
                    <div className={"benfit_item"}>
                        <Title title="被保人姓名"></Title>
                        <Input placeholder="请填写被保人姓名" changeContent={(e)=>this.changeName(e)} value={store.getState().benefit.name}></Input>
                    </div>
                    {/* 性别 */}
                    <div className={"benfit_item"}>
                        <Title title="性别"></Title>
                        <div className={"benefit_choice"}>{
                            store.getState().benefit.sex.map((item,index)=>
                                <div className={item.is?"benefit_item_checked":"benefit_item"} key={index} onClick={(e)=>this.changeSexFunc(index,e)}>{item.title}</div>
                            )
                        }</div>
                    </div>
                    {/* 投保年龄 */}
                    <div className={"benfit_item"}>
                        <Title title="投保年龄"></Title>
                        <Input placeholder="出生满30天（含）至70周岁（含）" value={store.getState().benefit.age} changeContent={(e)=>this.changeAge(e)}></Input>
                    </div>
                </div>
                <div style={styles.frame}>
                    <img className={"benfit_header"} src={require("../asset/img/toubaoren.png")} alt=""></img>
                    {/* 投保方式 */}
                    <div className="benfit_item">
                        <Title title="投保方式"></Title>
                        <div className="benefit_choice">
                            <div className={this.state.isAllPay?"benefit_item_checked":"benefit_item"} onClick={()=>{
                                this.setState({
                                    isAllPay: true
                                })
                            }}>一次交清</div>
                            <div className={!this.state.isAllPay?"benefit_item_checked":"benefit_item"} onClick={()=>{
                                this.setState({
                                    isAllPay: false
                                })
                            }}>期交</div>
                        </div>
                    </div>
                    {/* 投保时间 */}
                    <div className={"benfit_item"}>
                        <Title title="交费期间"></Title>
                        {this.state.isAllPay?
                        <div className="benefit_choice">
                            <div className="benefit_item_checked">一次交清</div>
                        </div>:<div className={"benefit_choice"}>{
                            store.getState().benefit.times.map((item,index)=>
                                <div className={item.is?"benefit_item_checked":"benefit_item"} key={index}>
                                    <div onClick={(e)=>this.changeTimesFunc(index,e)}>{item.title}</div>
                                </div>
                            )
                        }</div>}
                    </div>
                    {/* 保险期间 */}
                    <div className={"benfit_item"}>
                        <Title title="保险期间"></Title>
                        <div className="benefit_text">终身</div>
                    </div>
                    {/* 基本保险金额 */}
                    <div className={"benfit_item"}>
                        <Title title="年交保费"></Title>
                        <Input placeholder="5000元起" changeContent={(e)=>this.changeInit(e)} value={store.getState().benefit.init}></Input>
                    </div>
                    <div className={"benefit_notice"}>
                        <div className={"benfit_notice_first"}>*</div>
                        <div className={"benfit_notice_second"}>最低基本保险金额为5千元,超过5千元的保险费必须是1000元的整数倍</div>
                    </div>
                </div>
                <div className={"benfit_bottom"}>保险公司不得违规销售非保险金融产品,请勿参加非法集资</div>
                <Button title="下一步" submitFunc={(e)=>this.submitFunc(e)}></Button>
            </div>
        )
    }
}

export default Benefit;