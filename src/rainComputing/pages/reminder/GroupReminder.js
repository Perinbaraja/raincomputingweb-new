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
          setGoupReminder(res?.reminders)
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
                    onClick={() => handleDelete(groupRemind)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <CardTitle className="mt-0">
                    Title :{groupRemind?.title}
                  </CardTitle>
                  <CardText>
                    {" "}
                    Message Data :{groupRemind?.messageId?.messageData}
                  </CardText>
                  <CardText className="text-primary">
                    {" "}
                    Date :{groupRemind?.date}
                  </CardText>
                  <CardText className="text-primary">
                    {" "}
                    Time :{groupRemind?.time}
                  </CardText>{" "}
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
