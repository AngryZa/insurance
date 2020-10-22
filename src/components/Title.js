import React, { Component } from 'react';

class Title extends Component {
    render() {
        return (
            <div style={{width: "10rem",
            color: "#333333",
            fontSize: "1.3rem",
            lineHeight: "4rem",
            textAlign: "right",
            marginRight: "1rem",
            flexShrink: 0}}>{this.props.title}：</div>
        )
    }
}

export default Title;