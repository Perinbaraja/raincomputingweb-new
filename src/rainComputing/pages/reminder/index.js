import React, { useEffect, useState } from "react"
import { Modal, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import PropTypes from "prop-types"
import GroupReminder from "./GroupReminder"
import SelfReminder from "./SelfReminder"
import { getReminder } from "rainComputing/helpers/backend_helper"
import moment from "moment"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import toastr from "toastr"

const Reminders = ({ toggle, open, setOpen, show = false }) => {
  const [activeTab, setActiveTab] = useState("group")
  const [groupReminder, setGoupReminder] = useState([])
  const { currentUser } = useUser()
  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  useEffect(() => {
    const getReminderData = async () => {
      if (currentUser) {
        const res = await getReminder({ currentUserID: currentUser?.userID })
        if (res.success) {
          const reminders = res?.reminders.filter(reminder => {
            return reminder.selectedMembers.some(
              member => member.id === currentUser?.userID
            )
          })
          setGoupReminder([])
          // Schedule the reminders
          reminders.forEach(reminder => {
            const scheduledTime = reminder?.scheduledTime
            const notificationTime = moment(scheduledTime, moment.ISO_8601)
              .subtract(5, "hours")
              .subtract(30, "minutes")
              .toDate()

            // Schedule the notification to show when the notification time is reached
            const now = new Date().getTime()
            const timeDiff = notificationTime.getTime() - now
            if (timeDiff > 0) {
              // Set a timeout for the notification to be received
              setTimeout(() => {
                setGoupReminder(prevState => [...prevState, reminder])

                // Display the notification here
                toastr.success(
                  `You have ${reminder.title} successfully`,
                  "Success"
                )
                setOpen(true)
              }, timeDiff)
            } else {
              // If the time for the notification has already passed, set the reminder as received
              setGoupReminder(prevState => [...prevState, reminder])
            }
          })
        }
      }
    }
    getReminderData()
    const interval = setInterval(() => {
      getReminderData()
    }, 60 * 1000) // Call the function every minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval)
  }, [currentUser])
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

        <GroupReminder
          setGoupReminder={setGoupReminder}
          groupReminder={groupReminder}
        />
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
