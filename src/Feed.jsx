import Header from "./components/Header"
import "./Feed.css"
import FeedCard from "./components/FeedCard"
import React, { Component } from 'react';
import LoadingScreen from "./components/LoadingScreen";
import { constants, verifyLogin,themeColor } from "./constants"
var axios = require('axios')

class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      feedData: [],
      hideLoad: 'block'
    }
    let username = window.localStorage.getItem("username")
    axios.post(`${constants.API_HOST}/api/feed`, {username: username})
      .then(res => {
        if (this.state.feedData.length === 0) {
          this.setState({ feedData: res.data, hideLoad: 'none' })
        }
    })
  }
  render() {
    verifyLogin()
    return (
      <>
        <Header homeColor={themeColor[localStorage.getItem('theme')].secondryColor} />
        <div className="feedBody">
          <div className="feed-card-holder">
            <LoadingScreen hide={this.state.hideLoad} />
            <LoadingScreen hide={this.state.hideLoad} />
            <LoadingScreen hide={this.state.hideLoad} />
            {getFeedCards(this.state.feedData)}
          </div>
        </div>
      </>
    );
  }
}

export default Feed;



function getFeedCards(feedData) {
  return(
    <>
      {
        feedData.map(item => {
          let oauthorsText = `-by @${item.mauthor}`
          if(item.oauthors.length > 0)
            oauthorsText += `, @${item.oauthors[0]}`
          if(item.oauthors.length > 1)
            oauthorsText += ` and ${item.oauthors.length - 1} others`
          return <FeedCard key={Math.random() } data={item} oauthors={oauthorsText}  />
        })
      }
    </>
  )
}
 