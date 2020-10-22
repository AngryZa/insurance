import React from 'react';
import Computed from '../asset/js/computed';
import {getlast as Getlast,reload as Reload} from '../asset/js/getlast';
import store from '../store/createStore';

import Header from '../components/Header';
import Button from '../components/Button';
import Notice from '../components/Notice';

import {Toast} from 'antd-mobile';

class Result extends React.Component {
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
            age: 0,
            year: 0,
            informations: [
                {
                    finishAllMoney: "***"
                }
            ],
            infos: {
                finishMoney: "***",
                overMoney: "***",
                bottomMoney: "***",
                lameMoney: "***",
                yearMoney: "***"
            },
            result: "",
            value: "",
            computedArr: [
                {
                    year: 0,
                    result: "",
                    value: ""
                }
            ],
            total: 0,
            radio:''
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
        // console.log(this.props.location.search,666,data)
        if(data.sex!=null && data.age!=null && data.date!=null && data.money!=null) {
            var informations = Computed(data);
            
            this.setState({
                data,
                age: Number(data.age)+1,
                informations,
                infos: informations[0],
            
                computedArr: [
                    {
                        year: Number(data.age)+1,
                        result: "",
                        value: ""
                    }
                ],
                total: Number(data.money)-5000,
                radio:informations[0].radio
            },()=>{
                // console.log(this.state.infos,'callback')
            })
            
        } else {
            this.props.history.replace("/");
        }
        
