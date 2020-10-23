import React from 'react';
import Computed from '../asset/js/computed';
import store from '../store/createStore';

import Header from '../components/Header';
import Button from '../components/Button';

import {Toast} from 'antd-mobile';
import { number } from 'prop-types';

//计算标准模板
const computedItem = {
    age_start: "",
    age_end: "",
    diminish: "",
    cash: "",
    finish: ""
}

class During extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: "***",
                sex: "***",
                age: "***",
                date: "***",
                money: "***"
            },
            informationsAE: [],
            totalAE: 0,
            computedArrAE: [
                computedItem,
            ]
        }
        this.submitFunc = this.submitFunc.bind(this);
        this.changeFunc = this.changeFunc.bind(this);
        this.getAllLastFunc = this.getAllLastFunc.bind(this);
        this.getAllReduceFunc = this.getAllReduceFunc.bind(this);
        this.reLoadFunc = this.reLoadFunc.bind(this);
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
            var informationsAE = Computed(data);
            // console.log(data,informationsAE,'初始化')
            this.setState({
                data,
                informationsAE,
                totalAE: Number(data.money),
                // totalAE: Number(data.money)-5000,
                computedArrAE: store.getState().during.computedArr
            })
        } else {
            this.props.history.replace("/");
        }
    }
    componentWillUnmount() {
        var arr = this.state.computedArrAE;
        console.log(arr,'willmount')
        store.dispatch({type: "CHANGEDURING",value: arr});
    }

    //点击下一步执行的函数
    submitFunc() {
        var data = this.state.data;
        var arr = this.state.computedArrAE;
        var minus = [];
        for(let index=0;index<arr.length;index++) {
            // 多余的代码，arr[index].year不存在
            if(Number(arr[index].year) - Number(this.state.data.age) <= 0 && arr[index].year !== "") {
                Toast.info("减保年龄有误");
                return;
            }
            if(Number(arr[index].diminish)%1000!==0) {
                Toast.info("减保基本保险金额必须是1000的整数倍");
                return;
            }


            const haveAge = Number(arr[index].age_end) - Number(arr[index].age_start) + 1;
            for(let i=0;i<haveAge;i++) {
                var number = Number(arr[index].age_start) - Number(data.age) - 1 + i;
                var infos = this.state.informationsAE[number];
                let year = Number(arr[index].age_start) + i;
                var isminus = minus.find((item)=>{
                    return Number(item.year) === year;
                })
                if(arr[index].age_start !== "" && arr[index].age_end !== "" && arr[index].diminish !== "" && Number(arr[index].age_start) <= Number(arr[index].age_end) && Number(arr[index].age_start) > Number(this.state.data.age) && Number(arr[index].age_end) > Number(this.state.data.age)) {
                    if(!isminus) {
                        minus.push({
                            year: year,
                            result: this.getAllReduceFunc(Number(arr[index].age_start)+i,arr,infos).toFixed(2),
                            value: Number(arr[index].diminish),
                            finish: this.getAllLastFunc(Number(arr[index].age_start)+i,arr,infos).toFixed(2)
                        })
                    } else {
                        for(let j=0;j<minus.length;j++) {
                            if(year === minus[j].year) {
                                minus[j].value = Number(minus[j].value) + Number(arr[index].diminish);
                            }
                        }
                    }
                }
            }
        }
        minus.sort((a,b)=>{
            return a.year - b.year;
        });
        var str = JSON.stringify(minus);
        this.props.history.push({pathname: "/plan",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}&minus=${str}`});
    }

    //改变输入框
    changeFunc(e) {
        
        const type = Number(e.target.dataset.type);
        const index = Number(e.target.dataset.index);
        

        var value = e.target.value.replace(/\D/g,'');
        var arr = this.state.computedArrAE;
        var diminish_totalAE = Number(this.state.totalAE);
        // console.log(value,arr,diminish_totalAE,this.state.totalAE)

        if(type === 1) {
            if(Number(value) > 105) {
                value = "105";
            }
            if(arr[index].age_end !== "" && Number(value) > Number(arr[index].age_end)) {
                value = arr[index].age_end;
            }
            // console.log(value,'初始值')
            arr[index].age_start = value;
        } else if(type === 2) {
            if(Number(value) > 105) {
                value = "105";
            }
            arr[index].age_end = value;
        } else if(type === 3) {
            if(arr[index].age_start !== "" && arr[index].age_end !== "" && Number(arr[index].age_start) <= Number(arr[index].age_end) && Number(arr[index].age_start) > Number(this.state.data.age) && Number(arr[index].age_end) > Number(this.state.data.age)) {
                for(let i=0;i<arr.length;i++) {
                    const haveAge = Number(arr[i].age_end) - Number(arr[i].age_start) + 1;
                    if(i !== index) {
                        diminish_totalAE = diminish_totalAE - Number(arr[i].diminish) * haveAge;
                    }
                }
                const haveAge = Number(arr[index].age_end) - Number(arr[index].age_start) + 1;
                console.log(haveAge,'haveAge',diminish_totalAE)
                if ((diminish_totalAE -5000 )/ haveAge <= Number(value)) {
                    value = Number(diminish_totalAE / haveAge).toFixed(0);
                    Toast.info("减保后的基本保险金额不可低于5000");
                }
                if(diminish_totalAE === 0) {
                    value = "";
                }
                arr[index].diminish = value;
                console.log(value,9990909)
            } else {
                Toast.info("请先输入正确的年龄段");
            }
        }
        // console.log(arr,"计算前的ARR")
        arr = this.reLoadFunc(arr);

        this.setState({
            computedArrAE: arr
        })
        console.log(this.state.data,'前面的是data,后面那个是COMPTERARR',this.state.computedArrAE)
    }

    //重新渲染所有数组
    reLoadFunc(arr) {
        // console.log(arr,'渲染ARR')
        for(let per=0;per<arr.length;per++) {
            if(arr[per].age_start !== "" && arr[per].age_end !== "" && arr[per].diminish !== "" && Number(arr[per].age_start) <= Number(arr[per].age_end) && Number(arr[per].age_start) > Number(this.state.data.age) && Number(arr[per].age_end) > Number(this.state.data.age)) {
                var totalAE = Number(arr[per].age_end) - Number(arr[per].age_start) + 1;
                var cash_all = 0;
                var finish_all = 0;
                for(let i=0;i<totalAE;i++) {
                    var number = Number(arr[per].age_start) - Number(this.state.data.age) - 1 + i;
                    var infos = this.state.informationsAE[number];

                    var result = this.getAllReduceFunc(Number(arr[per].age_start)+i,arr,infos);
                    cash_all = cash_all + result;

                    finish_all = this.getAllLastFunc(Number(arr[per].age_start)+i,arr,infos);
                }
                arr[per].cash = cash_all.toFixed(2);
                arr[per].finish = finish_all.toFixed(2);
            } else {
                arr[per].cash = "";
                arr[per].finish = "";
            }
        }
        return arr;
    }

    //获取减保后基本保险金额
    getAllLastFunc(year,arr,infos) {
        // console.log(year,arr,arr.length,infos,'获取减保后基本保险金额')
        
        let totalAE = Number(this.state.data.money);  //总金额
        
        for(let index=0;index<arr.length;index++) {
            const haveAge = Number(arr[index].age_end) - Number(arr[index].age_start) + 1;
            for(let i=0;i<haveAge;i++) {
                if(year >= Number(arr[index].age_start) + i) {
                    if(arr[index].age_start !== "" && arr[index].age_end !== "" && arr[index].diminish !== "" && Number(arr[index].age_start) <= Number(arr[index].age_end) && Number(arr[index].age_start) > Number(this.state.data.age) && Number(arr[index].age_end) > Number(this.state.data.age)) {
                        totalAE = totalAE - Number(arr[index].diminish);
                    }
                }
            }
        }
        
        // return totalAE/1000*Number(infos.cash).toFixed(2);
        return (totalAE/infos.radio)*Number(infos.cash).toFixed(2);
        // return Number(100);

    }

    //获取当年所有减保
    getAllReduceFunc(now,arr,infos) {
        let totalAE = 0;
        for(let index=0;index<arr.length;index++) {
            const haveAge = Number(arr[index].age_end) - Number(arr[index].age_start) + 1;
            for(let i=0;i<haveAge;i++) {
                let year = Number(arr[index].age_start) + i;
                if(year === now) {
                    totalAE = totalAE + Number(arr[index].diminish);
                }
            }
        }
        
        // return totalAE/1000*Number(infos.cash).toFixed(2);
        return (totalAE/infos.radio)*Number(infos.cash).toFixed(2);
    }

    render() {
        return (
            <div>
                <Header title="测算结果" goHome={
                    (e)=>{
                        this.props.history.replace("/")
                    }
                }></Header>
                
                <div className="during_content_frame">
                    {/* 数据测算标题栏目 */}
                    <div className="result_item during_items_frame">
                        <div className="result_item_title"></div>
                        <div className="result_item_money">
                            <input className="result_common_button" type="button" value="数据测算" onClick={(e)=>{
                                var data = this.state.data;
                                this.props.history.push({pathname: "/data",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}`}); 
                            }}/>
                        </div>
                    </div>

                    {/* 展示渲染栏目 */}
                    {this.state.computedArrAE.map((item,index)=>(
                        <div className="during_lists_frame" key={index}>
                            
                            

                            <div className="during_lists_box">
                                <span>在</span>
                                <input className="during_input" data-type="1" data-index={index} onChange={(e)=>{this.changeFunc(e)}} value={item.age_start}></input>
                                周岁（第{item.age_start && Number(item.age_start) > Number(this.state.data.age)?Number(item.age_start)-Number(this.state.data.age):"*"}个保单年度末）到
                                <input className="during_input" data-type="2" data-index={index} onChange={(e)=>this.changeFunc(e)} value={item.age_end} onBlur={()=>{
                                    if(Number(item.age_start)>Number(item.age_end)) {
                                        Toast.info("第一个年龄必须小于等于第二个年龄");
                                    }
                                }}></input>
                                周岁（第{item.age_end && Number(item.age_end) > Number(this.state.data.age)?Number(item.age_end)-Number(this.state.data.age):"*"}个保单年度末），每年减保
                                <input className="during_input" data-type="3" data-index={index} onChange={(e)=>this.changeFunc(e)} value={item.diminish} onBlur={()=>{
                                    if(Number(item.diminish)%1000!==0) {
                                        Toast.info("输入的内容不是1000的整数倍");
                                    }
                                }}></input>

                                
                                元，累计领取现金价值
                                {/* <input className="during_input" disabled value={item.cash}></input> */}
                                <span className="span during_result_input">{item.cash}</span>
                                元。第{item.age_end && Number(item.age_end) > Number(this.state.data.age)?Number(item.age_end)-Number(this.state.data.age):"*"}个保单年度末现金价值
                                {/* <input className="during_input" disabled value={item.finish}></input> */}
                                <span className="span during_result_input">{item.finish}</span>
                                元（减保后）。
                            </div>
                           
                            {/* 关闭按钮 */}
                            {index !== 0?<div className="result_close_frame2" onClick={(e)=>{
                                var arr = this.state.computedArrAE;
                                arr.splice(index,1);
                                arr = this.reLoadFunc(arr);
                                this.setState({
                                    computedArrAE: arr
                                })
                            }}>关闭此减保</div>:<div></div>}    
                            
                           {/*  <div className="result_bottom_notice span"><span className="span">*</span>如需增加单年度减保，则仍在本界面点击“增加减保年龄段”，起止年龄为同一数值。</div>
                            {Number(item.diminish%1000)!==0?<div className="result_bottom_notice"><span className="span">*</span>减保基本保险金额必须是1000的整数倍</div>:<div></div>} */}
                            
                            
                            {index === (this.state.computedArrAE.length - 1)?(
                                <div className="during_add_frame">
                                    <input className="result_common_button" type="button" value="增加减保年龄段" onClick={(e)=>{
                                        var arr = this.state.computedArrAE;
                                       
                                        //保证只能显示一个输入框
                                        var r=arr.filter((currentValue,index)=>{
                                            return currentValue.age_end===''
                                        })
                                        if(r.length>0){
                                            return false
                                        }


                                        arr.push(
                                            {
                                                age_start: "",
                                                age_end: "",
                                                diminish: "",
                                                cash: "",
                                                finish: ""
                                            }
                                        )
                                        this.setState({
                                            computedArrAE: arr
                                        })
                                    }}/>
                                </div>
                            ):<div></div>}
                        </div>
                    ))}
                </div>



                <div className="benfit_bottom">保险公司不得违规销售非保险金融产品,请勿参加非法集资</div>
                <Button title="下一步" submitFunc={this.submitFunc}></Button>
            </div>
        )
    }
}

export default During;