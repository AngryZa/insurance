import React from 'react';
import store from '../store/createStore';
import styles from '../asset/js/style';
import moreImg from '../asset/img/more.png';
import {Link} from 'react-router-dom';
import Notice from '../components/Notice';

class Home extends React.Component {
    componentDidMount() {
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
    render() {
        return (
            <div>
                <Notice></Notice>
                {/* <div style={{width:"100%",height:"28rem",backgroundColor:styles.color}}></div> */}
                <img style={{width: "100%"}} src={require("../asset/img/home_bg1.png")} alt=""></img>
                <div style={{marginTop:"0rem",backgroundColor: "#fff"}}>
                    <Link to={{pathname: "/introduce"}} className={"home_list"} style={{height:"6rem"}}>
                        <img style={{height: "2rem",marginRight: "2rem"}} src={require("../asset/img/home_one1.png")} alt=""></img>
                        <div>产品简介</div>
                        <img style={styles.more} src={moreImg} alt=""></img>
                    </Link>
                    <Link to={{pathname: "/benefit"}} className={"home_list"} style={{height:"6rem"}}>
                        <img style={{height: "2rem",marginRight: "2rem"}} src={require("../asset/img/home_two.png")} alt=""></img>
                        <div>利益测算</div>
                        <img style={styles.more} src={moreImg} alt=""></img>
                    </Link>
                    <Link to={{pathname: "/introduceCompany"}} className={"home_list"} style={{height:"6rem"}}>
                        <img style={{height: "2rem",marginRight: "2rem"}} src={require("../asset/img/home_two1.png")} alt=""></img>
                        <div>公司介绍</div>
                        <img style={styles.more} src={moreImg} alt=""></img>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home;