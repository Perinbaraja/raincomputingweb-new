import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, CardTitle, Modal } from "reactstrap"
import {
  getReminder,
  removeReminder,
} from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import toastr from "toastr"
import { useToggle } from "rainComputing/helpers/hooks/useToggle"
import DeleteModal from "components/Common/DeleteModal"
import moment from "moment"

const GroupReminder = () => {
  const [groupReminder, setGoupReminder] = useState()
  const { currentUser } = useUser()
  const [removeData, setRemoveData] = useState()
  const {
    toggleOpen: groupReminderDeleteModalOpen,
    setToggleOpen: setReminderDeleteModalOpen,
    toggleIt: togglegroupReminderDeleteModal,
  } = useToggle(false)
  useEffect(() => {
    if (currentUser) {
      const getReminderData = async () => {
        const res = await getReminder({ currentUserID: currentUser?.userID })
        if (res.success) {
          const reminders = res?.reminders.filter(reminder => {
            return reminder.selectedMembers.some(
              member => member.id === currentUser?.userID
            )
          })
          // Schedule the reminders
          reminders.forEach(reminder => {
            const scheduledTime = reminder?.scheduledTime
            const notificationTime = moment(scheduledTime, moment.ISO_8601)
              .subtract(5, "hours")
              .subtract(30, "minutes")
              .toDate()
            // console.log(
            //   `Scheduling reminder for ${reminder.title} at ${notificationTime}`
            // )

            // Schedule the notification to show when the notification time is reached
            const now = new Date().getTime()
            const timeDiff = notificationTime.getTime() - now
            if (timeDiff > 0) {
              setTimeout(() => {
                // Display the notification here
                toastr.success(
                  `You have ${reminder.title} successfully`,
                  "Success"
                )
                // console.log(`Showing notification for ${reminder.title}`)
              }, timeDiff)
              setGoupReminder(res?.reminders)
            }
          })
        }
      }
      getReminderData()
    }
  }, [currentUser])

  const handleRemove = async () => {
    const payload = {
      reminderId: removeData?._id,
    }
    const res = await removeReminder(payload)
    if (res.success) {
      toastr.success(`You have reminder remove  successfully`, "Success")
      setGoupReminder(prevState =>
        prevState.filter(reminder => reminder._id !== removeData._id)
      )
      setReminderDeleteModalOpen(false)
    }
  }
  const handleDelete = groupRemind => {
    setRemoveData(groupRemind)
    setReminderDeleteModalOpen(true)
  }
  const map = groupReminder?.map((groupRemind, k) =>{
  const scheduledTime = groupRemind?.scheduledTime
  const notificationTime = moment(scheduledTime, moment.ISO_8601).toDate();
  const now = new Date().getTime()
  const wow = notificationTime.getTime() - now
  

  return wow >= 0 && wow <=1 
  })
  // console.log("map:", map )
  return (
    <div className="modal-body">
      <DeleteModal
        show={groupReminderDeleteModalOpen}
        onDeleteClick={handleRemove}
        confirmText="Yes,Remove"
        cancelText="Cancel"
        onCloseClick={togglegroupReminderDeleteModal}
      />
      {groupReminder?.length > 0 ? (
        <>
          {" "}
          {groupReminder?.map((groupRemind, k) => {
  const now = new Date().getTime();
  const scheduledTime = groupRemind?.scheduledTime;
  const notificationTime = moment(scheduledTime, moment.ISO_8601).toDate().getTime();
  const timeDiff = notificationTime - now;

  if (timeDiff >= 0  ) {
    // groupRemind.scheduledTime is equal or greater than current time
    // execute your code here
    return (
      <div key={k}>
        <Card>
          <CardBody>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              style={{ width: "20px" }}
              onClick={() => handleDelete(groupRemind)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <CardTitle className="mt-0">
              Title: {groupRemind?.title}
            </CardTitle>
            <CardText>
              Message Data: {groupRemind?.messageId?.messageData}
            </CardText>
            <CardText className="text-primary">
              Date: {groupRemind?.date}
            </CardText>
            <CardText className="text-primary">
              Time: {groupRemind?.time}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    // groupRemind.scheduledTime is in the past, skip this group reminder
    return null;
  }
})}
        </>
      ) : (
        <p>No Reminders</p>
      )}
    </div>
  )
}

export default GroupReminder
