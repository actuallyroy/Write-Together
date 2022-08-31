import React, { Component } from 'react';
import { Smiley, SmileySad, SmileyBlank, SmileySticker, SmileyMeh, Heart } from 'phosphor-react';
import angry from  './angry.svg'
import './Reaction.css'
let arr = ["none", "block", "none", "none", "none"]

class Reaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reaction: props.reaction
    };
  }
  render() {
    let arr = ["none", "none", "none", "none", "none"]
    arr[this.state.reaction] = 'block'
    return (
      <div className="reaction-holder">
        <div>
          <SmileySticker style={{ display: arr[0] }} onmous size={50} className='icn' color="#b6b6b6" weight="fill" />
          <Smiley style={{display: arr[1]}} className="icn" color="gold" weight="fill" />
          <Heart style={{display: arr[2]}} className="icn" color="red" weight="fill" />
          <SmileySad style={{display: arr[3]}} className="icn" color="#6b7db3" weight="fill" />  
          <img style={{display: arr[4]}} className='icn' src={angry} />
        </div>
        <div className='pseudo-box'>
        </div>

        <div className="reaction-box">
          <Heart onClick={() => {
            if (this.state.reaction === 2) {
              this.props.setReaction(0, this.props.docID);
              this.setState({ reaction: 0 });
            } else {
              this.props.setReaction(2, this.props.docID);
              this.setState({ reaction: 2 });
            }
          }} className="icn em h" color="red" weight="fill" />
          <Smiley onClick={() => {
            if (this.state.reaction === 1) {
              this.props.setReaction(0, this.props.docID);
              this.setState({ reaction: 0 });
            } else {
              this.props.setReaction(1, this.props.docID)
              this.setState({ reaction: 1 })
            }
          }
          } className="icn em" color="gold" weight="fill" />
          
          <SmileySad onClick={() => {
            if (this.state.reaction === 3) {
              this.props.setReaction(0, this.props.docID);
              this.setState({ reaction: 0 });
            } else {
              this.props.setReaction(3, this.props.docID);
              this.setState({ reaction: 3 });
            }
          }} className="icn em" color="#6b7db3" weight="fill" />  
          <img alt='Angry' onClick={() => {
            if (this.state.reaction === 4) {
              this.props.setReaction(0, this.props.docID);
              this.setState({ reaction: 0 });
            } else {
              this.props.setReaction(4, this.props.docID);
              this.setState({ reaction: 4 });
            }
          }} className='icn em' src={angry} />
        </div>
      </div>
    );
  }
}

export default Reaction;