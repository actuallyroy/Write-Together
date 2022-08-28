import React, { Component } from 'react';
import './LeftRibbon.css'
import {TextAlignJustify, TextAlignLeft, TextAlignRight, TextAlignCenter} from 'phosphor-react'
import left from './left.svg'
import {constants} from '../constants'
var axios = require('axios')
let togBold = true, togItalic = true, togUnderline = true;
let leftRibbonHiden = false;

let arr

class LeftRibbon extends Component {
    render() {
        if(this.props.bold === 'gray'){
            togBold = false
        }else{
            togBold = true
        }

        if(this.props.italic === 'gray'){
            togItalic = false
        }else{
            togItalic = true
        }

        if(this.props.underline === 'gray'){
            togUnderline = false
        }else{
            togUnderline= true
        }

        arr = ['#EFEFEF', '#EFEFEF', '#EFEFEF', '#EFEFEF']
        arr[Number(this.props.alignm)] = "gray"


        return (
            <div
                className='left-ribbon' tabIndex={1}>
                {/*hide button*/}
                <div
                    onClick={() =>{
                        if(leftRibbonHiden){
                            document.querySelector(".left-ribbon").style.animation = "slideRight 500ms forwards ease-out"
                            leftRibbonHiden = false
                        }else{
                            document.querySelector(".left-ribbon").style.animation = "slideLeft 500ms forwards ease-out"
                            leftRibbonHiden = true
                        }
                    }}
                 className='hide-toggle-button'>
                    <img alt="Hide Button" src={left}/>
                </div>

                <div className='label'>Font</div>

                {/* Font face */}
                <select
                    className='font-selector'
                    id='fontSelector'
                    style={{fontFamily: this.props.fontName}}
                    value={this.props.fontName}
                    onChange={() =>{
                        let font = document.querySelector("#fontSelector").value;
                        document.execCommand("fontName", false, font)
                        this.props.setFontName(font)
                    }}
                >
                    {
                        getFonts()
                    }
                </select>

                {/* Font size */}

                <select
                    id='fontSizeSelector'
                    value={this.props.fontSize}
                    onChange={() =>{
                        let fontSize = Number(document.getElementById("fontSizeSelector").value)
                        document.execCommand('fontSize', false, fontSize)
                    }}
                    className='font-selector size-selector'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                </select>


                {/* Bold Italic Underline */}
                <div className='biu-cont'>
                    <button id='b'
                        onClick={() =>{                        
                            if(togBold){
                                document.getElementById("b").style.backgroundColor = "gray"
                                togBold = false
                                if(window.getSelection().toString().length > 0){
                                    togBold = Boolean(document.queryCommandValue("Bold"))
                                }
                                document.execCommand('bold', false, true)
                            }
                            else{
                                document.getElementById("b").style.backgroundColor = "#EFEFEF"
                                togBold = true
                                document.execCommand('bold', false, false)
                            }
                        }}
                        style={{backgroundColor: this.props.bold}} className='ic'><b>B</b>
                    </button>


                    <button id='i'
                        onClick={() =>{
                            if(togItalic){
                                document.getElementById("i").style.backgroundColor = "gray"
                                togItalic = false
                                document.execCommand('italic', false, true)
                            }
                            else{
                                document.getElementById("i").style.backgroundColor = "#EFEFEF"
                                togItalic = true
                                document.execCommand('italic', false, false)
                            }
                        }}
                        style={{backgroundColor: this.props.italic}} className='ic'><i>I</i>
                    </button>
                    <button id='u' onClick={()=>{
                        if(togUnderline){
                            document.getElementById("u").style.backgroundColor = "gray"
                            togUnderline = false
                            document.execCommand('underline', false, true)
                        }
                        else{
                            document.getElementById("u").style.backgroundColor = "#EFEFEF"
                            togUnderline = true
                            document.execCommand('underline', false, false)
                        }
                    }} style={{backgroundColor: this.props.underline}} className='ic'><u>U</u>
                    </button>
                </div>
                


                {/* Alignment Buttons */}
                <div className='biu-cont'>
                    <TextAlignLeft onClick={() => {
                        setAlignment(0)
                        setAlignMentColor(0)
                    }} className='ic ab' style={{backgroundColor: arr[0]}} size={40} color='#000' weight="thin" />
                    <TextAlignCenter id='alignCenterBtn' onClick={() => {
                        setAlignment(1)
                        setAlignMentColor(1)
                    }} className='ic ab' style={{backgroundColor: arr[1]}} size={40} color="#000" weight="thin" />
                    <TextAlignRight id='aignRightBtn' onClick={() => {
                        setAlignment(2)
                        setAlignMentColor(2)
                    }} className='ic ab' style={{backgroundColor: arr[2]}} size={40} color='#000' weight="thin" />
                    <TextAlignJustify id='alignFullBtn' onClick={() => {
                        setAlignment(3)
                        setAlignMentColor(3)
                    }} className='ic ab' style={{backgroundColor: arr[3]}} size={40} color='#000' weight="thin" />
                </div>

                {/* Colors */}
                <div className='biu-cont'>
                    <button onClick={() => setColor("#000")} style={{backgroundColor: defaultColors[0]}} className='icc'></button>
                    <button onClick={() => setColor("#fff")} style={{backgroundColor: defaultColors[1]}} className='icc'></button>
                    <button onClick={() => setColor("#f00")} style={{backgroundColor: defaultColors[2]}} className='icc'></button>
                    <button onClick={() => setColor("gold")} style={{backgroundColor: defaultColors[3]}} className='icc'></button>
                    <input id='colorPicker'
                        onClick={() =>{
                            let colorPicker = document.getElementById("colorPicker")
                            colorPicker.style.backgroundColor = colorPicker.value
                            setColor(colorPicker.value)
                        }}
                        onChange={() =>{
                            let colorPicker = document.getElementById("colorPicker")
                            colorPicker.style.backgroundColor = colorPicker.value
                            setColor(colorPicker.value)
                        }}
                    type='color' className='icc m'></input>
                </div>


                {/* Page section */}
                <div className='label pg'>Page</div>

                <div className='biu-cont'>
                    <button onClick={() => this.props.setPageColor("gray")} style={{backgroundColor: defaultPageColors[0]}} className='icc'></button>
                    <button onClick={() => this.props.setPageColor("#fff")} style={{backgroundColor: defaultPageColors[1]}} className='icc'></button>
                    <button onClick={() => this.props.setPageColor("#FFD58E")} style={{backgroundColor: defaultPageColors[2]}} className='icc'></button>
                    <button onClick={() => this.props.setPageColor("#b4b2d7")} style={{backgroundColor: defaultPageColors[3]}} className='icc'></button>
                    <input id='pgColorPicker'
                        defaultValue='#FFF2DB'
                        style={{backgroundColor: '#FFF2DB'}}
                        onClick={() =>{
                            let colorPicker = document.getElementById("pgColorPicker")
                            colorPicker.style.backgroundColor = colorPicker.value
                            this.props.setPageColor(colorPicker.value)
                        }}
                        onChange={() =>{
                            let colorPicker = document.getElementById("pgColorPicker")
                            colorPicker.style.backgroundColor = colorPicker.value
                            this.props.setPageColor(colorPicker.value)
                        }}
                    type='color' className='icc m'></input>
                </div>

                <div className='biu-cont'>
                    <div className='f-btn-cont'>
                        <button onClick={() =>{
                            let story = this.props.story
                            if(story.body){
                                let username = localStorage.getItem("username")
                                story.mauthor = username
                                let token = localStorage.getItem("token")
                                if(story.docID){
                                    axios.put(`${constants.API_HOST}/api/docs/update/${story.docID}`, story, {headers: {Authorization: token}})
                                    .then(res =>{
                                        console.log("here")
                                        document.querySelector(".f-btn.s").style.backgroundColor = "gray"
                                    })
                                    .catch(error => console.log(error))
                                }else{
                                    axios.put(`${constants.API_HOST}/api/docs/${username}`, story, {headers: {Authorization: token}})
                                    .then((res) =>{
                                        window.location.href = "/edit/" + res.data.docID
                                    })
                                    .catch((error) =>{
                                        console.log(error)
                                    })
                                }
                            }
                        }} className='f-btn s'>Save</button>
                        <button className='f-btn d'>Discard</button>
                    </div>
                </div>
            </div>
        ); 
    }
}


