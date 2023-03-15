import React, { useState } from "react"
import { Modal, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import PropTypes from "prop-types"
import GroupReminder from "./GroupReminder"
import SelfReminder from "./SelfReminder"

const Reminders = ({ toggle, open, setOpen, show = false }) => {
  const [activeTab, setActiveTab] = useState("group")

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div>
      <i
        className="bi bi-alarm fs-4 w-3"
        onClick={toggle}
        data-toggle="modal"
        style={{
          cursor: "pointer",
        }}
      ></i>

      <Modal isOpen={open} toggle={toggle} scrollable={true}>
        <div className="d-flex justify-content-center p-4">
          <i className="bi bi-alarm fs-3 w-2 me-1" />
          <h3 className="modal-title  text-primary ">Reminder</h3>
        </div>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          style={{ width: "20px" }}
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <Nav tabs className="d-flex justify-content-center">
          <NavItem>
            <NavLink
              className={activeTab === "group" ? "active " : ""}
              onClick={() => {
                toggleTab("group")
              }}
            >
              Group Reminder
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "self" ? "active " : ""}
              onClick={() => {
                toggleTab("self")
              }}
            >
              Self Reminder
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="modal-body">
          <TabPane tabId="group">
            <GroupReminder />
          </TabPane>
          <TabPane tabId="self">
            <SelfReminder />
          </TabPane>
        </TabContent>
      </Modal>
    </div>
  )
}

Reminders.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  setOpen: PropTypes.func,
  show: PropTypes.func,
}

export default Reminders
