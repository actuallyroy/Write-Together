import Header from "./components/Header"
import "./Feed.css"
import FeedCard from "./components/FeedCard"
import React, { Component } from 'react';
import {constants} from "./constants"
var axios = require('axios')

class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      feedData: []
    }
    let username = window.localStorage.getItem("username")
    axios.post(`${constants.API_HOST}/api/feed`, {username: username})
    .then(res => {
      this.setState({feedData: res.data})
    })
  }
  render() {
    
    return (  
      <>
        <Header homeColor="#FF4040" />
        <div className="feedBody">
          <div className="feed-card-holder">
            {
              getFeedCards(this.state.feedData)
            }
          </div>
        </div>
      </>
    );
  }
}

export default Feed;



function getFeedCards(feedData) {
  console.log(feedData)
  return(
    <>
      {
        feedData.map(item => {
          let oauthorsText = `-by @${item.mauthor}`
          if(item.oauthors.length > 0)
            oauthorsText += `, @${item.oauthors[0]}`
          if(item.oauthors.length > 1)
            oauthorsText += ` and ${item.oauthors.length - 1} others`
          return <FeedCard data={item} oauthors={oauthorsText}  />
        })
      }
    </>
  )
}
