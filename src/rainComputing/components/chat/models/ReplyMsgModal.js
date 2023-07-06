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
import { useSocket } from "rainComputing/contextProviders/SocketProvider"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const ReplyMsgModal = ({
  open,
  setOpen,
  toggleOpen,
  curMessageId,
  receivers,
  currentChat,
  caseId,
}) => {
  const { currentUser } = useUser()
  const { socket } = useSocket()
  const { setMessages, messages } = useChat()
  const [replyMessage, setReplyMessage] = useState("")
  const handlereplyMsgCancel = () => {
    setOpen(false)
  }
  // const [isQuill, setIsQuill] = useState(false)
  // const toggle_Quill = () => {
  //   setIsQuill(!isQuill)
  // }
  const handleReplyMessage = async id => {
    const payload = {
      id,
      sender: currentUser?.userID,
      currentChat,
      groupId: currentChat?._id,
      caseId: caseId,
      receivers,
      msg: replyMessage,
      isReply: true,
    }

    const res = await postReplies(payload)

    if (res?.success) {
      setMessages(messages?.map(m => (m?._id === id ? res?.replyMessage : m)))
      socket.emit("s_r", payload)

      setReplyMessage("")
      setOpen(false)
    }
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
                <ReactQuill
                  theme="snow"
                  style={{
                    resize: "none",
                    height: "auto",
                  }}
                  value={replyMessage}
                  onChange={setReplyMessage}
                  placeholder="Enter Message..."
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          {/* <i style={{ marginRight: "30px", marginTop: "8px", fontSize: "14px",cursor: "pointer" }}
            onClick={toggle_Quill}
            className="bi bi-menu-button-wide-fill text-primary"></i> */}
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
  socket: PropTypes.any,
  receivers: PropTypes.any,
  currentChat: PropTypes.any,
  caseId: PropTypes.any,
}
export default ReplyMsgModal
