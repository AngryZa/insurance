import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        return (
            // <div className="notice_fixed" style={{top: this.props.top+"rem"}}>公测版v1.0</div>
            <
            div className = "notice_fixed"
            style = {
                { top: this.props.top + "rem" } } > < /div>
            // <div></div>
        )
    }
    static defaultProps = {
        top: 1.5
    }
}