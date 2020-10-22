import React from 'react';
import Computed from '../asset/js/computed';
import {getlast as Getlast,reload as Reload} from '../asset/js/getlast';
import store from '../store/createStore';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

import Header from '../components/Header';
import Button from '../components/Button';
import Notice from '../components/Notice';

import {Toast} from 'antd-mobile';

//计算标准模板
const computedItem = {
    age_start: "",
    age_end: "",
    diminish: "",
    cash: "",
    finish: ""
}

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
            radio:'',
            tabs : [
                { title: '固定年龄段减保'},
                { title: '非固定年龄段减保' },
            ],
            informationsAE: [],
            totalAE: 0,
            computedArrAE: [
                computedItem,
            ],
            jumpIndex:0
        }
        this.submitFunc1 = this.submitFunc1.bind(this);
        this.submitFunc2 = this.submitFunc2.bind(this);
        this.changeFunc = this.changeFunc.bind(this);
        this.getAllLastFunc = this.getAllLastFunc.bind(this);
        this.getAllReduceFunc = this.getAllReduceFunc.bind(this);
        this.reLoadFunc = this.reLoadFunc.bind(this);
        this.clearStoreFunc=this.clearStoreFunc.bind(this);
        this.choiceJumoFunc=this.choiceJumoFunc.bind(this);
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
            var informations = Computed(data);
            var informationsAE = Computed(data);

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
                radio:informations[0].radio,

                informationsAE,
                totalAE: Number(data.money),
                computedArrAE: store.getState().during.computedArr
            },()=>{
                // console.log(this.state.infos,'callback')
            })
        } else {
            this.props.history.replace("/");
        }
        console.log(this.state.computedArrAE,'mapmap')
    }

    choiceJumoFunc(){
        console.log(666)
        var index= this.state.jumpIndex
        console.log(index)
        if(index===0){
            this.submitFunc2()
        }else{
            this.submitFunc1()
        }
    }


    //非固定年龄段跳转页面
    submitFunc1() {
        var data = this.state.data;
        // 非固定年龄减保发送
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
        console.log(str,'str')
        this.props.history.push({pathname: "/plan",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}&minus=${str}`});
    }

    //固定年龄段跳转页面
    submitFunc2() {
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
        console.log(str,'str')

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

    //清除STORE里面的所有改变
    clearStoreFunc(){
       
        //store中result的值
       var a={
            year: 0,
            computedArr: [
                {
                    year: "",
                    result: "",
                    value: "",
                    finish: ""
                }
            ]
        }
        //store中during的值
        var b={
            computedArr: [
                {
                    age_start: "",
                    age_end: "",
                    diminish: "",
                    cash: "",
                    finish: ""
                }
            ]
        }
        store.dispatch({type: "RESETRESULT", value: a});
        store.dispatch({type: "RESETDURING", value: b});
        console.log("重置store")
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
                    <div className="result_header_cont">欢迎您 <span>{this.state.data.name}</span> ,您 <span>{this.state.data.age}</span> 周岁, <span>{Number(this.state.data.sex)===0?"男士":"女士"}</span> ，<br/>投保“幸福传世金生终身寿险”, 基本保险金额 <span className="span">{this.state.data.money}</span> 元, {this.state.data.date!=="1000"?<span className="span">{this.state.data.date}年</span>:<span className="span">一次性</span>} 交费,年交保费 <span className="span">{this.state.infos.yearMoney}</span> 元。</div>
                </div>
                <div style={{backgroundColor: "#fff",marginBottom: "1rem"}}>
                    <div className="result_middle_first">
                        <span>被保险人在第</span>
                        <div className="result_middle_frame">
                            <input style={{marginLeft: "0.5rem"}} className="result_middle_button" type="button" value="-" onClick={
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
                            <input style={{marginRight: "0.5rem"}} className="result_middle_button" type="button" value="+" onClick={
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
                



                <div>
                <WhiteSpace />
                <Tabs 
                    // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { 
                        this.clearStoreFunc() ;
                        console.log('onTabClick', index, tab);
                        if(index===0){
                            this.setState({jumpIndex:0},()=>{
                                console.log(this.state.jumpIndex,'junpindex');
                            })
                        }else{
                            this.setState({jumpIndex:1},()=>{
                                console.log(this.state.jumpIndex,'junpindex');
                            })
                        }
                    }}
                    tabs={this.state.tabs}  animated={false} useOnPan={false}>  
                {/* 固定年龄段减保 */}
                <div  style={{ backgroundColor: '#fff' }}>
                <div className="during_content_frame">
                    {/* 数据测算标题栏目 */}
                    <div className="result_item_money_special">
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
                
                </div>
                                






                {/* 非固定年龄段减保 */}
                <div style={{   backgroundColor: '#fff' }}>   
                        {/* 2019/5/15   新增需求    end */}
                {store.getState().result.computedArr.map((item,allIndex)=>(
                    
                    <div key={allIndex} style={{backgroundColor: " rgb(255, 255, 255)"}}>
                        {allIndex === 0?
                            <div>
                                {/* <div className="result_item_title_special">
                                    <li>非固定年龄段减保</li>
                                </div> */}
                                <div className="result_item_money_special">
                                    <input className="result_common_button" type="button" value="数据测算" onClick={(e)=>{
                                        var data = this.state.data;
                                        this.props.history.push({pathname: "/data",search: `?name=${data.name}&sex=${data.sex}&age=${data.age}&date=${data.date}&money=${data.money}`}); 
                                    }}/>
                                </div>
                            </div>
                        :<div></div>}




                        <div className="result_bottom_box">


                            
                            



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
                </div>
                </Tabs>
                <WhiteSpace />
                </div>
                <Button title="查看“幸福财富尊享终生寿险”逐年数据演示"  submitFunc={(e)=>this.choiceJumoFunc(e)}></Button>
            </div>
        )
    }
}

export default Result;  