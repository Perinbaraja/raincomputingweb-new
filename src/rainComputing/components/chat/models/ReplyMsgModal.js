import React, { useState } from "react"
import { Mention, MentionsInput } from "react-mentions"
import { Col, Modal, Row } from "reactstrap"
import PropTypes from "prop-types"
import {
  getMessagesByUserIdandGroupId,
  postReplies,
} from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { useChat } from "rainComputing/contextProviders/ChatProvider"

const ReplyMsgModal = ({ open, setOpen, toggleOpen, curMessageId }) => {
  const { currentUser } = useUser()
  const { currentRoom: currentChat } = useChat()
  const [replyMessage, setReplyMessage] = useState("")

  const handlereplyMsgCancel = () => {
    setOpen(false)
  }
  
  const handleReplyMessage = async id => {
    const payload = {
      id,
      sender: currentUser?.userID,
      msg: replyMessage,
    }

    const res = await postReplies(payload)
    const payloadMsg = {
      groupId: currentChat?._id,
      userId: currentUser?.userID,
    }
    await getMessagesByUserIdandGroupId(payloadMsg)
    setReplyMessage("")
    setOpen(false)
  }

  return (
    <>
      <Modal
        size="lg"
        isOpen={open && curMessageId}
        toggle={toggleOpen}
        backdrop={"static"}
        id="staticBackdrop"
        centered
      >
        <div className="modal-header">
          <button
            onClick={() => {
              handlereplyMsgCancel()
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <h5>Reply :</h5>
          <Row>
            <Col>
              <div className="position-relative">
                <MentionsInput
                  type="text"
                  value={replyMessage}
                  style={{
                    resize: "none",
                  }}
                  onChange={e => setReplyMessage(e.target.value)}
                  className="form-control chat-input"
                  placeholder="Enter Message..."
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
            onClick={() => {
              handlereplyMsgCancel()
            }}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            Close
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleReplyMessage(curMessageId?._id)}
          >
            Send
          </button>
        </div>
      </Modal>
    </>
  )
}

ReplyMsgModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  toggleOpen: PropTypes.func,
  curMessageId: PropTypes.any,
}
export default ReplyMsgModal
