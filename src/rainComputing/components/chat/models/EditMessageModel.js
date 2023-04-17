import { useUser } from "rainComputing/contextProviders/UserProvider"
import React, { useEffect, useState } from "react"
import { Mention, MentionsInput } from "react-mentions"
import { Col, Modal, Row } from "reactstrap"
import PropTypes from "prop-types"
import { messageUpdate } from "rainComputing/helpers/backend_helper"
import { useChat } from "rainComputing/contextProviders/ChatProvider"

const EditMessageModel = ({ open, setOpen, toggleOpen, curMessageId }) => {
  const { setMessages, messages } = useChat()
  const { currentUser } = useUser()
  const [updateMessages, setUpdateMessages] = useState(null)

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
                <MentionsInput
                  type="text"
                  value={updateMessages}
                  style={{
                    resize: "none",
                    height: "auto",
                    overflow: "hidden",
                  }}
                  onChange={e => setUpdateMessages(e.target.value)}
                  className="form-control chat-input"
                  defaultValue={messages?.find(
                    m => m._id === curMessageId?.messageData
                  )}
                >
                     <Mention trigger="@" />
                </MentionsInput>
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
