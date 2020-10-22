import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        return (
            <div className="button_frame" onClick={this.props.submitFunc}>
                <div className="button_main">{this.props.title}</div>
            </div>
        )
    }
}