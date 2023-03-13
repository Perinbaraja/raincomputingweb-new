import React, { useEffect, useState } from "react"
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  DropdownItem,
  Modal,
} from "reactstrap"
import PropTypes from "prop-types"
import { getReminder } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { useChat } from "rainComputing/contextProviders/ChatProvider"

const Reminder = ({ toggle, open, setOpen ,show = false }) => {
  const [reminderData, setReminderData] = useState()
  const { currentUser } = useUser()
  useEffect(() => {
  if(currentUser) { const getReminderData = async () => {
      const res = await getReminder({ currentUserID: currentUser?.userID })
      console.log("reminderData", currentUser?.userID)
      if (res.success) {
        setReminderData(res?.reminders)
      }

    }
    getReminderData()}
  }, [currentUser])


  return (
    <>
  

        <i class="bi bi-alarm fs-4 w-3" 
          onClick={() => {
            toggle()
          }}
          data-toggle="modal"
          style={{
            cursor: "pointer"
          }}
        >
        </i>
     
     <Modal
        isOpen={open}
        toggle={() => {
          toggle()
        }}
        scrollable={true}
      >
        
          <h5 className="modal-title mt-0">Reminder</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            style={{width:"20px"}}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
      
        <div className="modal-body">
          <Card>
            <CardBody>
              {reminderData?.map((i, k) => (
                <>
                  {" "}
                  <CardTitle className="mt-0">Title :{i?.title}</CardTitle>
                  <CardText> Date :{i?.date}</CardText>
                  <CardText> Time :{i?.time}</CardText>{" "}
                </>
              ))}
            </CardBody>
          </Card>
        </div>
      </Modal>
    </>
  )
}

Reminder.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  setOpen: PropTypes.func,
  show: PropTypes.func,
}
export default Reminder
