import React, { Component } from 'react';
import '../Home.css'
import Logo from "./Logo";
import {House, Users, Books, GearSix, Power} from 'phosphor-react';
import defaultUser from '../defaultUser.svg'
import { Link } from 'react-router-dom'
import { verifyLogin, changeTheme, themeColor } from '../constants'

let arr = ['block', 'none']
let theme = localStorage.getItem('theme')

class Header extends Component {
  render() {
    if (theme === 'dark') {
      arr = ['none', 'block']
    } else {
      arr = ["block", "none"];
    }
    verifyLogin()
    let homeColor = "#ffffff", friendColor = "#ffffff", booksColor = '#ffffff', searchColor = '#ffffff'
    if(this.props.homeColor) homeColor = this.props.homeColor
    if(this.props.friendColor) friendColor = this.props.friendColor
    if(this.props.booksColor) booksColor = this.props.booksColor
    if(this.props.searchColor) searchColor = this.props.searchColor
    return (
      <>
        <div
          style={{
            backgroundColor: themeColor[theme].primaryColor,
          }}
          className="header"
        >
          <Logo th={0} size={85} />
          <div className="icons-container">
            <Link to={"/feed"}>
              <House
                className="icn b"
                size={60}
                color={homeColor}
                weight="fill"
              />
            </Link>
            <Link to={"/friends"}>
              <Users
                className="icn b"
                size={60}
                color={friendColor}
                weight="fill"
              />
            </Link>
            <Link to={"/books"}>
              <Books
                className="icn b"
                size={60}
                color={booksColor}
                weight="fill"
              />
            </Link>
            <Link to={"/search"}>
              <svg
                className="icn b"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M58.9442 52.8904L48.1442 42.0904C51.9647 37.5419 53.8817 31.694 53.4954 25.7664C53.1091 19.8388 50.4493 14.2892 46.0708 10.275C41.6922 6.26084 35.933 4.092 29.9942 4.22085C24.0555 4.3497 18.3957 6.76629 14.1954 10.9666C9.99508 15.1669 7.57849 20.8267 7.44964 26.7654C7.32079 32.7042 9.48964 38.4634 13.5038 42.842C17.518 47.2205 23.0676 49.8803 28.9952 50.2666C34.9228 50.6529 40.7707 48.7359 45.3192 44.9154L56.1192 55.7404C56.5031 56.1074 57.0131 56.3132 57.5442 56.3154C57.9408 56.3148 58.3282 56.1962 58.6573 55.9748C58.9863 55.7535 59.2421 55.4393 59.3922 55.0722C59.5422 54.7051 59.5798 54.3016 59.5 53.9132C59.4202 53.5247 59.2268 53.1687 58.9442 52.8904Z"
                  fill={searchColor}
                />
              </svg>
            </Link>
          </div>

          <div className="profile-pic">
            <svg
              className="icn nw"
              onClick={() => {
                window.location.href = "/edit";
              }}
              width="51"
              height="46"
              viewBox="0 0 51 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.8898 4.12239C40.8642 5.15135 38.9132 6.26151 37.0451 7.44807C26.4472 14.1737 21.1515 21.675 17.8928 26.4038C14.4412 31.4185 11.7361 36.7062 9.82695 42.1703C8.93516 42.6974 8.17269 43.3384 7.57411 44.0642C7.23441 44.4778 6.94957 44.9157 6.72374 45.3715C6.10768 44.2999 5.87886 43.1243 6.06058 41.9644L11.6863 32.5811C11.4227 31.3659 11.3439 30.1321 11.4515 28.9034C11.5138 27.778 11.773 26.6638 12.2226 25.5897C12.6035 24.7081 13.1189 23.8628 13.7583 23.0709C13.7613 23.7395 13.8388 24.4066 13.99 25.0654C14.0693 25.4197 14.1645 25.7501 14.2692 26.0566C14.2851 25.2086 14.3762 24.3623 14.5421 23.5234C14.8716 21.9171 15.4521 20.3459 16.2714 18.8426C17.3678 16.7203 18.7737 14.6967 20.4629 12.8089C22.1478 10.848 23.2583 9.9597 23.912 9.47605C24.729 8.86416 25.6108 8.30363 26.5487 7.80004C26.1276 8.49505 25.8556 9.23616 25.7428 9.99561C25.6741 10.4543 25.6645 10.917 25.7142 11.3771C26.4229 10.3315 27.2455 9.332 28.1733 8.38904C29.5028 7.03386 35.0048 1.60597 44.5461 0.28671C46.6748 -0.0039601 48.8462 -0.0740416 51 0.0784057C50.4595 0.511297 49.9571 0.970386 49.496 1.45274C47.643 3.41128 47.7128 4.50308 45.7487 7.2709C45.1376 8.17268 44.4118 9.02748 43.5815 9.82322C42.8457 10.5272 42.0105 11.1687 41.0907 11.7363C39.6216 12.6293 38.7712 12.7993 36.0297 13.9318C35.2301 14.2623 34.0593 14.7579 32.6632 15.4139C33.6912 15.2224 34.7795 14.9877 35.9187 14.6956C37.7493 14.2282 39.532 13.66 41.2525 12.9957C40.8559 13.6374 40.2784 14.5185 39.501 15.536C37.3751 18.3254 35.5252 20.7484 32.1237 22.1395C31.0738 22.5428 29.9955 22.9024 28.8936 23.217C26.4948 23.9353 24.8607 24.2202 24.8797 24.2729C24.8988 24.3255 27.1008 24.0334 29.5631 23.4564C31.1807 23.0821 32.7642 22.6286 34.3036 22.0988C32.9894 23.9245 31.3294 25.5957 29.3759 27.0598C28.2584 27.9366 27.0118 28.7142 25.6603 29.3775C23.601 30.3568 21.3704 30.9889 19.7395 31.451C18.7609 31.7182 17.8158 32.0507 16.9155 32.4446C16.3672 32.686 15.8376 32.9506 15.329 33.2371C16.6935 30.3514 18.3406 27.5464 20.2567 24.8451C21.9986 22.3933 23.5344 20.6263 24.7274 19.2568C26.7899 16.8984 29.1697 14.1761 32.8408 11.0922C35.8887 8.53272 39.2536 6.19884 42.8898 4.12239Z"
                fill="#FF4040"
              />
              <line
                x1="8.5"
                y1="2.5"
                x2="8.5"
                y2="16.5"
                stroke="#FF4040"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="1.5"
                y1="9.5"
                x2="15.5"
                y2="9.5"
                stroke="#FF4040"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* <div>
              <Moon id='themeDarkBtn' style={{display: arr[0]}} onClick={() => {
                document.getElementById("themeDarkBtn").style.display = "none";
                document.getElementById("themeLightBtn").style.display = "block";
                changeTheme('dark')
                this.setState(themeColor['dark']);

              }} className='icn c' size={50} color="#000000" weight="fill" />
              <SunDim id='themeLightBtn' style={{display: arr[1]}} onClick={() => {
                document.getElementById("themeDarkBtn").style.display = "block";
                document.getElementById("themeLightBtn").style.display = "none";
                changeTheme("light");
                this.setState(themeColor["light"]);
              }} className="icn c" size={50} color="#ffffff" weight="fill" />
            </div> */}
            <img
              onClick={() => {
                document.querySelector(".profile-menu").style.display = "flex";
                document.querySelector(".profile-menu").focus();
              }}
              alt="Profile Pic"
              height={50}
              src={defaultUser}
            />
            <div
              tabIndex={10}
              onBlur={() => {
                document.querySelector(".profile-menu").style.display = "none";
              }}
              className="profile-menu"
            >
              <span onClick={() => {
                localStorage.removeItem("username")
                localStorage.removeItem("token");
                window.location.href = '/login'
              }}>
                <Power size={15} color="#444" weight="bold" />&nbsp;
                Logout
              </span>
              <span>
                <GearSix size={15} color="#444" weight="fill" />
                &nbsp; Settings
              </span>
            </div>
          </div>
        </div>
        <div className="psuedoHeader"></div>
      </>
    );
  }
}

export default Header;