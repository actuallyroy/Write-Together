const constants = {
  API_HOST: "https://write-together-api.herokuapp.com",
};

function verifyLogin() {
  let token = window.localStorage.getItem("token")
  console.log(token)
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