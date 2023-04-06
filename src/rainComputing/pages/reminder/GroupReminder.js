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
import PropTypes from "prop-types"
import "./reminder.css"

const GroupReminder = ({ groupReminder, setGroupReminder }) => {

  console.log("groupReminder",groupReminder)

  const [removeData, setRemoveData] = useState()
  const {
    toggleOpen: groupReminderDeleteModalOpen,
    setToggleOpen: setReminderDeleteModalOpen,
    toggleIt: togglegroupReminderDeleteModal,
  } = useToggle(false)

  const handleRemove = async () => {
    const payload = {
      reminderId: removeData?._id,
    }
    const res = await removeReminder(payload)
    if (res.success) {
      toastr.success(`You have reminder remove  successfully`, "Success")
      setGroupReminder(prevState =>
        prevState.filter(reminder => reminder._id !== removeData._id)
      )
      setReminderDeleteModalOpen(false)
    }
  }
  const handleDelete = groupRemind => {
    setRemoveData(groupRemind)
    setReminderDeleteModalOpen(true)
  }
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
          {groupReminder
            ?.sort(
              (a, b) => new Date(b.scheduledTime) - new Date(a.scheduledTime)
            )
            .map((group,i) => (
              <div key={i}>
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-end px-4">
                      {i === 0 ? <i className="fa fa-bell icon "></i> : null}
                      <button
                        type="button"
                        className="close py-4"
                        data-dismiss="modal"
                        aria-label="Close"
                        style={{ width: "20px" }}
                        onClick={() => handleDelete(group)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <CardTitle className="mt-0">
                      Title :{group?.title}
                    </CardTitle>

                    {group?.messageId?.messageData && (
                      <CardText>
                        {" "}
                        Message Data :{group?.messageId?.messageData}
                      </CardText>
                    )}
                    <CardText className="text-primary">
                      {" "}
                      Date & Time:{group?.scheduledTime[0]}
                    </CardText>
                    {/* <CardText className="text-primary">
                    {" "}
                    Time :{groupRemind?.time}
                  </CardText>{" "} */}
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

GroupReminder.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  setOpen: PropTypes.func,
  show: PropTypes.func,
  groupReminder: PropTypes.any,
  setGroupReminder: PropTypes.any,
}
export default GroupReminder
