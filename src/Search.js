import Header from "./components/Header";
import './Search.css'
import defaultUser from './defaultUser.svg'
import { Link } from 'react-router-dom'
import {UserList} from 'phosphor-react'
import { useState } from "react";
import axios from "axios";
import { constants } from "./constants";

function Search() {
  let [searchResult, setSearchResult] = useState([[], []])
  
  return (
    <>
      <Header searchColor="#FF4040" />
      <div className="main-body">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            className="search-input"
            placeholder="Type something..."
            id="searchInput"
            onInput={() => {
              let query = document.getElementById("searchInput").value;
              let t = document.querySelector(".search-result .user");
              let s = document.querySelector(".search-result .stories");
              let u = document.getElementById("lod");
              let noResFT = document.getElementById("noResFoundTxt")
              u.style.display = "flex";
              if (query !== "") {
                axios.get(`${constants.API_HOST}/api/search/${query}`)
                  .then((res) => {
                    console.log(res.data[0].length > 0 || res.data[1].length > 0)
                    if (res.data[0].length > 0 || res.data[1].length > 0) {
                      noResFT.style.display = 'none'
                    } else {
                      noResFT.style.display = "block";
                    }
                    setSearchResult(res.data);
                    if (res.data[0].length > 0) {
                      t.style.display = "block";
                    } else {
                      t.style.display = "none";
                    }
                    console.log(res.data[1].length)
                    if (res.data[1].length > 0) {
                      s.style.display = "block";
                    } else {
                      s.style.display = "none";
                    }
                    u.style.display = "none";
                  });
              } else {
                setSearchResult([[], []]);
                t.style.display = "none";
                s.style.display = 'none'
              }
            }}
          ></input>
          <svg
            className="icn searchBtn"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58.9442 52.8904L48.1442 42.0904C51.9647 37.5419 53.8817 31.694 53.4954 25.7664C53.1091 19.8388 50.4493 14.2892 46.0708 10.275C41.6922 6.26084 35.933 4.092 29.9942 4.22085C24.0555 4.3497 18.3957 6.76629 14.1954 10.9666C9.99508 15.1669 7.57849 20.8267 7.44964 26.7654C7.32079 32.7042 9.48964 38.4634 13.5038 42.842C17.518 47.2205 23.0676 49.8803 28.9952 50.2666C34.9228 50.6529 40.7707 48.7359 45.3192 44.9154L56.1192 55.7404C56.5031 56.1074 57.0131 56.3132 57.5442 56.3154C57.9408 56.3148 58.3282 56.1962 58.6573 55.9748C58.9863 55.7535 59.2421 55.4393 59.3922 55.0722C59.5422 54.7051 59.5798 54.3016 59.5 53.9132C59.4202 53.5247 59.2268 53.1687 58.9442 52.8904Z"
              fill="#333"
            />
          </svg>
        </div>
        <div className="search-result">
          <div style={{display: 'none'}} id="noResFoundTxt" className="lbl">No Result Found</div>
          <div className="user">
            <div className="lbl">People</div>
            <div style={{ display: "none" }} className="user-holder" id="lod">
              <div className="tmpl p" />
              <div className="tmpl lcu"></div>
            </div>
            {getUserResults(searchResult[0])}
          </div>
          <div className="stories">
            <div className="lbl">Stories</div>
            {getStoriesResult(searchResult[1])}
          </div>
        </div>
      </div>
    </>
  );
}

let searchData = [
  [
    {
      username: "actuallyroy",
      friends: ["a"],
    },
    {
      username: "actuallyroy1",
      friends: [],
    },
  ],
  [
    {
      title: "Your Cat™️ Customer Service",
      mauthor: "actuallyroy",
      public: true,
    },
    {
      title: "fdsafdsa",
      mauthor: "actuallyroy1",
      public: true,
    },
  ],
];

function getUserResults(users) {
  return (
    <>
      {
        users.map(user => {
          return (
            <div key={Math.random()} className="user-holder">
              <img className="userProPic ppic" src={defaultUser} />
              <div className="username-placeholder">
                <Link className="icn s" to={`/users/${user.username}`}>
                 @{user.username}
                </Link>
              </div>
              <div className="usr-info u">
                <UserList size={30} color="#FFBB54" weight="fill" />
                <span id="user-friendsN">&nbsp;{user.friends.length }</span>
              </div>
            </div>
          );
        })
      }
    </>
  )
}


function getStoriesResult(stories) {
  return (
    <>
      {
        stories.map(story => {
          console.log(story.coverpage)
          return (
            <div key={Math.random()} className="user-holder">
              <img alt="" className="s-r-img" src={story.coverpage} />
              <div className="s-r-title">
                <Link className="icn s" to={`/read/${story.docID}`}>
                  {story.title}
                </Link>
              </div>
              <div className="username-placeholder">
                <Link className="icn s" to={`/users/${story.mauthor}`}>
                  @{story.mauthor}
                </Link>
              </div>
            </div>
          );
        })
      }
    </>
  )
}


export default Search;