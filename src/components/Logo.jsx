import React, { Component } from 'react';
import logo1 from "../assets/logo/logo1.svg";
import logo from "../assets/logo/logo.svg";
let l = ""
class Logo extends Component {
    constructor(props) {
        super(props)
        if(props.th === 1){
            l = logo
        }else{
            l = logo1
        }
    }
    render() {
        return (
            <div>
                <img
                    alt='Logo'
                    height={this.props.size}
                    width={this.props.size}
                    src={l}
                    style = {{
                        margin: '10px',
                        position: 'absolute',
                        top: '-10px'
                    }}
                >
                </img>
            </div>
        );
    }
}

export default Logo;