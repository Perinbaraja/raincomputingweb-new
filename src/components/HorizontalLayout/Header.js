import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import "./headsearch.scss"
// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions"
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import rainlogo from "assets/images/rain-drop.png"
import rainlglogo from "assets/images/raincom_Logo1.png"
//i18n
import { withTranslation } from "react-i18next"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import useMediaQuery from "rainComputing/helpers/hooks/useMediaQuery"
import MobileNav from "./MobileNav"
import Reminder from "rainComputing/pages/reminder"
import DocketMenu from "rainComputing/pages/docket/DocketMenu"
import logoImage from "../../assets/images/ChatPro.png"
const Header = props => {
  const { currentAttorney } = useUser()
  const { currentUser } = useUser()
  const [isMobile] = useMediaQuery("764")
  const [modal_scroll, setmodal_scroll] = useState(false)
  const [subDomainOpen, setSubDomainOpen] = useState(false);
  const toggleSubDomainOpen = () => {
    setSubDomainOpen(!subDomainOpen);
  };
  const handleIconClick = () => {
    window.open(currentAttorney?.subdomain, '_blank');
  };
  const tog_scroll = () => {
    setmodal_scroll(!modal_scroll)
  }
  const handleDomainClick = () => {
    const subdomain = currentAttorney?.subdomain;
    const url = subdomain ? (subdomain.startsWith("https://") ? subdomain : `https://${subdomain}`) : null;

    if (url) {
        window.open(url, '_blank');
    } else {
        console.error("Invalid subdomain or subdomain is missing.");
    }
};

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="d-flex justify-content-md-between flex-grow-1 col-md-12  ">
          <div className="d-flex ">
            <div className="d-flex navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-lg">
                  <img src={rainlglogo} alt="" height="50" />
                </span>
              </Link>
              {currentAttorney?.subdomain && (
                <div className="p-4">
                  <i
                    className="bx bx-link-external"
                    id="atticon"
                    onClick={toggleSubDomainOpen}
                    target="_blank"
                    style={{ cursor: "pointer" }}
                  />
                  <Dropdown
                    isOpen={subDomainOpen}
                    toggle={toggleSubDomainOpen}
                    className="float-end me-2"
                  >
                    <DropdownToggle className="btn nav-btn" tag="i"></DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() =>handleDomainClick()}>
                        {currentAttorney?.subdomain}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}
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
          <div className="d-flex justify-content-md-between " id="">
            {/* <div id="navbox"></div> */}
            {isMobile ? (
              <>
                {" "}
                <div>
                  <ul id="menunav" className="d-flex">
                    <li id="navmen" className="">
                      <Link to="/">Home</Link>
                    </li>
                    <li id="navmen" className="">
                      <Link to="/chat-rc">
                        <Link
                          className=""
                          to="/chat-rc"
                        >
                          ChatPro<sup>TM</sup>
                        </Link>
                      </Link>
                    </li>
                    {!currentUser && (
                      <li id="navmen" className="">
                        <Link to="/help">Help</Link>
                      </li>
                    )}
                    {currentUser && currentAttorney?.status === "approved" && (
                      <li id="navmen" className="">
                        <Link to="/req-user">Requests</Link>
                      </li>
                    )}
                    {currentUser && !currentAttorney && (
                      <li id="navmen" className="">
                        <Link to="/appointment-status">Connection</Link>
                      </li>
                    )}
                    <li id="navmen" className="">
                      <DocketMenu />
                    </li>
                  </ul>
                </div>
                <div className="d-flex align-items-center gap-2">
                  {currentUser && <NotificationDropdown />}
                  {currentUser && (
                    <Reminder
                      toggle={tog_scroll}
                      open={modal_scroll}
                      setOpen={setmodal_scroll}
                    />
                  )}
                  <ProfileMenu />
                </div>
              </>
            ) : (
              <div className="flex-fill">
                <MobileNav />
              </div>
            )}
            {/* <div id="topinput">
            <form >
            <span className="bx bx-search-alt mx-2 bg-primary text-white px-2 py-1" id="topsearch"/>
              <input type="text" placeholder="Search for Attorney..." className="border-0"/>={}
            </form>
          </div> */}
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
