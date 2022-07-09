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
import { withRouter, Link, useHistory } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/avatar-2.jpg"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { logoutUser } from "rainComputing/helpers/backend_helper"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const histroy = useHistory()
  const { currentUser } = useUser()
  const [menu, setMenu] = useState(false)

  const handleLogout = async () => {
    const res = await logoutUser()
    if (res.success) {
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
              src={user1}
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ms-2 me-1 fw-bolder font-size-16">
              {currentUser?.username}
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem tag="a" href="/profile">
              {" "}
              <i className="bx bx-user font-size-16 align-middle me-1" />
              {props.t("Profile")}{" "}
            </DropdownItem>
            {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1"/>
            {props.t("My Wallet")}
          </DropdownItem> */}
            <DropdownItem tag="a" href="#">
              <span className="badge bg-success float-end">11</span>
              <i className="bx bx-wrench font-size-16 align-middle me-1" />
              {props.t("Settings")}
            </DropdownItem>
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
