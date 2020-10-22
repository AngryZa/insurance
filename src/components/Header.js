import React, { Component } from 'react';
import styles from '../asset/js/style';
import '../App.css';

class Header extends Component {
    backFunc() {
        window.history.go(-1);
    }
    goHomeFunc() {
        var number = window.history.length-1;
        window.history.go(-number);
    }
    render() {
        return (
            <div style={{height:"4rem",
            width:"100%",
            backgroundColor: styles.color,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"}}>
                <div className={"header_between"} style={{width: "15%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"}} onClick={(e)=>this.backFunc(e)}>
                    <img style={{height: "2rem",
                    marginLeft: "2rem"}} src={require("../asset/img/back.png")} alt=""></img>
                </div>
                <h1 style={{fontSize: "1.6rem",
                color: "#fff"}}>{this.props.title}</h1>
                <div className={"header_between"} style={{width: "15%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"}} onClick={this.props.goHome}>
                    <img style={{height: "2rem",
                    marginRight: "2rem"}} src={require("../asset/img/home.png")} alt=""></img>
                </div>
            </div>
        )
    }
}

export default Header;