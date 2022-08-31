const axios = require('axios')

const constants = {
  API_HOST: "https://write-together-api.herokuapp.com"
  // API_HOST: "http://localhost:3000",
};

const themeColor = {
  light: {
    primaryColor: "#F7A325 ",
    secondryColor: "#ff4040",
    boxColors: "#FFE9C9",
    heartColor: "red",
    userNameTextColor: "#D17100",
    pageBgColor: "white",
    textColor: "black",
    feedCardHead: "#FFECD1",
  },
  dark: {
    primaryColor: "#331400",
    secondryColor: "#ffcccc",
    boxColors: "#FFE9C9",
    heartColor: "red",
    userNameTextColor: "#D17100",
    pageBgColor: "white",
    textColor: "black",
    feedCardHead: "#FFECD1",
  },
};

if (!localStorage.getItem('theme') || localStorage.getItem("theme") === undefined) {
  localStorage.setItem("theme", 'light')
}


function changeTheme(theme) {
  window.localStorage.setItem("theme", theme)
}


function verifyLogin() {
  let token = window.localStorage.getItem("token")
  axios.get(`${constants.API_HOST}/api/verify`, { headers: { Authorization: token } })
    .then((res) => {
      if (res.data !== 'Verified') {
        window.location.href = "/login"
      }
    })
    .catch((error) => {
    window.location.href = '/login'
  })

  // if (token) {
  //   let l = token.length
  //   let tkn = token.substring(l-8, l)
  //   let time = parseInt(tkn, 36)
  //   if (time < new Date().getTime()) {
  //     window.location.href = "/login";
  //   }
  // } else {
  //   window.location.href = "/login"
  // }
}

export {constants, themeColor, verifyLogin, changeTheme}