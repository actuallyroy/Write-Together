import React, { Component } from 'react';
import { Smiley, SmileySad, SmileyBlank, SmileySticker, SmileyMeh, Heart } from 'phosphor-react';
import angry from  './angry.svg'
import './Reaction.css'
class Reaction extends Component {
  render() {
    return (
      <div onMouseMove={() => {
        console.log(document.querySelector('.reaction-box'))
      }} className="reaction-holder">
        <SmileySticker onmous size={50} className='icn' color="#b6b6b6" weight="fill" />
        <div className='pseudo-box'>
        </div>

        <div className="reaction-box">
          <Smiley className="icn em" color="gold" weight="fill" />
          <Heart className="icn em" color="red" weight="fill" />
          <SmileySad className="icn em" color="#6b7db3" weight="fill" />  
          <img className='icn em' src={angry} />
        </div>
      </div>
    );
  }
}

export default Reaction;