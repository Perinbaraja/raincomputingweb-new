import { Link } from "react-router-dom"
import React, { useState } from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

const DocketMenu = () => {
  const [isOpen, setIsOpen] = useState(false) // State to control dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen) // Toggle the dropdown visibility
  }

  return (
    <div className="">
      <Dropdown
        isOpen={isOpen}
        toggle={toggleDropdown}
        className="d-inline-block"
      >
        <DropdownToggle
          className="text-primary header-item"
          id="page-header-user-dropdown"
          tag="a"
        >
         Docket
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            <Link to="/create_events">Create Event</Link>
          </DropdownItem>
          <DropdownItem>
            <p>Manage Event</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DocketMenu
