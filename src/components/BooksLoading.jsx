import React, { Component } from 'react';
import './LS.css'

class BooksLoading extends Component {
  render() {
    return (
      <div style={this.props.style} className="bk-body">
        <div className="tmpl bk-t">
        </div>
        <div className="tmpl bk-cvr" />
        <div className="tmpl ck"></div>
        <div className="tmpl ck "></div>

        <div className="bt-cont">
          <div className="tmpl bt"></div>
          <div className="tmpl bt"></div>
        </div>
      </div>
    );
  }
}

export default BooksLoading;