import "./Home.css"
import Logo from "./components/Logo";
import {House, Users, Books} from 'phosphor-react';
import defaultUser from './defaultUser.svg'
import LeftRibbon from "./components/LeftRibbon";
import { useState } from "react";
let selectionRange = null

//variables for pinch zoom detection
let distNew, distOld
let scl, tp, lef
let tpNew, tpOld, lefNew, lefOld


function Home(){
    let [bold, setBold] = useState("#EFEFEF")
    let [italic, setItalic] = useState("#EFEFEF")
    let [underline, setUnderline] = useState("#EFEFEF")
    let [fontName, setFontName] = useState("Arial")
    let [pageColor, setPageColor] = useState("#FFD58E")
    return (
        <>
            <div className="main-container">
                <div className="header">
                    <Logo th={1} size={85}/>
                    <div className="icons-container">  
                        <House size={60} color="#ffffff" weight="fill" />
                        <Users size={60} color="#ffffff" weight="fill" />
                        <Books size={60} color="#ffffff" weight="fill" />
                        <>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M58.9442 52.8904L48.1442 42.0904C51.9647 37.5419 53.8817 31.694 53.4954 25.7664C53.1091 19.8388 50.4493 14.2892 46.0708 10.275C41.6922 6.26084 35.933 4.092 29.9942 4.22085C24.0555 4.3497 18.3957 6.76629 14.1954 10.9666C9.99508 15.1669 7.57849 20.8267 7.44964 26.7654C7.32079 32.7042 9.48964 38.4634 13.5038 42.842C17.518 47.2205 23.0676 49.8803 28.9952 50.2666C34.9228 50.6529 40.7707 48.7359 45.3192 44.9154L56.1192 55.7404C56.5031 56.1074 57.0131 56.3132 57.5442 56.3154C57.9408 56.3148 58.3282 56.1962 58.6573 55.9748C58.9863 55.7535 59.2421 55.4393 59.3922 55.0722C59.5422 54.7051 59.5798 54.3016 59.5 53.9132C59.4202 53.5247 59.2268 53.1687 58.9442 52.8904Z" fill="white"/>
                        </svg>
                        </>
                    </div>
                    <div className="profile-pic">
                        <img alt="Profile " height={55} src={defaultUser}/>
                    </div>
                </div>
                <div className="body">
                    <LeftRibbon bold={bold} italic={italic} underline={underline} fontName={fontName} setFontName={setFontName} setPageColor={setPageColor} />
                    

                    {/* Rich Text Editor */}
                    <div
                        className="editor-textarea" contentEditable="true"
                        id="textEditor"

                        style={{
                            backgroundColor: pageColor
                        }}

                        onKeyDown={(e) =>{
                            if(e.key === "Tab"){
                                e.preventDefault()
                                        // now insert four non-breaking spaces for the tab key
                                var sel = window.getSelection();
                                var range = sel.getRangeAt(0);
                                var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
                                range.insertNode(tabNode);

                                range.setStartAfter(tabNode);
                                range.setEndAfter(tabNode); 
                                sel.removeAllRanges();
                                sel.addRange(range);
                            }
                        }}

                        // Save selection on cursor move and detect bold, italic or underline
                        onSelect={() =>{
                          selectionRange = saveSelection() 
                            if(document.queryCommandValue("Bold") === 'true'){
                                setBold("gray")
                            }else{
                                setBold("#EFEFEF")
                            }
                            
                            if(document.queryCommandValue("Italic") === 'true'){
                                setItalic("gray")
                            }else{
                                setItalic("#EFEFEF")
                            }

                            if(document.queryCommandValue("Underline") === 'true'){
                                setUnderline("gray")
                            }else{
                                setUnderline("#EFEFEF")
                            }

                            let fontNameLcl = document.queryCommandValue("fontName").split(",")[0]
                            if(fontNameLcl.indexOf('"') !== -1){
                                fontNameLcl = fontNameLcl.substring(1, fontNameLcl.length-1)
                            }
                            setFontName(fontNameLcl)
                        }}

                        //Restore selection on focus out
                        onBlur={()=>{
                            restoreSelection(selectionRange)
                            document.getElementById("textEditor").focus()
                        }}
                        onTouchStart = {(e) =>{
                            let x1 = e.touches[0].screenX
                            let y1 = e.touches[0].screenY
                            let x2
                            let y2
                            if(e.touches[1]){
                                x2 = e.touches[1].screenX
                                y2 = e.touches[1].screenY
                            }

                            distOld = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
                            tpOld = y1
                            lefOld = x1
                        }}

                        onTouchMove = {(e) =>{
                            let textEditor = document.getElementById("textEditor")
                            scl = Number(textEditor.style.scale)
                            tp = Number(textEditor.style.top.substring(0, textEditor.style.top.length - 2))
                            lef = Number(textEditor.style.left.substring(0, textEditor.style.left.length - 2))
                            if(scl === 0)
                                scl = 1
                            let x1 = e.touches[0].screenX
                            let y1 = e.touches[0].screenY
                            let x2
                            let y2
                            if(e.touches[1]){
                                x2 = e.touches[1].screenX
                                y2 = e.touches[1].screenY
                            }

                            distNew = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
                            tpNew = y1
                            lefNew = x1
                            console.log(tp, tpOld, tpNew);
                            textEditor.style.top = tp + (tpNew - tpOld) + 'px'
                            textEditor.style.left = lef + (lefNew - lefOld) + 'px'
                            if(e.touches.length === 2)
                                textEditor.style.scale = scl + (distNew - distOld)/(500)
                            distOld = distNew
                            tpOld = tpNew
                            lefOld = lefNew
                        }}

                        onWheel = {(e) => {
                            e.preventDefault()
                            if(e.ctrlKey){

                            }
                        }}

                        
                    ></div>

                </div>
            </div>
        </>
    )
}
export default Home;
function saveSelection() {
    if (window.getSelection) {
        let sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}