        // console.log(store.getState().result.computedArr,'yian')
    }

    //跳转页面
    submitFunc() {
        var data = this.state.data;
        var arr = [];
        var miunsArr = store.getState().result.computedArr;
        for(let i=0;i<miunsArr.length;i++) {
            if(Number(miunsArr[i].year) - Number(this.state.data.age) <= 0 && miunsArr[i].year !== "") {
                Toast.info("减保年龄有误");
                return;
            }
            //  && Number(miunsArr[i].value)>=5000
            if(Number(miunsArr[i].value)%1000!==0) {
                Toast.info("减保基本保险金额必须是1000的整数倍");
                return;
            }
            if(miunsArr[i].value) {
                var isminus = arr.find((item)=>{
                    return Number(item.year) === Number(miunsArr[i].year);
                })
                if(!isminus) {
                    arr.push(miunsArr[i]);
                } else {
                    for(let j=0;j<arr.length;j++) {
                        if(Number(miunsArr[i].year) === Number(arr[j].year)) {
                            arr[j].value = Number(arr[j].value) + Number(miunsArr[i].value);
                        }
                    }
                }
            }
        }
        var str = JSON.stringify(arr);
        this.props.history.push({pathname: "/plan",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}&minus=${str}`});
    }

    render() {
        return (
            <div>
                <Notice top={5.5}></Notice>
                <Header title="测算结果" goHome={
                    (e)=>{
                        this.props.history.replace("/")
                    }
                }></Header>
                <div className="result_header">
                    <div className="result_header_title">《幸福传世金生终身寿险详情》</div>
                    <div className="result_header_cont">欢迎您{this.state.data.name},您 {this.state.data.age} 周岁,{Number(this.state.data.sex)===0?"男士":"女士"}，<br/>投保“幸福传世金生终身寿险”, 基本保险金额<span className="span">{this.state.data.money}</span>元,{this.state.data.date!=="1000"?<span className="span">{this.state.data.date}年</span>:<span className="span">一次性</span>}交费,年交保费<span className="span">{this.state.infos.yearMoney}</span>元。</div>
                </div>
                <div style={{backgroundColor: "#fff",marginBottom: "1rem"}}>
                    <div className="result_middle_first">
                        <span>被保险人在第</span>
                        <div className="result_middle_frame">
                            <input style={{marginLeft: "2rem"}} className="result_middle_button" type="button" value="-" onClick={
                                (e)=>{
                                    var self = this;
                                    var now = Number(self.state.age);
                                    var age = Number(self.state.data.age)+1;
                                    if(now>age) {
                                        var index = now - 1 - age;
                                        var infos = this.state.informations[index];
                                        this.setState({
                                            age: --now,
                                            infos
                                        })
                                        store.dispatch({type: "CHANGERESULTYEAR", value: --now});
                                    }
                                }
                            } />
                           
                            <input className="result_middle_first_number" type="text" value={String(Number(this.state.age)-Number(this.state.data.age))} onChange={
                                (e)=>{
                                    var value = Number(e.target.value.replace(/\D/g,''))+Number(this.state.data.age);
                                    var now = Number(this.state.data.age)+1;
                                    var index = value - now;
                                    if(value>=now) {
                                        var allArr = this.state.informations;
                                        if(index > 105 - Number(this.state.data.age)) {
                                            value = 105;
                                            index = allArr.length - 1;
                                        }
                                        var infos = allArr[index];
                                        this.setState({
                                            infos: {...infos},
                                            age: value
                                        })
                                        store.dispatch({type: "CHANGERESULTYEAR", value: value});
                                    } else {
                                        var self = this;
                                        this.setState({
                                            age: value,
                                            infos: {
                                                finishAllMoney: "***",
                                                overMoney: "***",
                                                bottomMoney: "***",
                                                lameMoney: "***",
                                                yearMoney: self.state.infos.yearMoney
                                            }
                                        })
                                    }
                                }
                            }></input>
                            <input style={{marginRight: "2rem"}} className="result_middle_button" type="button" value="+" onClick={
                                (e)=>{
                                    var self = this;
                                    var age = Number(self.state.age);
                                    var index = Number(age) - Number(this.state.data.age);
                                    if(index<this.state.informations.length) {
                                        var infos = this.state.informations[index];
                                        this.setState({
                                            age: ++age,
                                            infos
                                        })
                                        store.dispatch({type: "CHANGERESULTYEAR", value: ++age});
                                    }
                                }
                            } />
                        </div>
                        <span>个保单年度末,<span className="span">{this.state.age}</span>周岁时。</span>
                    </div>
                    {[
                        {
                            title: "年度末实际共交纳保费",
                            money: Number(this.state.data.date) === 1000 ? this.state.informations[0].finishAllMoney : this.state.infos.finishAllMoney
                        },
                        {
                            title: "年度末保险金额",
                            money: this.state.infos.overMoney
                        },
                        {
                            title: "年度末现金价值",
                            money: this.state.infos.bottomMoney
                        },
                        {
                            title: "年度末身故/全残保险金",
                            money: this.state.infos.lameMoney
                        }
                    ].map((item,index)=>
                        <div className="result_item" key={index}>
                            <div className="result_item_title">{item.title}</div>
                            <div className="result_item_money">{item.money}元</div>
                        </div>
                    )}
                    <div className="result_notice"><span className="span">*</span>以上为未发生减保的数值</div>
                </div>






                {/* 2019/5/15   新增需求    start */}
                <div className="result_diminish_frame">
                    <div className="result_diminish_box">减保试算</div>
                </div>
                <div className="result_items_frame">
                    <div className="result_item_title_special">
                        <li>固定年龄段减保</li>
                    </div>
                    <div className="result_item_money_special">
                        <input className="result_common_button" type="button" value="固定年龄段减保" onClick={(e)=>{
                            var data = this.state.data;
                            this.props.history.push({pathname: "/during",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}`}); 
                        }}/>
                    </div>
                </div>





                {/* 2019/5/15   新增需求    end */}
                {store.getState().result.computedArr.map((item,allIndex)=>(
                    
                    <div key={allIndex} style={{backgroundColor: " rgb(255, 255, 255)"}}>
                        {allIndex === 0?
                            <div>
                                <div className="result_item_title_special">
                                    <li>非固定年龄段减保</li>
                                </div>
                                <div className="result_item_money_special">
                                    <input className="result_common_button" type="button" value="数据测算" onClick={(e)=>{
                                        var data = this.state.data;
                                        this.props.history.push({pathname: "/data",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}`}); 
                                    }}/>
                                </div>
                            </div>
                        :<div></div>}




                        <div className="result_bottom_box">


                            
                            {/* {allIndex !== 0?<div className="result_close_frame" onClick={()=>{
                                var arr = store.getState().result.computedArr;
                                arr.splice(allIndex,1);
                                this.setState({
                                    computedArr: arr
                                })
                                store.dispatch({type: "CHANGEARR",value: arr});
                            }}>关闭减薄</div>:<div></div>} */}



                            <div className="result_bottom_frame">
                                <span style={{}}>在</span>
                                
                                <input className="computed_input_ddd" onChange=
                                {(e)=>{
                                    //周岁
                                    var arr = store.getState().result.computedArr;
                                    console.log(arr,'156')
                                    // arr就是一个空白的数组
                                    var value = e.target.value.replace(/\D/g,'');
                                    // value就是周岁 比如25
                                    if(Number(value) > 105) {
                                        value = "105";
                                    }
                                    
                                    //age = 24了
                                    var age = Number(value)-1; 

                                
                                    // this.state.data就是上个页面传过来的相关的参数，姓名，年龄，性别，期限，基本保费
                                    var index = Number(age) - Number(this.state.data.age);
                                    // index=24-18=6

                                    // allIndex=0,arr为空
                                    arr[allIndex].year = value;
                                    

                                    
                                    
                                    if(index >= 0 && item.value !== "") {
                                        var self = this;
                                        var infos = self.state.informations[index];
                                        
                                        var result = (Number(item.value)/self.state.radio)*Number(infos.cash);
                                        
                                        
                                        
                                        arr[allIndex].result = Number(result).toFixed(2);
                                        // arr[allIndex].result = Number(1725);
                                        // arr[allIndex].finish =(((Number(infos.initMoney)-Number(item.value))/self.state.radio)*Number(infos.cash)).toFixed(2)
                                        // arr[allIndex].finish=90
                                        
                                        arr = Reload(arr,self.state.data.age,self.state.informations,self.state.radio);
                                        
                                    } else {
                                        arr[allIndex].result = "";
                                        arr[allIndex].finish = "";
                                    }
                                    
                                    this.setState({
                                        computedArr: arr    
                                    })
                                    console.log(arr,777)
                                    store.dispatch({type: "CHANGEARR",value: arr});
                                }} value={item.year}></input>
                                



                                <span>周岁（第{Number(item.year)-Number(this.state.data.age)<1?"*":Number(item.year)-Number(this.state.data.age)}个保单年度末）时,减保</span>





                                


                                <input className="computed_input_ddd" onChange={(e)=>{
                                    console.log(item,'item777s')
                                    // 减保基本保险金额
                                    var value = e.target.value.replace(/[^\d.]/g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3').replace(/^\./g,""); //7
                                    // var value = e.target.value;


                                    //判断减保金额是否符合要求
                                    var fixed = Number(this.state.data.money)-5000;
                                    // console.log(fixed,'fixed')
                                    
                                    var total = fixed;

                                    // 这个时候ARR还是空的，有一个空的数组
                                    var arr = store.getState().result.computedArr;

                                    console.log(arr,'arr',allIndex)

                                    /* for(let i=0;i<arr.length;i++) {
                                        if(allIndex !== i) {
                                            total = total - Number(arr[i].value)
                                        }
                                    }
                                    if(Number(value)>=total) {
                                        value = total;
                                    }
                                    if(total === 0) {
                                        value = "";
                                    } */
                                    


                                    //24
                                    var age = Number(item.year)-1;

                                    //24-18=6
                                    var index = Number(age) - Number(this.state.data.age);
                                    //arr[0].value=value
                                    arr[allIndex].value = value;


                                    if(item.year !== "" && index >= 0) {
                                        var self = this;
                                        // console.log(item,'item888888',value)
                                        var infos = self.state.informations[index];
                                        // console.log(infos,infos.cash,'6665555',item.value)
                                        // console.log(self.state.radio)
                                        
                                        var result = (Number(item.value)/self.state.radio)*Number(infos.cash);

                                        arr[allIndex].result = Number(result).toFixed(2);
                                        
                                        // arr[allIndex].finish =(((Number(infos.initMoney)-Number(item.value))/self.state.radio)*Number(infos.cash)).toFixed(2)
                                       
                                        
                                        console.log(arr,'第一项的ARR')
                                        
                                        /* for(var i in arr){
                                            console.log(i,arr[i])
                                        }
                                        if(arr.length<=1){
                                            arr[allIndex].finish =(((Number(infos.initMoney)-Number(item.value))/self.state.radio)*Number(infos.cash)).toFixed(2)
                                        
                                        }else{
                                            var alllengh=''
                                            for(var j in arr){
                                                    alllengh=Number(alllengh) + Number(arr[j].value) 
                                            }
                                            console.log(alllengh,"之前的减薄",infos,item.value)
                                            arr[allIndex].finish =(((Number(infos.initMoney)-Number(item.value)-Number(alllengh))/self.state.radio)*Number(infos.cash)).toFixed(2)   
                                            arr[allIndex].finish =(((Number(infos.initMoney)-Number(alllengh))/self.state.radio)*Number(infos.cash)).toFixed(2)   
                                            console.log(arr[allIndex].finish)
                                        }
 */
                                         arr[allIndex].finish =(((Number(infos.initMoney)-Number(item.value))/self.state.radio)*Number(infos.cash)).toFixed(2)
                                        
                                        arr = Reload(arr,self.state.data.age,self.state.informations,self.state.radio);
                                        
                                    }



                                    this.setState({
                                        computedArr: arr,
                                        total
                                    })
                                    store.dispatch({type: "CHANGEARR",value: arr});
                                    console.log(item,'item')


                                }} value={item.value} onBlur={()=>{
                                    if(Number(item.value%1000)!==0) {
                                        Toast.info("输入的内容不是1000的整数倍");
                                    }
                                }}></input>
                                
                                
                                
                                <span>元基本保险金额,对应现金价值<span className="data_end_of">{item.result}</span>元。年度末现金价值（减保后）<span className="data_end_of">{item.finish}</span>元</span>
                                
                                {/* 关闭减保 */}
                            {allIndex !== 0?<div className="result_close_frame" onClick={()=>{
                                var arr = store.getState().result.computedArr;
                                arr.splice(allIndex,1);
                                this.setState({
                                    computedArr: arr
                                })
                                store.dispatch({type: "CHANGEARR",value: arr});
                            }}>关闭此减保</div>:<div></div>}
                            
                            </div>
                           
                           
                            {Number(item.value%1000)!==0?<div className="result_bottom_notice"><span className="span">*</span>减保基本保险金额必须是1000的整数倍</div>:<div></div>}
                        </div>
                    </div>
                ))}
























                <div style={{backgroundColor: " rgb(255, 255, 255)",padding: "0 2rem 2rem"}}>
                    <input className="result_common_button" type="button" value="增加减保次数" onClick={(e)=>{
                        

                        var arr = store.getState().result.computedArr;
                        // console.log(arr,"已经有一列的情况")
                        //在已经有一个空白减保的时候，紧张增加另一个空白减保
                        var r=arr.filter((currentValue,index)=>{
                            return currentValue.year===''
                        })
                        if(r.length>0){
                            return false
                        }

                        arr.push(
                            {
                                year: "",
                                result: "",
                                value: ""
                            }
                        )
                        this.setState({
                            computedArr: arr
                        })
                        store.dispatch({type: "CHANGEARR",value: arr});
                    }}/>
                </div>
                {/* <div className={"benfit_bottom"}>保险公司不得违规销售非保险金融产品,请勿参加非法集资</div> */}
                <div className={"benfit_bottom"}></div>
                <Button title="查看“幸福财富尊享终生寿险”逐年数据演示" submitFunc={(e)=>this.submitFunc(e)}></Button>
            </div>
        )
    }
}

export default Result;  