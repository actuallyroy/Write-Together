import React, { Component } from 'react';
import './cm.css'
import {TextAlignCenter, TextAlignLeft, TextAlignJustify, TextAlignRight} from 'phosphor-react'

let dis = 'none'
let arr = ["#EFEFEF", "#EFEFEF", "#EFEFEF", "#EFEFEF"];

class ContextMenu extends Component {
  render() {
    if (this.props.show !== 'none')
      dis = 'block'
    else
      dis = 'none'
    return (
      <menu
      type="context"
      className="cm-cont"
      style={{
        top: this.props.top,
        left: this.props.left,
        animation: this.props.show,
        display: dis,
      }}
      >
      <div className="biu-cont">
        <button
            id="b"
            onClick={() => {
              console.log("here")
              document.execCommand("bold", false, true);
            }}
            style={{ backgroundColor: this.props.bold }}
            className="ic"
        >
        <b>B</b>
        </button>

        <button
        id="i"
        style={{ backgroundColor: this.props.italic }}
        className="ic"
        >
        <i>I</i>
        </button>
        <button
        id="u"
        style={{ backgroundColor: this.props.underline }}
        className="ic"
        >
        <u>U</u>
        </button>
      </div>

      <div className="biu-cont">
        <TextAlignLeft
        className="ic ab"
        style={{ backgroundColor: arr[0] }}
        size={40}
        color="#000"
        weight="thin"
        />
        <TextAlignCenter
        id="alignCenterBtn"
        className="ic ab"
        style={{ backgroundColor: arr[1] }}
        size={40}
        color="#000"
        weight="thin"
        />
        <TextAlignRight
        id="aignRightBtn"
        className="ic ab"
        style={{ backgroundColor: arr[2] }}
        size={40}
        color="#000"
        weight="thin"
        />
        <TextAlignJustify
        id="alignFullBtn"
        className="ic ab"
        style={{ backgroundColor: arr[3] }}
        size={40}
        color="#000"
        weight="thin"
        />
      </div>
      </menu>
    );
  }
}

export default ContextMenu;