import React, { useEffect, useState } from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import PropTypes from "prop-types"
import {
  createReminder,
  getAllReminders,
  removeReminder,
  UpdateReminder,
} from "rainComputing/helpers/backend_helper"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useChat } from "rainComputing/contextProviders/ChatProvider"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import moment from "moment"
import { async } from "q"
import { removeData } from "jquery"
import DeleteModal from "components/Common/DeleteModal"
import { useToggle } from "rainComputing/helpers/hooks/useToggle"
const EditReminder = ({
  setEditModalOpen,
  reminder,
  setGetReminders,
  getReminders,
}) => {
  const remindere = new Date(reminder.scheduledTime)
  remindere.setHours(remindere.getHours() - 5)
  remindere.setMinutes(remindere.getMinutes() - 30)
  const formattedTime = remindere.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  })

  const options = { year: "numeric", month: "2-digit", day: "2-digit" }
  const formattedDate = remindere
    .toLocaleDateString("en-US", options)
    .split("/")
    .join("-")
    .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$1-$2")
  // const scheduledTime = new Date(`${date}T${time}:00.000Z`).toISOString()
  const { currentRoom: currentChat, setMessages, messages } = useChat()
  const { currentUser } = useUser()
  const [title, setTitle] = useState(reminder?.title)
  const [date, setDate] = useState(formattedDate)
  const [time, setTime] = useState(formattedTime)
  const [removeData, setRemoveData] = useState()

  const reminderSelectedMembers = reminder?.selectedMembers
  const [selectedMembers, setSelectedMembers] = useState(
    reminderSelectedMembers
  )
  const [userId, setUserId] = useState(null)
  const [isChecked, setIsChecked] = useState("")
  const {
    toggleOpen: groupReminderDeleteModalOpen,
    setToggleOpen: setReminderDeleteModalOpen,
    toggleIt: togglegroupReminderDeleteModal,
  } = useToggle(false)
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }
  useEffect(() => {
    if (isChecked) {
      setUserId(currentUser?.userID)
    } else {
      setUserId("")
    }
  }, [isChecked, currentUser])

  const handleAddingNewSelectedgroupMembers = member => {
    if (selectedMembers.some(m => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id))
    } else {
      setSelectedMembers([...selectedMembers, member])
    }
  }

  const getSelectedReminderMembers = selectedMembers?.map(
    member => member.id._id
  )
  const handleChange = e => {
    setIsChecked(e.target.checked)
  }
  const handlereminderCancel = () => {
    setEditModalOpen(false)
  }
  const getAllReminderById = async () => {
    const res = await getAllReminders({
      currentUserID: currentUser?.userID,
    })
    if (res.success) {
      setGetReminders(res?.reminders)
    }
  }

  useEffect(() => {
    if (currentUser) {
      getAllReminderById()
    }
  }, [currentUser])

  const handleReminderUpdate = async () => {
    const scheduledTime = new Date(`${date}T${time}:00.000Z`).toISOString()

    const payload = {
      reminderId: reminder?._id,
      selectedMembers: getSelectedReminderMembers,
      title: title,
      scheduledTime: scheduledTime,
    }

    const reminderData = await UpdateReminder(payload)

    if (reminderData.success) {
      await getAllReminderById()
      toastr.success("Reminder updated successfully")
      setEditModalOpen(false)
    } else {
      toastr.error(`${reminderData?.msg}`)
    }
  }

  const handleRemove = async () => {
    const payload = {
      reminderId: removeData?._id,
    }
    const res = await removeReminder(payload)
    if (res.success) {
      toastr.success(`You have reminder remove  successfully`, "Success")

      setGetReminders(prevState =>
        prevState.filter(reminder => reminder._id !== removeData._id)
      )

      setEditModalOpen(false)
    }
  }
  const handleDelete = reminder => {
    setRemoveData(reminder)
    setReminderDeleteModalOpen(true)
  }
  return (
    <>
      <i
        className="bi bi-trash text-danger  d-flex justify-content-end"
        title="Delete"
        onClick={() => handleDelete(reminder)}
        style={{ fontSize: "20px" }}
      ></i>

      <DeleteModal
        show={groupReminderDeleteModalOpen}
        onDeleteClick={handleRemove}
        confirmText="Yes,Remove"
        cancelText="Cancel"
        onCloseClick={togglegroupReminderDeleteModal}
      />

      <Row>
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Title
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="What do you want to remember?"
            value={title}
            name="title"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
      </Row>

      <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Date
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="date"
            placeholder="DD/MM/YYYY"
            value={date}
            name="date"
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </Row>
      <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Time
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="time"
            placeholder="HH:MM"
            value={time}
            name="time"
            onChange={e => setTime(e.target.value)}
          />
        </div>
      </Row>
      <Row className="my-md-3">
        <div className=" d-flex pt-2">
          <div className="form-check pl-4">
            <Row>
              <Col xs={6} className="px-3 border-end border-info">
                <span className="text-muted">Group Member</span>
                <div className="d-flex flex-wrap gap-4 my-2">
                  {reminder?.groupId?.groupMembers
                    .filter(
                      member =>
                        member.id && member.id._id !== currentUser.userID
                    )
                    .filter(
                      member =>
                        !selectedMembers.find(
                          selected => selected.id._id === member.id._id
                        )
                    )
                    .map((member, m) => (
                      <div
                        key={m}
                        className="bg-light px-2 py-1 rounded pointer"
                        onClick={() =>
                          handleAddingNewSelectedgroupMembers(member)
                        }
                      >
                        <span>
                          {member.id?.firstname} {member.id?.lastname}
                        </span>
                        <i className="mdi mdi-plus-circle-outline pt-1 px-1" />
                      </div>
                    ))}
                </div>
              </Col>
              <Col xs={6} className="px-3">
                <span className="text-muted">Selected group Members</span>
                <div className="d-flex flex-wrap gap-4 my-2">
                  <div
                    className="bg-success px-2 py-1 rounded pointer"
                    // onClick={() =>
                    //   handleAddingNewSelectedgroupMembers(currentUser?.userID)
                    // }
                  >
                    <span>
                      {currentUser?.firstname} {currentUser?.lastname}
                    </span>
                    <i className="mdi mdi-account-remove-outline pt-1 px-2" />
                  </div>
                  {selectedMembers
                    .filter(member => member.id._id !== currentUser.userID)
                    .map((member, i) => (
                      <div
                        key={i}
                        className="bg-success px-2 py-1 rounded pointer"
                        onClick={() =>
                          handleAddingNewSelectedgroupMembers(member)
                        }
                      >
                        <span>
                          {member?.id?.firstname}
                          {member?.id?.lastname}
                        </span>
                        <i className="mdi mdi-account-remove-outline pt-1 px-2" />
                      </div>
                    ))}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Row>

      <Row>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary "
            data-dismiss="modal"
            onClick={() => {
              handlereminderCancel()
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleReminderUpdate()}
          >
            Update
          </button>
        </div>
      </Row>
    </>
  )
}

EditReminder.propTypes = {
  setEditModalOpen: PropTypes.func,
  setGetReminders: PropTypes.func,
  getReminders: PropTypes.func,
  reminder: PropTypes.func,
}

export default EditReminder