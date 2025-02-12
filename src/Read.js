import { useState } from "react"
import { useParams } from "react-router-dom"
import Header from './components/Header'
import { constants } from './constants'
import Loading from './components/Loading'
let axios = require('axios')

function Read() {
  let [story, setStory] = useState({})
  let params = useParams()
  axios.get(`${constants.API_HOST}/api/docs/get/${params.documentId}`, {headers: {Authorization: window.localStorage.getItem("token"), "ngrok-skip-browser-warning": true}})
  .then(res => {
    if(Object.keys(story).length === 0){
      setStory(res.data)
      document.getElementById("story-body").innerHTML = "&zwnj;&zwnj;&zwnj;&zwnj;&zwnj;<div style='font-size: 30px; font-weight: bold; padding: 5px; color: white; text-shadow: 0 0 6px rgb(0, 0, 0, 0.2); background-color: orange; border-radius: 5px'>" + res.data.title + "</div><br>" + res.data.body
      document.querySelector('.loading-page').style.display = 'none'
    }
  })

  function disableselect(e) {
    return false
  }
  
  function reEnable() {
    return true
  }
  document.onselectstart = new Function ("return false")
  
  if (window.sidebar) {
    document.onmousedown = disableselect
    document.onClick = reEnable
  }
  return (
    <>
      <Header />
      <div className="loading-page">
        <Loading size={200} />
      </div>
      <div style={{ overflow: "scroll", height: "calc(100vh - 50px)" }}>
        <div
          id="story-body"
          style={{ backgroundColor: story.pageColor }}
          className="editor-textarea"
        >
          ͞͞͞͞͞͞
        </div>
      </div>
    </>
  );

}

export default Read