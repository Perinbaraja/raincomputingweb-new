import React, { useEffect, useState } from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import PropTypes from "prop-types"
import { createReminder } from "rainComputing/helpers/backend_helper"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useChat } from "rainComputing/contextProviders/ChatProvider"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import moment from "moment"
const ChatRemainder = ({ setModalOpen, curMessageId }) => {
  const { currentRoom: currentChat, setMessages, messages } = useChat()
  const { currentUser } = useUser()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])

  const [userId, setUserId] = useState(null)
  const [isChecked, setIsChecked] = useState("")

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

  const handleAddingNewSelectedgroupMembers = id => {
    if (selectedMembers.includes(id)) {
      const membersAfterRemove = selectedMembers.filter(m => m !== id)
      setSelectedMembers(membersAfterRemove)
    } else {
      setSelectedMembers([...selectedMembers, id])
    }
  }

  const handleChange = e => {
    setIsChecked(e.target.checked)
  }
  const handlereminderCancel = () => {
    setModalOpen(false)
  }
  // const handleReminderCreate = async () => {
  //   const payload = {
  //     groupId: currentChat?._id,
  //     selectedMembers: [currentUser?.userID, ...selectedMembers],
  //     messageId: curMessageId,
  //     title: title,
  //     date: date,
  //     time: time,
  //   }
  //   if (isChecked) {
  //     payload.userId = currentUser?.userID
  //   }
  //   const reminderData = await createReminder(payload)
  //   if (reminderData.success) {
  //     console.log("remindata :",reminderData)
  //     toastr.success("Reminder Create Successfully")
  //     setModalOpen(false)
  //   } else {
  //     toastr.error(`${reminderData?.msg}`)
  //     setModalOpen(false)
  //   }
  // }
  const handleReminderCreate = async () => {
    const scheduledTime = new Date(`${date}T${time}:00.000Z`).toISOString()

    const payload = {
      groupId: currentChat?._id,
      selectedMembers: [currentUser?.userID, ...selectedMembers],
      messageId: curMessageId,
      title: title,
      scheduledTime: scheduledTime, // Pass the scheduledTime value to the API
      createdBy:currentUser?.userID,
    }

    if (isChecked) {
      payload.userId = currentUser?.userID
    }

    const reminderData = await createReminder(payload)

    if (reminderData.success) {
      // console.log("remindata :",reminderData)
      toastr.success("Reminder Create Successfully")
      setModalOpen(false)
    } else {
      toastr.error(`${reminderData?.msg}`)
      setModalOpen(false)
    }
  }

  const getMemberName = id => {
    const memberName = currentChat?.groupMembers?.find(
      member => member?.id?._id === id
    )
    if (memberName)
      return memberName?.id?.firstname + " " + memberName?.id?.lastname
    return id
  }
  return (
    <>
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
            {/* <input
              className="form-check-input "
              type="checkbox"
              id="flexCheckDefault"
              value={userId}
              onChange={handleChange}
              checked={isChecked}
            />
            <label className="form-check-label ms-2" htmlFor="flexCheckDefault">
              ** Keep it as a reminder for yourself
            </label> */}

            <Row>
              <Col xs={6} className="px-3 border-end border-info">
                <span className="text-muted">Group Member</span>
                <div className="d-flex flex-wrap gap-4 my-2">
                  {currentChat &&
                    currentChat.groupMembers
                      .filter(f => !selectedMembers.some(g => g === f?.id?._id))
                      .filter(a => a?.id?._id !== currentUser?.userID)
                      .map((member, m) => (
                        <div
                          key={m}
                          className="bg-light px-2 py-1 rounded pointer"
                          onClick={() =>
                            handleAddingNewSelectedgroupMembers(member?.id?._id)
                          }
                        >
                          <span>
                            {member?.id?.firstname} {member?.id?.lastname}
                          </span>
                          <i className="mdi mdi-plus-circle-outline pt-1 px-1" />
                        </div>
                      ))}
                </div>
              </Col>
              <Col xs={6} className="px-3">
                <span className="text-muted">Selected group Member</span>
                <div className="d-flex flex-wrap gap-4 my-2">
                  <div
                    className="bg-success px-2 py-1 rounded pointer"
                    onClick={() => handleAddingNewSelectedgroupMembers(member)}
                  >
                    <span>
                      {currentUser?.firstname} {currentUser?.lastname}
                    </span>
                    <i className="mdi mdi-account-remove-outline pt-1 px-2" />
                  </div>
                  {selectedMembers &&
                    selectedMembers.map((member, m) => (
                      <div
                        key={m}
                        className="bg-success px-2 py-1 rounded pointer"
                        onClick={() =>
                          handleAddingNewSelectedgroupMembers(member)
                        }
                      >
                        <span>
                          {getMemberName(member)}
                          {/* {member?.id?.firstname} {member?.id?.lastname} */}
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
            onClick={() => handleReminderCreate()}
          >
            Confirm
          </button>
        </div>
      </Row>
    </>
  )
}

ChatRemainder.propTypes = {
  setModalOpen: PropTypes.func,
  curMessageId: PropTypes.any,
}

export default ChatRemainder
