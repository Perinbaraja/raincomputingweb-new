import React, { useState } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import { Link } from "react-router-dom"

import "./headsearch.scss"

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions"
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import rainlogo from "assets/images/rain-drop.png"
import rainlglogo from "assets/images/raincom_Logo1.png"
//i18n
import { withTranslation } from "react-i18next"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const Header = props => {
  const { currentAttorney } = useUser()
  const { currentUser } = useUser()

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={rainlglogo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={rainlglogo} alt="" height="50" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light  ">
                <span className="logo-sm">
                  <img src={rainlglogo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={rainlglogo} alt="" height="50" />
                </span>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-between" id="navsection">
            {/* <div id="navbox"></div> */}
            <div>
              <ul id="menunav" className="d-flex">
                <li id="navmen" className="">
                  <Link to="/">Home</Link>
                </li>
                <li id="navmen" className="">
                  <Link to="/chat-rc">Chat</Link>
                </li>
                {!currentUser&&
                <li id="navmen" className="">
                  <Link to="/help">Help</Link>
                </li>}
                {currentUser && currentAttorney?.status === "approved" && (
                  <li id="navmen" className="">
                    <Link to="/req-user">Requests</Link>
                  </li>
                )}
                {currentUser && !currentAttorney && (
                  <li id="navmen">
                    <Link to="/appointment-status">Connection</Link>
                  </li>
                )}
              </ul>
            </div>

            {/* <div id="topinput">
            <form >
            <span className="bx bx-search-alt mx-2 bg-primary text-white px-2 py-1" id="topsearch"/>
              <input type="text" placeholder="Search for Attorney..." className="border-0"/>
            </form>
          </div> */}

            <div className="d-flex align-items-center">
              {currentUser && <NotificationDropdown />}
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout
  return { layoutType, showRightSidebar, leftMenu }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header))
