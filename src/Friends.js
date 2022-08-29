import Header from "./components/Header"
import "./Friends.css"
import defaultUser from './defaultUser.svg'
import {CheckCircle, XCircle} from 'phosphor-react'
import { useState } from "react"
import {constants} from './constants'
let axios = require('axios')


function Friends() {
  let [friends, setFriends] = useState([])
  let [friendRequests, setFriendRequests] = useState([])
  let [friendRequestsSent, setFriendRequestsSent] = useState([])
  let username = window.localStorage.getItem("username")
  let token = window.localStorage.getItem("token")
  axios.get(`${constants.API_HOST}/api/${username}/friends`, {headers: {Authorization: token}})
  .then(res => {
    setFriends(res.data.friends)
    setFriendRequestsSent(res.data.friendRequestsSent)
    setFriendRequests(res.data.friendRequests)
  })
  return(
    <>
      <Header friendColor="#FF4040" />
      <div className="main-body">
        <div className="frc">
          {
            getFriendRequestsCard(friendRequests)
          }
        </div>
        <div className="frc">
          {
            getFriendRequestsSentCard(friendRequestsSent)
          }
        </div>
        <div className="frc">
          {
            getFriendsList(friends)
          }
        </div>
      </div>
    </>
  )
}


function getFriendRequestsCard(friendRequests){
  if(friendRequests.length > 0)
    return (
      <>  <div className="label l">Friend Requests</div>
        {
          
          friendRequests.map(item => {
            return(
              <div className="f-cont">
                <img alt="" className="f-img" src={defaultUser}/>
                <div className="f-list">@{item}</div>
                <CheckCircle onClick={() => {
                  let username = window.localStorage.getItem("username")
                  let token = window.localStorage.getItem("token")
                  axios.put(`${constants.API_HOST}/api/accept/${item}`, {username: username}, {headers: {Authorization: token}})
                }} className="fr-b" size={30} color="green" weight="fill" />
                <XCircle onClick={() => {
                  let username = window.localStorage.getItem("username")
                  let token = window.localStorage.getItem("token")
                  axios.put(`${constants.API_HOST}/api/remove/${item}`, {username: username}, {headers: {Authorization: token}})
                }} className="fr-b" size={30} color="#FF4040" weight="bold" />
              </div>
            )
          })
        }
      </>
    )
  else
    return <></>
} 
function getFriendRequestsSentCard(friendRequestsSent){
  if(friendRequestsSent.length > 0)
    return (
      <>  <div className="label l">Requests Sent</div>
        {
          friendRequestsSent.map(item => {
            return(
              <div className="f-cont">
                <img alt="" className="f-img" src={defaultUser}/>
                <div className="f-list">@{item}</div>
                <XCircle onClick={() => {
                  let username = window.localStorage.getItem("username")
                  let token = window.localStorage.getItem("token")
                  axios.put(`${constants.API_HOST}/api/removerequest/${item}`, {username: username}, {headers: {Authorization: token}})
                }} className="fr-b" size={30} color="#FF4040" weight="bold"/>
              </div>
            )
          })
        }
      </>
    )
  else
    return <></>
}

function getFriendsList(friends) {
  if(friends.length > 0)
    return (
      <>
        <div className="label l">Friends  </div>
        {
          friends.map(item => {
            return(
              <div className="f-cont">
                <img alt="" className="f-img" src={defaultUser}/>
                <div className="f-list">@{item}</div>
              </div>
            )
          })
        }
      </>
    )
  else
    return <></>
}


export default Friends

