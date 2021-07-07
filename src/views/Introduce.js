import React from 'react';
import styles from '../asset/js/style';
import Notice from '../components/Notice';

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
                cont: "出生满30天（含）至70周岁（含）;"
            },
            {
                title: "交费方式: ",
                cont: "一次交清、年交;"
            },
            {
                title: "交费期间: ",
                cont: "趸交、3年交、5年交、10年交、15年交、20年交;"
            },
            {
                title: "保险期间: ",
                cont: "终身;"
            },
            {
                title: "保额要求: ",
                cont: "投保本险种每份投保单的最低保险费为5000元,超过1000元的保险费必须为1000元的整数倍。"
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
                {/* <div style={{width:"100%",height:"28rem",backgroundColor:styles.color}}></div> */}
                <img style={{width: "100%"}} src={require("../asset/img/home_bg1.png")} alt=""></img>
                
                <div style={styles.box}>
                    <img src={require("../asset/img/zeren.png")} className={"introduce_title"} style={{marginTop:"2.5rem"}} alt=""></img>
                    <div className={"introduce_header"}>在本主险合同有效期内,我们承担以下保险责任：</div>
                    <div className={"introduce_main"}>
                            若身故时被保险人处于满18周岁的首个保险单周年日[保险单周年日：指在本主险合同有效期内，每一个保单年度内本主险合同生效日期的对应日，如果当月无对应的同一日，则以该月最后一日作为对应日，我们按其身故时本主险合同的已交保险费,现金价值二者中的较大者给付身故保险金，本主险合同效力终止。<br/>
                            若身故时被保险人处于满18周岁的首个保险单周年日（含）之后，我们按以下不同情形确定身故保险金：<br/>
                            （1）若身故时被保险人处于交费期间届满后的首个保险单周年日（不含）之前，我们按其身故时本主险合同以下二者中的较大者给付身故保险金，本主险合同效力终止：<br/>
                                ① 现金价值；<br/>
                                ② 已交保险费乘以以下给付比例。<br/>
                    </div>
                    <div>
                        <table className={'introduce_main_table'}>
                            <tbody>
                            <tr className={'introduce_main_table_title'}>
                                <td style={{cellspacing:"10px",cellpadding:"10px"}}>被保险人到达年龄</td>
                                <td>给付比例</td>
                            </tr>
                            <tr>
                                <td>18周岁-40周岁</td>
                                <td>160%</td>
                            </tr>
                            <tr>
                                <td>41周岁-60周岁</td>
                                <td>140%</td>
                            </tr>
                            <tr>
                                <td>61周岁及以上</td>
                                <td>120%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className={"introduce_main"}>
                    （2）若身故时被保险人处于交费期间届满后的首个保险单周年日（含）之后，我们按其身故时本主险合同以下三者中的较大者给付身故保险金，本主险合同效力终止：<br/>
                            ① 现金价值；<br/>
                            ② 已交保险费乘以以下给付比例；<br/>
                    </div>
            
                    <div>
                        <table className={'introduce_main_table'}>
                            <tbody>
                            <tr className={'introduce_main_table_title'}>
                                <td style={{cellspacing:"10px",cellpadding:"10px"}}>被保险人到达年龄</td>
                                <td>给付比例</td>
                            </tr>
                            <tr>
                                <td>18周岁-40周岁</td>
                                <td>160%</td>
                            </tr>
                            <tr>
                                <td>41周岁-60周岁</td>
                                <td>140%</td>
                            </tr>
                            <tr>
                                <td>61周岁及以上</td>
                                <td>120%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={'introduce_main'}>
                            
                    ③ 基本保险金额×（1+3.5%）（保单年度数-1）。<br/>
       其中,基本保险金额×（1+3.5%）（保单年度数-1）是指首个保单年度等于基本保险金额，从第二个保单年度起，每年按基本保险金额以3.5%年复利形式增加。
                    </div>



                    
                    
                   
                    
                </div>
                <div style={styles.box}>
                    <img src={require("../asset/img/toubao.png")} className={"introduce_title"} style={{marginTop:"2rem"}} alt=""></img>
                    <ul style={{position: "relative"}}>
                        {rules}
                        {/* <img className={"introduce_bg"} src={require("../asset/img/shield.png")} alt=""></img> */}
                    </ul>
                </div>
                <div style={styles.box} className={'introduce_warning'}>
                    <img src={require("../asset/img/jianbao.png")} className={"introduce_title"} style={{marginTop:"2rem"}} alt=""></img>
                    <div className={"introduce_require_icon10"}>!</div>
                    <div className={"introduce_notice"}>本险种减保后的基本保险金额不低于5000元。</div>
                </div>
                <div className={"introduce_bottom"}>保险公司不得违规销售非保险金融产品,请勿参加非法集资</div>
            </div>
        )
    }
    componentWillMount() {
        window.scrollTo(0,0);
    }
}

export default Introduce;