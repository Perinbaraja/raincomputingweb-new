import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, CardTitle, Modal } from "reactstrap"
import { getReminder, removeReminder } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import toastr from "toastr"

const GroupReminder = () => {
  const [groupReminder, setGoupReminder] = useState()
  const { currentUser } = useUser()
  useEffect(() => {
    if (currentUser) {
      const getReminderData = async () => {
        const res = await getReminder({ currentUserID: currentUser?.userID })
        if (res.success) {
          setGoupReminder(res?.reminders)
        }
      }
      getReminderData()
    }
  }, [currentUser])
  const handleRemove = async (groupRemind) => {
    const payload = {
      reminderId: groupRemind?._id
    }
    const res = await removeReminder(payload)
    if (res.success) {
      toastr.success(`You have reminder remove  successfully`, "Success")
      setGoupReminder(prevState => prevState.filter(reminder => reminder._id !== groupRemind._id))
    }
  }
  return (
    <div className="modal-body">
      {groupReminder?.length > 0 ? (
        <>
          {" "}
          {groupReminder?.map((groupRemind, k) => (
            <div key={k}>
              <Card>
                <CardBody>
                <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          style={{ width: "20px" }}
          onClick={() => handleRemove(groupRemind)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
                  <CardTitle className="mt-0">
                    Title :{groupRemind?.title}
                  </CardTitle>
                  <CardText> Message Data :{groupRemind?.messageId?.messageData}</CardText>
                  <CardText className="text-primary"> Date :{groupRemind?.date}</CardText>
                  <CardText className="text-primary"> Time :{groupRemind?.time}</CardText>{" "}
                </CardBody>
              </Card>
            </div>
          ))}
        </>
      ) : (
        <p>No Reminders</p>
      )}
    </div>
  )
}

export default GroupReminder
