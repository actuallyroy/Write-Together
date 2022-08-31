import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { constants } from './constants'
import { UserList, Article } from 'phosphor-react'
import FeedCard from './components/FeedCard';
import Header from './components/Header'
import defautUser from './defaultUser.svg'
import Loading from './components/Loading'
import './Users.css'
const axios = require('axios')

function Users() {
  let params = useParams();
  let [userStories, setUserStories] = useState([])
  let [userData, setUserData] = useState({})
  let token = localStorage.getItem("token")
  axios.get(`${constants.API_HOST}/api/users/docs/${params.username}`, {headers: {Authorization: token}})
    .then(res => {
      if (userStories.length === 0)
        setUserStories(res.data)
    })
    .catch(error => console.log(error))
  axios.get(`${constants.API_HOST}/api/users/${params.username}`)
    .then(res => {
      if (Object.keys(userData).length === 0 && document.querySelector(".main-body"))
        setUserData(res.data)
    })
  
  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      document.querySelector(".loading-page").style.display = "none"
      document.getElementById("user-username").innerHTML = "@" + userData.username
    }
    if(userData.friends)
      document.getElementById("user-friendsN").innerHTML = "&nbsp;" + userData.friends.length
    if(userStories)
      document.getElementById("user-docsN").innerHTML = "&nbsp;" + userStories.length

  })
  return (
    <>
      <Header />
      <div className='loading-page'>
          <Loading size={200} />
      </div>
      <div className="main-body">
        <div className="username usernm">
          <img className="userProPic" src={defautUser} />
          <div>
            <span id='user-username'></span>
            <div className="usr-info">
              <span className="usr-info u">
                <UserList size={30} color="#FFBB54" weight="fill" />
                <span id="user-friendsN"></span>
              </span>
              <span className="usr-info">
                <Article size={30} color="#FFBB54" weight="fill" />
                <span id='user-docsN'></span>
              </span>
            </div>
          </div>
        </div>
        <div style={{marginTop: '20px',width: "250px", display: "flex", justifyContent: 'space-between'}}>
          <button className="f-btn pb">Request</button>
          <button className="f-btn pb bl">Block</button>
        </div>
        <div className='user-story-feed'>
          {getFeedCards(userStories)}
        </div>
      </div>
    </>
  );
}


function getFeedCards(feedData) {
  return (
    <>
      {feedData.map((item) => {
        let oauthorsText = `-by @${item.mauthor}`;
        if (item.oauthors.length > 0) oauthorsText += `, @${item.oauthors[0]}`;
        if (item.oauthors.length > 1)
          oauthorsText += ` and ${item.oauthors.length - 1} others`;
        return <FeedCard key={Math.random()} data={item} oauthors={oauthorsText} />;
      })}
    </>
  );
}


export default Users