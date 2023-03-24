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
const [groupReminder, setGroupReminder] = useState([])
const { currentUser } = useUser()
const getReminderData = async () => {
  try {
    if (!currentUser) {
      return;
    }
    const res = await getReminder({ currentUserID: currentUser?.userID });
    if (!res.success) {
      return;
    }
    const reminders = res?.reminders;
    const newReminders = [];
    for (const reminder of reminders) {
      const scheduledTime = reminder?.scheduledTime;
      const notificationTime = moment(scheduledTime, moment.ISO_8601)
        .subtract(5, "hours")
        .subtract(30, "minutes")
        .toDate();
      const now = new Date().getTime();
      const timeDiff = notificationTime.getTime() - now;
      if (timeDiff > 0) {
        setTimeout(() => {
          setGroupReminder(prevState => [...prevState, reminder]);
          toastr.success(`You have ${reminder.title} successfully`, "Success");
          setOpen(true);
        }, timeDiff);
      } else {
        newReminders.push(reminder);
      }
    }
    setGroupReminder(prevState => [...prevState, ...newReminders]);
  } catch (error) {
    console.error(error);
  }
};

// console.log("dk:",groupReminder);
// useEffect(() => {
//   const interval = setInterval(() => {
//     getReminderData()
//   }, 60 * 1000) // Call the function every minute
//   return () => clearInterval(interval)
// }, [currentUser])

useEffect(() => {
  getReminderData()
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
          setGroupReminder={setGroupReminder}
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
