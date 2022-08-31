import React, { Component } from 'react';
import './Loading.css'
import paper from './paper.svg'
import quill from './quill.svg'

class Loading extends Component {
    render() {
        return (
            <div style={{ display: this.props.showLoading, position: 'absolute', width: this.props.size, }}>
                <img alt='' style={{ height: this.props.size, width: this.props.size, left: `calc(50% - ${this.props.size/2}` }} className='paper' src={paper} />
                <img alt='' style={{ height: this.props.size*60/100, width: this.props.size*60/100 }} className='quill' src={quill} />
            </div>
        );
    }
}

export default Loading;