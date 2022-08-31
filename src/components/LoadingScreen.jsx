import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './LS.css'

class LoadingScreen extends Component {
  render() {
    return (
      <div className="feedCard" style={{display: this.props.hide}}>
        <div className="feecard-head lc">
          <div className="name-pro-pic">
            <div className="tmpl"></div>
          </div>
          <div>
            <div className="post-title"></div>
            <div className="username-placeholder">
              <div className="tmpl lcu"></div>
              <div className="tmpl lcu a"></div>
            </div>
          </div>
          <div className="tmpl"></div>
          <div className="tmpl"></div>
        </div>

        <div className="feed-card-body k">
        </div>

        <div className="feed-card-footer l">
          <div className="tmpl"></div>
          <div className="tmpl"></div>
          <div className="tmpl"></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="tmpl"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingScreen