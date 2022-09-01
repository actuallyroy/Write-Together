import { Fragment, useState } from "react"
import Header from "./components/Header"
import './Book.css'
import { constants } from "./constants";
import BooksLoading from "./components/BooksLoading";


var axios = require('axios')


function Books() {
  let [books, setBooks] = useState([])
  let username = window.localStorage.getItem("username")
  let token = window.localStorage.getItem("token")
  let [bookLoadHide, setBookLoadHide] = useState("block")
  axios.get(`${constants.API_HOST}/api/${username}/docs`, {headers: {Authorization: token}})
  .then(res => {
    if(books.length === 0){
      setBooks(res.data)
      setBookLoadHide("none")
    }else{
      
    }
  })
  return (
    <>
      <Header booksColor="#FF4040" />
      <div className="bkc">
        <BooksLoading style={{ display: bookLoadHide }} />
        <BooksLoading style={{ display: bookLoadHide }} />
        <BooksLoading style={{ display: bookLoadHide }} />
        {getBooks(books)}
      </div>
    </>
  );

}

function getBooks(books) {
  if(books.length > 0)
    return (
      <>
        {
          books.map(book => {
            let title = book.title
            if(book.title.length > 22)
              title = book.title.substring(0, 22) + "..."
            return (
              <Fragment key={Math.random()}>
                <div className="bk-body">
                  <div onClick={() => window.location.href = `edit/${book.docID}`} className="bk-title">
                  {title}
                  </div>
                  <div className="bk-cover">
                    <img alt="Book Cover" className="bk-cover-img" id={'img' + book.docID} src={book.coverpage}/>
                    <input id={"inpt" + book.docID} onChange={() => {
                      console.log(document.getElementById("inpt" + book.docID))
                      var file = document.getElementById("inpt" + book.docID).files[0];
                      let fileReader = new FileReader()
                      if(file.size/1000/1000 > 16)
                        alert("Pick image size less than 10 mb")
                      else
                        fileReader.readAsDataURL(file)


                      fileReader.onloadend = () =>{
                        let data = fileReader.result
                        let img = document.getElementById("img" + book.docID)
                        console.log(img, data)
                        img.src = data
                        book.coverpage = data
                      }
                    }} type="file" style={{position: 'relative', top: '-200px', height: '200px', cursor: 'pointer', opacity: 0}}/>
                  </div>
                  <div className="cb-cont">
                    <input className="chk" onChange={() => {
                      book.public = !book.public
                      document.getElementById(`saveDocBtn${book.docID}`).style.backgroundColor = '#F7A325'
                    }} defaultChecked={book.public} type="checkbox"/>
                    <span>Public</span>
                  </div>
                  <div className="cb-cont">
                    <input className="chk" onChange={() => {
                      book.branchable = !book.branchable
                      document.getElementById(`saveDocBtn${book.docID}`).style.backgroundColor = '#F7A325'
                    }} defaultChecked={book.branchable} type="checkbox"/>
                    <span>Branchable</span>
                  </div>
                  <div className="pb-btn-cont">
                    <button onClick={() => {
                      let token = window.localStorage.getItem("token")
                      document.getElementById(`saveDocBtn${book.docID}`).style.backgroundColor = 'gray'
                      axios.put(`${constants.API_HOST}/api/docs/update/${book.docID}`, book, { headers: { Authorization: token } })
                        .then(res => {
                      })
                    }} id={`saveDocBtn${book.docID}`} className="f-btn pb">Save</button>
                    <button onClick={() => {
                      let token = window.localStorage.getItem("token")
                      axios.put(`${constants.API_HOST}/api/docs/delete/${book.docID}`, book, { headers: { Authorization: token } })
                        .then(res => {
                          window.location.reload()
                      })
                    }} className="f-btn dc">Delete</button>
                  </div>
                </div>
              </Fragment>
            )
          })
        }
      </>
    )
}


export default Books