import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, CardTitle, Modal } from "reactstrap"
import { getReminder } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

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
  return (
    <div className="modal-body">
      {groupReminder?.length > 0 ? (
        <>
          {" "}
          {groupReminder?.map((groupRemind, k) => (
            <div key={k}>
              <Card>
                <CardBody>
                  <CardTitle className="mt-0">
                    Title :{groupRemind?.title}
                  </CardTitle>
                  <CardText> Date :{groupRemind?.date}</CardText>
                  <CardText> Time :{groupRemind?.time}</CardText>{" "}
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
