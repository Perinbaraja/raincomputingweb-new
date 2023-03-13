import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, CardTitle, Modal } from "reactstrap"
import { getReminderSelf } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const SelfReminder = () => {
  const [selfReminder, setSelfReminder] = useState()
  const { currentUser } = useUser()
  useEffect(() => {
    if (currentUser) {
      const getReminderData = async () => {
        const res = await getReminderSelf({
          currentUserID: currentUser?.userID,
        })
        if (res.success) {
          setSelfReminder(res?.reminders)
        }
      }
      getReminderData()
    }
  }, [currentUser])
  return ( 
    <div className="modal-body">
   {selfReminder?.length > 0 ?  <>  {selfReminder?.map((selfRemind, k) => (
        <div key={k}>
          
            <Card >
              <CardBody>
                <CardTitle className="mt-0">
                  Title :{selfRemind?.title}
                </CardTitle>
                <CardText> Date :{selfRemind?.date}</CardText>
                <CardText> Time :{selfRemind?.time}</CardText>{" "}
              </CardBody>
            </Card>
        
            </div>
         ))} </>: <p>No Reminders</p>}
       
     
    </div>
  )
}

export default SelfReminder
