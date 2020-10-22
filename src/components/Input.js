import React, { Component } from 'react';

export default class Input extends Component {
    render() {
        return (
            <input className={"input_box"} type={this.props.type} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.changeContent} onBlur={this.props.blurContent} disabled={this.props.disabled}></input>
        )
    }

    static defaultProps = {
        value: "",
        disabled: false,
        type: "text"
    }
}