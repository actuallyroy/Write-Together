import React, { Component } from 'react';
import './LeftRibbon.css'
import {TextAlignJustify, TextAlignLeft, TextAlignRight, TextAlignCenter} from 'phosphor-react'
import left from './left.svg'
let togBold = true, togItalic = true, togUnderline = true, alignment = 0;
let leftRibbonHiden = false;

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



        //return

        return (
            <div className='left-ribbon'>
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
                    onChange={() =>{
                        let fontSize = Number(document.getElementById("fontSizeSelector").value)
                        document.execCommand('fontSize', false, fontSize)
                        console.log(document.queryCommandValue("fontSize"));
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
                    <span id='b' onClick={() =>{
                        if(togBold){
                            document.getElementById("b").style.backgroundColor = "gray"
                            togBold = false
                            if(window.getSelection().toString().length > 0){
                                console.log("here");
                                togBold = Boolean(document.queryCommandValue("Bold"))
                            }
                            document.execCommand('bold', false, true)
                        }
                        else{
                            document.getElementById("b").style.backgroundColor = "#EFEFEF"
                            togBold = true
                            document.execCommand('bold', false, false)
                        }
                    }} style={{backgroundColor: this.props.bold}} className='ic'><b>B</b></span>
                    <span id='i' onClick={() =>{
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
                    }} style={{backgroundColor: this.props.italic}} className='ic'><i>I</i></span>
                    <span id='u' onClick={()=>{
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
                    }} style={{backgroundColor: this.props.underline}} className='ic'><u>U</u></span>
                </div>
                


                {/* Alignment Buttons */}
                <div className='biu-cont'>
                    <TextAlignLeft id='alignLeftBtn' onClick={() => {
                        setAlignment(0)
                        let alignLeftBtn = document.getElementById("alignLeftBtn")
                        if(alignment === 0){
                            alignLeftBtn.style.backgroundColor = 'gray'
                        }else{
                            alignLeftBtn.style.backgroundColor = '#EFEFEF'
                        }
                    }} className='ic' size={40} color="#000" weight="thin" />
                    <TextAlignCenter onClick={() => setAlignment(1)} className='ic' size={40} color="#000" weight="thin" />
                    <TextAlignRight onClick={() => setAlignment(2)} className='ic' size={40} color="#000" weight="thin" />
                    <TextAlignJustify onClick={() => setAlignment(3)} className='ic' size={40} color="#000" weight="thin" />
                </div>

                {/* Colors */}
                <div className='biu-cont'>
                    <span onClick={() => setColor("#000")} style={{backgroundColor: defaultColors[0]}} className='icc'></span>
                    <span onClick={() => setColor("#fff")} style={{backgroundColor: defaultColors[1]}} className='icc'></span>
                    <span onClick={() => setColor("#f00")} style={{backgroundColor: defaultColors[2]}} className='icc'></span>
                    <span onClick={() => setColor("gold")} style={{backgroundColor: defaultColors[3]}} className='icc'></span>
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
                    <span onClick={() => this.props.setPageColor("gray")} style={{backgroundColor: defaultPageColors[0]}} className='icc'></span>
                    <span onClick={() => this.props.setPageColor("#fff")} style={{backgroundColor: defaultPageColors[1]}} className='icc'></span>
                    <span onClick={() => this.props.setPageColor("#FFD58E")} style={{backgroundColor: defaultPageColors[2]}} className='icc'></span>
                    <span onClick={() => this.props.setPageColor("#b4b2d7")} style={{backgroundColor: defaultPageColors[3]}} className='icc'></span>
                    <input id='pgColorPicker'
                        defaultValue='#FFF2DB'
                        style={{backgroundColor: '#FFF2DB'}}
                        onClick={() =>{
                            let colorPicker = document.getElementById("pgColorPicker")
                            colorPicker.style.backgroundColor = colorPicker.value
                            this.props.setPageColor(colorPicker.value)
                            document.style.caretColor = colorPicker.value
                        }}
                        onChange={() =>{
                            let colorPicker = document.getElementById("pgColorPicker")
                            colorPicker.style.backgroundColor = colorPicker.value
                            this.props.setPageColor(colorPicker.value)
                        }}
                    type='color' className='icc m'></input>
                </div>
            </div>
        ); 
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
    'Playfair Display'
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