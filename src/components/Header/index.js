import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {IoIosLogOut} from 'react-icons/io'

import {FaToolbox} from 'react-icons/fa'

import {MdHome} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const jwtToken = Cookies.get('jwt_token')
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <li>
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-website"
          />
        </Link>
      </li>
      <li className="routes-container">
        <Link to="/" className="nav-link">
          <p className="home">Home</p>
        </Link>
        <Link to="/jobs" className="nav-link">
          <p className="jobs">Jobs</p>
        </Link>
      </li>
      <li>
        <button type="button" className="logoutBtn" onClick={onClickLogout}>
          Logout
        </button>
      </li>
      <div className="mobile-approach-design">
        <Link to="/" className="nav-link">
          <MdHome className="icons" />
        </Link>
        <Link to="/jobs" className="nav-link">
          <FaToolbox className="icons" />
        </Link>
        <IoIosLogOut className="icons" onClick={onClickLogout} />
      </div>
    </ul>
  )
}
export default withRouter(Header)
