import ProfileMenu from "components/CommonForBoth/TopbarDropdown/ProfileMenu"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import "../HorizontalLayout/mobileNav.css"
import rainlglogo from "assets/images/raincom_Logo1.png"
import NotificationDropdown from "components/CommonForBoth/TopbarDropdown/NotificationDropdown"
import Reminders from "rainComputing/pages/reminder"
import DocketMenu from "rainComputing/pages/docket/DocketMenu"

const MobileNav = () => {
  const [isMobile, setIsMobile] = useState(false)
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }
  const [modal_scroll, setmodal_scroll] = useState(false)

  const { currentAttorney } = useUser()
  const { currentUser } = useUser()
  const tog_scroll = () => {
    setmodal_scroll(!modal_scroll)
  }
  return (
    <div>
      {isMobile && (
        <ul id="" className=" ul  " style={{ zIndex: 300 }}>
          <li id="" className="">
            <Link to="/" className="ul1">
              Home
            </Link>
          </li>
          <li id="" className="">
            <Link to="/chat-rc" className="ul1">
              {" "}
              ChatPro<sup>TM</sup>
            </Link>
          </li>
          {!currentUser && (
            <li id="" className="">
              <Link to="/help" className="ul1">
                Help
              </Link>
            </li>
          )}
          {currentUser && currentAttorney?.status === "approved" && (
            <li id="" className="">
              <Link to="/req-user" className="ul1">
                Requests
              </Link>
            </li>
          )}
          {currentUser && !currentAttorney && (
            <li id="">
              <Link to="/appointment-status " className=" ul1">
                {" "}
                Connection
              </Link>
            </li>
          )}
          {currentUser && currentAttorney?.status === "approved" && (
            <li className="ul1">
              <DocketMenu />
            </li>
          )}
        </ul>
      )}
      <div className=" flex-container ">
        <div className="  ">
          <button
            onClick={() => setIsMobile(!isMobile)}
            className="border-0 bg-transparent"
          >
            {isMobile ? (
              <div className="burger-bar show "></div>
            ) : (
              <div className="burger-bar "></div>
            )}
          </button>
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              {/* <img src={rainlglogo} alt="" height="22" /> */}
            </span>
          </Link>{" "}
        </div>
        <div className="d-flex  ">
          <div> {currentUser && <NotificationDropdown />}</div>
          <div className="mt-3 p-1">
            {" "}
            {currentUser && (
              <Reminders
                toggle={tog_scroll}
                open={modal_scroll}
                setOpen={setmodal_scroll}
              />
            )}
          </div>
          <div>
            {" "}
            <ProfileMenu />
          </div>{" "}
        </div>
      </div>
    </div>
  )
}

export default MobileNav
