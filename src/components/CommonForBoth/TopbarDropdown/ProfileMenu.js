import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link, useHistory, NavLink } from "react-router-dom"

// users
import user1 from "../../../assets/images/avatar-defult.jpg"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { logoutUser } from "rainComputing/helpers/backend_helper"
import { useSocket } from "rainComputing/contextProviders/SocketProvider"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const histroy = useHistory()
  const { currentUser } = useUser()
  const { socket } = useSocket()
  const [menu, setMenu] = useState(false)

  const handleLogout = async () => {
    const res = await logoutUser()
    if (res.success) {
      socket?.emit("close_manually")
      localStorage.removeItem("authUser")
      histroy.push("/login")
    } else {
      console.log("Logout failed")
    }
  }

  return (
    <React.Fragment>
      {currentUser ? (
        <Dropdown
          isOpen={menu}
          toggle={() => setMenu(!menu)}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item "
            id="page-header-user-dropdown"
            tag="button"
          >
            <img
              className="rounded-circle header-profile-user"
              src={currentUser.profilePic ? currentUser.profilePic : user1}
              alt="profile pic"
              style={{ objectFit: "cover" }}
            />
            <span className="d-none d-xl-inline-block ms-2 me-1 fw-bolder font-size-16">
              {currentUser?.firstname + " " + currentUser?.lastname}
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem tag="a" href="/profile">
              {" "}
              <i className="bx bx-user font-size-16 align-middle me-1" />
              {props.t("Profile")}{" "}
            </DropdownItem>
            {!currentUser?.attorneyStatus ? (
              <DropdownItem tag="a" href="/attorney-signup">
                <i className="bx bx-group font-size-16 align-middle me-1" />
                {props.t("Register as Attorney")}
              </DropdownItem>
            ) : (
              <DropdownItem tag="a" href="/reqattorney">
                <i className="bx bx-group font-size-16 align-middle me-1" />
                {props.t("Attorney")}
                {currentUser?.attorneyStatus === "requested" && (
                  <i className="bx bx-loader  bx-spin font-size-16 align-middle ms-2  text-primary float-end" />
                )}
                {currentUser?.attorneyStatus === "approved" && (
                  <i className="bx bx-comment-error  font-size-16 align-middle ms-2 text-success  float-end" />
                )}
                {currentUser?.attorneyStatus === "rejected" && (
                  <i className="bx bx-x  font-size-16 align-middle ms-2 text-danger float-end" />
                )}
              </DropdownItem>
            )}

            {currentUser?.attorneyStatus === "approved" && (
              <Link to="/firmlanding" className="dropdown-item">
                <span className="badge bg-success float-end"></span>
                <i className="bx  bx-buildings font-size-16 align-middle me-1" />
                {props.t("Firm")}
              </Link>
            )}

            {/* {!currentUser?.appointmentStatus && (
              <DropdownItem tag="a" href="/appointmentstatus">
                <i className="bx bx-group font-size-16 align-middle me-1" />
                {props.t("Appointment status")}
                {currentUser?.appointmentStatus === "requested" && (
                  <i className="bx bx-loader  bx-spin font-size-16 align-middle ms-2  text-primary float-end" />
                )}
                {currentUser?.appointmentStatus === "approved" && (
                  <i className="bx bx-comment-error  font-size-16 align-middle ms-2 text-success  float-end" />
                )}
                {currentUser?.appointmentStatus === "rejected" && (
                  <i className="bx bx-x  font-size-16 align-middle ms-2 text-danger float-end" />
                )}
              </DropdownItem>
            )} */}

            {/* <DropdownItem tag="a" href="#">
              <span className="badge bg-success float-end"></span>
              <i className="bx bx-wrench font-size-16 align-middle me-1" />
              {props.t("Settings")}
            </DropdownItem> */}
            {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1"/>
            {props.t("Lock screen")}
          </DropdownItem> */}
            <div className="dropdown-divider" />
            <Link
              to="#"
              className="dropdown-item"
              onClick={() => {
                handleLogout()
              }}
            >
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              <span>{props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link to="/login" className="dropdown">
          <i className="bx bx-log-in-circle font-size-20 align-middle me-1 text-primary" />
          <span>{props.t("Login")}</span>
        </Link>
      )}
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
