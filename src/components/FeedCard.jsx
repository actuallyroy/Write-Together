import React, { Component } from 'react';
import "./FeedCard.css"
import defaultUser from "../defaultUser.svg"
import {BookmarkSimple, BookOpen, Heart, ChatTeardrop, ShareNetwork} from 'phosphor-react'
import { Link } from 'react-router-dom'
import Reaction from './Reaction';
import {constants} from '../constants'

let axios = require('axios')
let editBtnHide = 'none'

let reaction = 0

class FeedCard extends Component {
  constructor(props){
    super(props)
    reaction = Number(props.data.liked)
  }

  setReaction(react, docID) {
    let token = localStorage.getItem('token')
    let username = localStorage.getItem('username')
    axios.post(`${constants.API_HOST}/api/like/${docID}`, {username: username, reaction: react}, {headers: {Authorization: token, "ngrok-skip-browser-warning": true}})
    .then(res => console.log(res))
    reaction = react
  }

  render() {
    let EditLink = `/edit/${this.props.data.docID}`
    if(this.props.data.branchable)
      editBtnHide = 'block'
    else
      editBtnHide = 'none'
    
    return (
      <div className="feedCard">
        <div className='feecard-head'>
          <div className='name-pro-pic'>
            <img className='icn' alt='Profile' height={50} src={defaultUser}/>
          </div>
          <div>
            <div className='post-title'>{this.props.data.title}</div>
            <div className='username-placeholder'><Link className='icn' to={`/users/${this.props.data.mauthor}`}>@{this.props.data.mauthor}</Link></div>
          </div>
          <BookmarkSimple className='icn' size={45} color="#ffffff" />
          <Link to={`/read/${this.props.data.docID}`}>
            <BookOpen className='icn' size={45} color="#ffffff" weight="fill" />
          </Link>
        </div>

        <div className='feed-card-body'>
          <img alt='Book Cover' className='feed-card-cover' src={this.props.data.coverpage}/>
          <div>
            <span className='oauthors'>{this.props.oauthors}</span>
          </div>
        </div>

        <div className='feed-card-footer'>
          <Reaction reaction={reaction} setReaction={this.setReaction} docID={this.props.data.docID}  />
          <ChatTeardrop className='icn' size={45} color="#B6B6B6" weight='fill'/>
          <ShareNetwork className='icn' size={45} color="#b6b6b6" weight="fill" />
          <div style={{textAlign: 'right', display: editBtnHide}}>
            <a href={EditLink}>
              <svg className='icn' width="45" height="45" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.8898 4.38612C34.8642 5.41508 32.9132 6.52524 31.0451 7.71181C20.4472 14.4374 15.1515 21.9388 11.8928 26.6675C8.44117 31.6822 5.73609 36.97 3.82695 42.434C2.93516 42.9612 2.17269 43.6022 1.57411 44.3279C1.23441 44.7415 0.949574 45.1794 0.723744 45.6352C0.107677 44.5636 -0.12114 43.3881 0.0605845 42.2281L5.68634 32.8448C5.42272 31.6297 5.34395 30.3958 5.45154 29.1672C5.51377 28.0418 5.77304 26.9275 6.22258 25.8535C6.60348 24.9718 7.11885 24.1265 7.75832 23.3346C7.76129 24.0032 7.83878 24.6704 7.98995 25.3291C8.06928 25.6835 8.16446 26.0139 8.26917 26.3203C8.28507 25.4723 8.37624 24.626 8.54205 23.7872C8.87162 22.1808 9.4521 20.6096 10.2714 19.1063C11.3678 16.9841 12.7737 14.9604 14.4629 13.0727C16.1478 11.1117 17.2583 10.2234 17.912 9.73978C18.729 9.12789 19.6108 8.56736 20.5487 8.06377C20.1276 8.75878 19.8556 9.49989 19.7428 10.2593C19.6741 10.7181 19.6645 11.1807 19.7142 11.6409C20.4229 10.5952 21.2455 9.59573 22.1733 8.65277C23.5028 7.29759 29.0048 1.8697 38.5461 0.550443C40.6748 0.259773 42.8462 0.189691 45 0.342139C44.4595 0.77503 43.9571 1.23412 43.496 1.71647C41.643 3.67501 41.7128 4.76681 39.7487 7.53463C39.1376 8.43641 38.4118 9.29121 37.5815 10.087C36.8457 10.791 36.0105 11.4324 35.0907 12C33.6216 12.8931 32.7712 13.0631 30.0297 14.1956C29.2301 14.526 28.0593 15.0216 26.6632 15.6777C27.6912 15.4861 28.7795 15.2515 29.9187 14.9594C31.7493 14.4919 33.532 13.9237 35.2525 13.2594C34.8559 13.9011 34.2784 14.7822 33.501 15.7998C31.3751 18.5891 29.5252 21.0122 26.1237 22.4033C25.0738 22.8065 23.9955 23.1662 22.8936 23.4807C20.4948 24.199 18.8607 24.4839 18.8797 24.5366C18.8988 24.5893 21.1008 24.2972 23.5631 23.7201C25.1807 23.3458 26.7642 22.8923 28.3036 22.3626C26.9894 24.1882 25.3294 25.8595 23.3759 27.3236C22.2584 28.2004 21.0118 28.978 19.6603 29.6412C17.601 30.6205 15.3704 31.2526 13.7395 31.7147C12.7609 31.9819 11.8158 32.3145 10.9155 32.7083C10.3672 32.9497 9.83756 33.2143 9.32897 33.5009C10.6935 30.6152 12.3406 27.8101 14.2567 25.1088C15.9986 22.6571 17.5344 20.8901 18.7274 19.5205C20.7899 17.1621 23.1697 14.4398 26.8408 11.3559C29.8887 8.79646 33.2536 6.46258 36.8898 4.38612Z" fill="#B6B6B6"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    );
  }
}




export default FeedCard;