function setAlignMentColor(n){
    const ab = document.querySelectorAll(".ab");
    for (var i = 0; i < ab.length; i++){
        if(i === n){
            ab[i].style.backgroundColor = "gray"
        }else{
            ab[i].style.backgroundColor = "#EFEFEF"
        }
    }
}

let defaultPageColors = [
    'gray',
    'white',
    '#FFD58E',
    '#b4b2d7',

]

let defaultColors = [
    'black',
    'white',
    'red',
    'gold'
]

let fonts = [
    'Arial',
    'Times New Roman',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
    'Calibri',
    'Calibri Light',
    'Cascadia Code',
    'Mangal',
    'Ink Free',
    'Elephant',
    'Algerian',
    'Arial Black',
    'Century Gothic',
    'Broadway',
    'Forte',
    'Comic Sans MS',
    'Kristen ITC',
    'Impact',
    'Segoe UI',
    'Vladimir Script',
    'Jokerman',
    'Harrington',
    'Bradley Hand ITC',
    'Chiller',
    'Colonna MT',
    'Showcard Gothic',
    'Bookman Old Style',
    'Product Sans',
    'Lucida Calligraphy',
    'Open Sans',
    'Montserrat',
    'Roboto',
    'Playfair Display',
    'Inter',
    'Fira Code'
]

function getFonts() {
    fonts.sort()
    return(
        <>{
            fonts.map((font) =>{
               return <option style={{fontFamily: font}}>{font}</option>
            })
        }
        </>
    )
}


function setColor(color) {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
}

function setAlignment(alignment){
    document.execCommand('styleWithCSS', false, true);
    switch (alignment) {
        case 0:
            document.execCommand("justifyLeft", false, true)
            break;

        case 1:
            document.execCommand("justifyCenter", false, true)
            break;

        case 2:
            document.execCommand("justifyRight", false, true)
            break;

        case 3:
        document.execCommand("justifyFull", false, true)
            break;

        default:
            break;
    }
}




export default LeftRibbon;