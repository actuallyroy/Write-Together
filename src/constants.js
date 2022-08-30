const constants = {
  API_HOST: "https://write-together-api.herokuapp.com",
  primaryColor: "#F7A325 ",
  secondryColor: "#ff4040",
  boxColors: '#FFE9C9',
  heartColor: "red",
  userNameTextColor: '#D17100',
  grayD: "#ddd",
  grayF8: "#f8f8f8",
  grayB6: "#b6b6b6",
  grayF0: '#f0f0f0',
  white: 'white',
  black: 'black'
};

function verifyLogin() {
  let token = window.localStorage.getItem("token")
  if (token) {
    let l = token.length
    let tkn = token.substring(l-8, l)
    let time = parseInt(tkn, 36)
    if (time < new Date().getTime()) {
      window.location.href = "/login";
    }
  } else {
    window.location.href = "/login"
  }
}
export {constants, verifyLogin}