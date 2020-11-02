import React from 'react';
import styles from '../asset/js/style';
import Notice from '../components/Notice';
import Header from '../components/Header';

class Introduce extends React.Component {
    render() {
        // let Arr = [
        //     "若身故时被保险人处于满18周岁的首个保险单周年日 （不含）之前,则身故保险金为本主险合同的已交保险费、现金价值二者中的较大者;",
        //     "若身故时被保险人处于满18周岁的首个保险单周年日（含）至满41周岁的首个保险单周年日（不含）,则身故保险金为其身故时本主险合同的基本保险金额×（1+3.6%）（保单年度数-1）、已交保险费的1.7倍、现金价值三者中的较大者,其中,基本保险金额×（1+3.6%）（保单年度数-1）是指首个保单年度等于基本保险金额,从第二个保单年度起,每年按基本保险金额以3.6%年复利形式增加;",
        //     "若身故时被保险人处于满41周岁的首个保险单周年日（含）至满61周岁的首个保险单周年日（不含）,则身故保险金为其身故时本主险合同的基本保险金额×（1+3.6%）（保单年度数-1）、已交保险费的1.5倍、现金价值三者中的较大者;",
        //     "若身故时被保险人处于满61周岁的首个保险单周年日（含）之后,则身故保险金为其身故时本主险合同的基本保险金额×（1+3.6%）（保单年度数-1）、已交保险费的1.3倍、现金价值三者中的较大者。"
        // ].map((item,index)=>
        //     <div className={"introduce_item"} key={index}>{item}</div>
        // )
        // let Arr1 = [
        //     "若确认身体全残时被保险人处于满18周岁的首个保险单周年日（不含）之前,则身体全残保险金为其确认身体全残时本主险合同的已交保险费、现金价值二者中的较大者;",
        //     "若确认身体全残时被保险人处于满18周岁的首个保险单周年日（含）至满41周岁的首个保险单周年日（不含）,则身体全残保险金为其确认身体全残时本主险合同的基本保险金额×（1+3.6%）（保单年度数-1）、已交保险费的1.7倍、现金价值三者中的较大者;",
        //     "若确认身体全残时被保险人处于满41周岁的首个保险单周年日（含）至满61周岁的首个保险单周年日（不含）,则身体全残保险金为其确认身体全残时本主险合同的基本保险金额×（1+3.6%）（保单年度数-1）、已交保险费的1.5倍、现金价值三者中的较大者;",
        //     "若确认身体全残时被保险人处于满61周岁的首个保险单周年日（含）之后,则身体全残保险金为其确认身体全残时本主险合同的基本保险金额×（1+3.6%）（保单年度数-1）、已交保险费的1.3倍、现金价值三者中的较大者。"
        // ].map((item,index)=>
        //     <div className={"introduce_item"} key={index}>{item}</div>
        // )
        let Arr = (
            <div>
                <div className={"introduce_item"}><span>若身故时被保险人处于满18周岁的首个保险单周年日 （不含）之前,则身故保险金为其身故时本主险合同的已交保险费、现金价值二者中的较大者;</span></div>
                <div className={"introduce_item"}><span>若身故时被保险人处于满18周岁的首个保险单周年日（含）至满41周岁的首个保险单周年日（不含）,则身故保险金为其身故时本主险合同的基本保险金额×（1+3.6%）</span><span className="introduce_icon"><img className="introduce_img" src={require("../asset/img/reducer.png")} alt=""></img></span><span>、已交保险费的1.7倍、现金价值三者中的较大者,其中,基本保险金额×（1+3.6%）</span><span className="introduce_icon"><img className="introduce_img" src={require("../asset/img/reducer.png")} alt=""></img></span><span>是指首个保单年度等于基本保险金额,从第二个保单年度起,每年按基本保险金额以3.6%年复利形式增加;</span></div>
                <div className={"introduce_item"}><span>若身故时被保险人处于满41周岁的首个保险单周年日（含）至满61周岁的首个保险单周年日（不含）,则身故保险金为其身故时本主险合同的基本保险金额×（1+3.6%）</span><span className="introduce_icon"><img className="introduce_img" src={require("../asset/img/reducer.png")} alt=""></img></span><span>、已交保险费的1.5倍、现金价值三者中的较大者;</span></div>
                <div className={"introduce_item"}><span>若身故时被保险人处于满61周岁的首个保险单周年日（含）之后,则身故保险金为其身故时本主险合同的基本保险金额×（1+3.6%）</span><span className="introduce_icon"><img className="introduce_img" src={require("../asset/img/reducer.png")} alt=""></img></span><span>、已交保险费的1.3倍、现金价值三者中的较大者。</span></div>
            </div>
        )
        let Arr1 = (
            <div>
                <div className={"introduce_item"}><span>若确认身体全残时被保险人处于满18周岁的首个保险单周年日（不含）之前,则身体全残保险金为其确认身体全残时本主险合同的已交保险费、现金价值二者中的较大者;</span></div>
                <div className={"introduce_item"}><span>若确认身体全残时被保险人处于满18周岁的首个保险单周年日（含）至满41周岁的首个保险单周年日（不含）,则身体全残保险金为其确认身体全残时本主险合同的基本保险金额×（1+3.6%）</span><span className="introduce_icon"><img className="introduce_img" src={require("../asset/img/reducer.png")} alt=""></img></span><span>、已交保险费的1.7倍、现金价值三者中的较大者;</span></div>
                <div className={"introduce_item"}><span>若确认身体全残时被保险人处于满41周岁的首个保险单周年日（含）至满61周岁的首个保险单周年日（不含）,则身体全残保险金为其确认身体全残时本主险合同的基本保险金额×（1+3.6%）</span><span className="introduce_icon"><img className="introduce_img" src={require("../asset/img/reducer.png")} alt=""></img></span><span>、已交保险费的1.5倍、现金价值三者中的较大者;</span></div>
                <div className={"introduce_item"}><span>若确认身体全残时被保险人处于满61周岁的首个保险单周年日（含）之后,则身体全残保险金为其确认身体全残时本主险合同的基本保险金额×（1+3.6%）</span><span className="introduce_icon"><img className="introduce_img" src={require("../asset/img/reducer.png")} alt=""></img></span><span>、已交保险费的1.3倍、现金价值三者中的较大者。</span></div>
            </div>
        )
        let rules = [
            {
                title: "投保年龄: ",
                cont: "出生满28天（含）至68周岁（含）;"
            },
            {
                title: "交费方式: ",
                cont: "一次交清或年交;"
            },
            {
                title: "交费期间: ",
                cont: "一次交清; 3年交;5年交; 10年交; 15年交; 20年交;"
            },
            {
                title: "保险期间: ",
                cont: "终身;"
            },
            {
                title: "保额要求: ",
                cont: "投保本险种每份投保单的最低基本保险金额为5万元,超过5万元的基本保险金额须为1000元的整数倍。被保险人＜18周岁,本险种累计基本保险金额不超过100万元。"
            }
        ].map((item,index)=>
            <div className={"introduce_require"} key={index}>
                <div className={"introduce_require_icon"}>{index+1}</div>
                <div className={"introduce_require_title"}>{item.title}</div>
                <div className={"introduce_require_cont"}>{item.cont}</div>
            </div>
        )
        return (
            <div>
                <Notice></Notice>
                {/* <Header title="利益测算" goHome={
                    (e)=>{
                        console.log(window.history);
                        this.props.history.replace("/");
                    }
                }></Header> */}
                {/* <div style={{width:"100%",height:"28rem",backgroundColor:styles.color}}></div> */}
                <img style={{width: "100%"}} src={require("../asset/img/home_bg1.png")} alt=""></img>
                <div>
                <img style={{width: "100%"}} src={require("../asset/img/companytext.jpg")} alt=""></img>
                </div>
            </div>
        )
    }
    componentWillMount() {
        window.scrollTo(0,0);
    }
}

export default Introduce;