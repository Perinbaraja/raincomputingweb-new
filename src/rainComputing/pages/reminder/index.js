import React, { useEffect, useState } from "react"
import { Card, CardBody, CardText, CardTitle, DropdownItem, Modal } from "reactstrap"
import PropTypes from "prop-types"
import { getReminder } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const Reminder = ({ toggle, open, setOpen }) => {
  const [reminderData, setReminderData] = useState(null)
  const { currentUser } = useUser()

  useEffect(() => {
    const getReminderData = async () => {
      const res = await getReminder({})
      if (res.success) {
        setReminderData(res.reminder)
      }
    }
    getReminderData()
  }, [])
  console.log("reminderData:", reminderData)
  return (
    <>
      <DropdownItem>
        <i
          className="mdi mdi-reminder font-size-16 align-middle me-1"
          onClick={() => {
            toggle()
          }}
          data-toggle="modal"
        >
          Reminder
        </i>
      </DropdownItem>
      <Modal
        isOpen={open}
        toggle={() => {
          toggle()
        }}
        scrollable={true}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0">Reminder</h5>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Card>
            <CardBody>
              <CardTitle className="mt-0">Title :</CardTitle>
              <CardText> Message :</CardText>
              <CardText> Date :</CardText>
              <CardText> Time :</CardText>
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
}
export default Reminder
