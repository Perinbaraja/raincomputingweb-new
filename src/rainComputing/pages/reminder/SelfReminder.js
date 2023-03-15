import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, CardTitle, Modal } from "reactstrap"
import { getReminderSelf, removeReminder } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import toastr from "toastr"

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
   
   
  const handleRemove = async (selfRemind) => {
    console.log("self", selfRemind)
    const payload = {
      reminderId: selfRemind?._id
    }
    const res = await removeReminder(payload)
    if (res.success) {
      toastr.success(`You have reminder remove  successfully`, "Success")
      setSelfReminder(prevState => prevState.filter(reminder => reminder._id !== selfRemind._id))
    }
  }
  return ( 
    <div className="modal-body">
   {selfReminder?.length > 0 ?  <>  {selfReminder?.map((selfRemind, k) => (
        <div key={k}>
          
            <Card >
              <CardBody>
              <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          style={{ width: "20px" }}
          onClick={() => handleRemove(selfRemind)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
                <CardTitle className="mt-0">
                  Title :{selfRemind?.title}
                </CardTitle>
                <CardText> Message Data :{selfRemind?.messageId?.messageData}</CardText>
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
