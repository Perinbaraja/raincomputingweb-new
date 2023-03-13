import React, { useState } from "react"
import { Row } from "reactstrap"
import PropTypes from "prop-types"
import { createReminder } from "rainComputing/helpers/backend_helper"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useChat } from "rainComputing/contextProviders/ChatProvider"

const ChatRemainder = ({ setModalOpen, curMessageId }) => {
  const { currentRoom: currentChat,setMessages,messages } = useChat()

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  const handlereminderCancel = () => {
    setModalOpen(false)
  }
  const handleReminderCreate = async () => {
    const payload = {
      groupId: currentChat?._id,
      messageId: curMessageId,
      title: title,
      date: date,
      time: time,
    }
    const reminderData = await createReminder(payload)
    if (reminderData.success) {
      console.log("data",reminderData)
      toastr.success("Reminder Create success")
      setModalOpen(false)
    } else {
      toastr.error(`${reminderData?.msg}`)
      setModalOpen(false)
    }
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
            value= {time}
            name="time"
            onChange={e => setTime(e.target.value)}
          />
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
