import "./Home.css"
import LeftRibbon from "./components/LeftRibbon";
import { useEffect, useState } from "react";
import Header from "./components/Header"
import { useParams } from 'react-router-dom'
import { constants, verifyLogin } from './constants'
import ContextMenu from "./components/ContextMenu";
import Loading from "./components/Loading";

const axios = require('axios')

//variable to check if the title input has focus and disable auto focus for document editor

let titleHasFocus = false

//variables for pinch zoom detection
let distNew, distOld
let scl, tp, lef
let tpNew, tpOld, lefNew, lefOld
let tempStory = {}


function Home() { 
    //verify login and redirect to login page if varification fails
    verifyLogin();

    //variables for editor
    let [bold, setBold] = useState("#EFEFEF")
    let [italic, setItalic] = useState("#EFEFEF")
    let [underline, setUnderline] = useState("#EFEFEF")
    let [fontName, setFontName] = useState("Arial")
    let [pageColor, setPageColor] = useState("#FFD58E")
    let [fontSize, setFontSize] = useState(4)
    let [alignm, setAlignm] = useState(0)
    let [story, setStory] = useState({})
    let [posX, setPosX] = useState(0)
    let [posY, setPosY] = useState(0);
    let [showCM, setShowCM] = useState("none")
    let [loadingDone, setLoadingDone] = useState(false)
    
    //variables for document rendering
    let params = useParams()
    let docID = params.documentId

    if (docID) {
        let token = window.localStorage.getItem("token")
        axios.get(`${constants.API_HOST}/api/docs/${docID}`, {headers: {Authorization: token, "ngrok-skip-browser-warning": true}})
            .then(res => {
            
                if (res.data.body && Object.keys(tempStory).length === 1) {
                    tempStory = res.data
                    document.getElementById("textEditor").innerHTML = res.data.body
                    document.getElementById("title").value = res.data.title
                    if (res.data.pageColor)
                        document.getElementById("textEditor").style.backgroundColor = res.data.pageColor
                }
                if (!loadingDone) setLoadingDone(true);
            })
            .catch(error => {
                document.querySelector(".")
                let status = error.response.status
                if(status === 404){
                    window.location.href = "/edit"
                }else if (status === 401){
                    window.location.href = "/login"
                }else if(status === 403)    
                    window.location.href = "/branch/" + docID
                if (!loadingDone) setLoadingDone(true);
            })
    } else {
        if(!loadingDone)
            setLoadingDone(true)
    }
    tempStory['pageColor'] = pageColor
    useEffect(() => {
        if (loadingDone)
            document.querySelector(".loading-page").style.display = 'none'
    })
    return (
      <>
        {" "}
        <ContextMenu show={showCM} top={posY} left={posX} />
        <div className="main-container">
          <Header />
          <div className="loading-page">
            <Loading size={200} />
          </div>
          <div className="body">
            <div className="title">
              <input
                onClick={() => {
                  titleHasFocus = true;
                }}
                onBlur={() => {
                  tempStory.title = document.getElementById("title").value;
                  setStory(tempStory);
                }}
                id="title"
                placeholder="Untitled"
              />
            </div>
            <LeftRibbon
              bold={bold}
              italic={italic}
              underline={underline}
              fontName={fontName}
              setFontName={setFontName}
              setPageColor={setPageColor}
              fontSize={fontSize}
              alignm={alignm}
              story={story}
            />

            {/* Rich Text Editor */}
            <div
              className="editor-textarea"
              contentEditable="true"
              tabIndex={2}
              id="textEditor"
              style={{
                backgroundColor: pageColor,
              }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  // now insert four non-breaking spaces for the tab key
                  var sel = window.getSelection();
                  var range = sel.getRangeAt(0);
                  var tabNode = document.createTextNode(
                    "\u00a0\u00a0\u00a0\u00a0"
                  );
                  range.insertNode(tabNode);

                  range.setStartAfter(tabNode);
                  range.setEndAfter(tabNode);
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
              }}
              onClick={() => setShowCM("none")}
              //detect bold, italic or underline
              onSelect={() => {
                // setShowCM("none");
                document.querySelector(".f-btn.s").style.backgroundColor =
                  "#F7A325";
                titleHasFocus = false;
                if (document.queryCommandValue("Bold") === "true") {
                  setBold("gray");
                } else {
                  setBold("#EFEFEF");
                }

                if (document.queryCommandValue("Italic") === "true") {
                  setItalic("gray");
                } else {
                  setItalic("#EFEFEF");
                }

                if (document.queryCommandValue("Underline") === "true") {
                  setUnderline("gray");
                } else {
                  setUnderline("#EFEFEF");
                }

                setFontSize(document.queryCommandValue("fontSize"));

                let fontNameLcl = document
                  .queryCommandValue("fontName")
                  .split(",")[0];
                if (fontNameLcl.indexOf('"') !== -1) {
                  fontNameLcl = fontNameLcl.substring(
                    1,
                    fontNameLcl.length - 1
                  );
                }
                setFontName(fontNameLcl);
                setAlignm(getAlignment());
                tempStory.body =
                  document.getElementById("textEditor").innerHTML;
                setStory(tempStory);
              }}
              //get focus back on focus out
              onBlur={() => {
                if (!titleHasFocus)
                  document.getElementById("textEditor").focus();
              }}
              onTouchStart={(e) => {
                let x1 = e.touches[0].screenX;
                let y1 = e.touches[0].screenY;
                let x2;
                let y2;
                if (e.touches[1]) {
                  x2 = e.touches[1].screenX;
                  y2 = e.touches[1].screenY;
                }

                distOld = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                tpOld = y1;
                lefOld = x1;
              }}
              onTouchMove={(e) => {
                let textEditor = document.getElementById("textEditor");
                scl = Number(textEditor.style.scale);
                tp = Number(
                  textEditor.style.top.substring(
                    0,
                    textEditor.style.top.length - 2
                  )
                );
                lef = Number(
                  textEditor.style.left.substring(
                    0,
                    textEditor.style.left.length - 2
                  )
                );
                if (lef === 0) {
                  lef = window.innerWidth / 2 - 4.13386 * calcScreenDPI();
                }
                if (scl === 0) scl = 1;
                let x1 = e.touches[0].screenX;
                let y1 = e.touches[0].screenY;
                let x2;
                let y2;
                if (e.touches[1]) {
                  x2 = e.touches[1].screenX;
                  y2 = e.touches[1].screenY;
                }

                distNew = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                tpNew = y1;
                lefNew = x1;
                textEditor.style.top = tp + (tpNew - tpOld) + "px";
                textEditor.style.left = lef + (lefNew - lefOld) + "px";
                if (e.touches.length === 2)
                  textEditor.style.scale = scl + (distNew - distOld) / 500;
                distOld = distNew;
                tpOld = tpNew;
                lefOld = lefNew;
              }}
              onWheel={(e) => {
                e.preventDefault();
                if (e.ctrlKey) {
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setPosX(e.clientX);
                setPosY(e.clientY - 17);
                setShowCM("fade-in 500ms");
              }}
            ></div>
          </div>
        </div>
      </>
    );
}
export default Home;

function getAlignment() {
    if(document.queryCommandValue("justifyLeft") === 'true'){
        return 0
    }
    if(document.queryCommandValue("justifyCenter") === 'true'){
        return 1
    }
    if(document.queryCommandValue("justifyRight") === 'true'){
        return 2
    }
    if(document.queryCommandValue("justifyFull") === 'true'){
        return 3
    }
}

function calcScreenDPI() {
    const el = document.createElement('div');
    el.style = 'width: 1in;'
    document.body.appendChild(el);
    const dpi = el.offsetWidth;
    document.body.removeChild(el);

    return dpi;
}