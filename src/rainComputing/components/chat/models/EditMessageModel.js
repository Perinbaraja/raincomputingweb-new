import { useUser } from "rainComputing/contextProviders/UserProvider"
import React, { useEffect, useState } from "react"
import { Mention, MentionsInput } from "react-mentions"
import { Col, Modal, Row } from "reactstrap"
import PropTypes from "prop-types"
import { messageUpdate } from "rainComputing/helpers/backend_helper"
import { useChat } from "rainComputing/contextProviders/ChatProvider"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import ReactQuillInput from "rainComputing/components/ReactQuill/ReactQuill"

const EditMessageModel = ({ open, setOpen, toggleOpen, curMessageId }) => {
  const { setMessages, messages } = useChat()
  const { currentUser } = useUser()
  const [updateMessages, setUpdateMessages] = useState(null)

  const [isQuill, setIsQuill] = useState(false)
  const toggle_Quill = () => {
    setIsQuill(!isQuill)
}

  const handleUpdateMsgCancel = () => {
    setOpen(false)
  }
  const handleUpdateMessage = async id => {
    const payload = {
      _id: id,
      // sender: currentUser?.userID,
      messageData: updateMessages,
    }
    const res = await messageUpdate(payload)
    if (res?.success) {
      console.log("success :", res?.success)

      setMessages(messages?.map(m => (m?._id === id ? res?.updatedMessage : m)))
      setUpdateMessages(curMessageId)
    }
    setOpen(false)
  }

  useEffect(() => {
    setUpdateMessages(curMessageId?.messageData)
  }, [curMessageId?.messageData])
  return (
    <>
      <Modal
        size="lg"
        isOpen={open && curMessageId}
        toggle={toggleOpen}
        backdrop="static"
        id="staticBackdrop"
        centered
      >
        <div className="modal-header">
          <button
            onClick={handleUpdateMsgCancel}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <h5>Update Message:</h5>
          <Row>
            <Col>
              <div className="position-relative">
                <ReactQuillInput
                  value={updateMessages}
                  onChange={setUpdateMessages}
                  messages={messages}
                  curMessageId={curMessageId}
                  isQuill={isQuill}
                />
              </div>
              <div style={{ position: "absolute", right: "30px", top: "7px" }}>
                <i className="bi bi-type"
                  onClick={() => { toggle_Quill() }}
                  style={{ color: "black", fontSize: "20px", fontWeight: "bold", cursor: "pointer" }}

                  title={isQuill ? "Show Formatting" : "Hide Formatting"}
                ></i>
              </div>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={handleUpdateMsgCancel}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            Close
          </button>

          {updateMessages && updateMessages !== null && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleUpdateMessage(curMessageId?._id)}
            >
              Update
            </button>
          )}
        </div>
      </Modal>
    </>
  )
}

EditMessageModel.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  toggleOpen: PropTypes.func,
  curMessageId: PropTypes.any,
  msgData: PropTypes.array,
}

export default EditMessageModel
