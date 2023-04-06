import React, { useEffect, useState } from "react"
import { Modal, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import PropTypes from "prop-types"
import GroupReminder from "./GroupReminder"
import SelfReminder from "./SelfReminder"
import { getReminder } from "rainComputing/helpers/backend_helper"
import moment from "moment"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import toastr from "toastr"
import { date } from "yup"

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
    
    const nextNotify=res.nextNotificationTime

    console.log("nextNotify",nextNotify)
    const newReminders = [];
    console.log("reminders",reminders)
    for (const reminder of reminders) {
      const scheduledTime = reminders.filter((reminder) => {
        return reminder.scheduledTime.some((time) => {
          return moment(time).isSame(nextNotify);
        });
      });
console.log("scheduledTime",scheduledTime)
 
      
      const now = new Date()

      // for (const notificationTime of scheduledTime) {
 const currentNotify= new Date(nextNotify)
 currentNotify.setHours(currentNotify.getHours() - 5);
currentNotify.setMinutes(currentNotify.getMinutes() - 30);
 console.log("currentNotify",currentNotify)
        const timeDiff = currentNotify - now
          console.log("now",now)
          // console.log("notificationTime",notificationTime.getTime())
          console.log("timeDiff",timeDiff)
      
        if (timeDiff < 50000) {
          setTimeout(() => {
            setGroupReminder(  scheduledTime);
            toastr.success(`You have ${scheduledTime[0].title} successfully`, "Success");
            setOpen(true);
          }, timeDiff);
        } else {
          newReminders.push(scheduledTime);
        }
       
      // }
    }
    
    setGroupReminder( ...newReminders);
  } catch (error) {
    console.error(error);
  }
};

const intervalTime = 30000; // 30 seconds in milliseconds

useEffect(() => {
  // define a function to run the getReminderData function at the specified interval
  const intervalId = setInterval(getReminderData, intervalTime);
  // clear the interval on component unmount
  return () => clearInterval(intervalId);
}, [getReminderData]);

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
