import React, { useCallback, useEffect, useState } from "react"
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
import ReactQuillInput from "rainComputing/components/ReactQuill/ReactQuill"
import RecordRTC from "recordrtc"


const ReplyMsgModal = ({
  open,
  setOpen,
  toggleOpen,
  curMessageId,
  receivers,
  currentChat,
  caseId,
  getChatName,
  mentionsArray,
  handleSendMessage,
  curMessage,
  setcurMessage,
  setAllFiles,
  allFiles,
  handleFileChange,
  handleFileRemove,
  recorder,
  setRecorder,
  setAllVoicemsg,
  allVoicemsg,
  isAttachment,
  blobURL,
  duration,
  isVoiceMessage,
  durationIntervalId,
  setBlobURL,
  setDuration,
  setDurationIntervalId,
  setIsVoiceMessage,
  setIsAttachment,
  startRecording,
  stopRecording,
  subject,
  setSubject
}) => {
  const { currentUser } = useUser();
  const { socket } = useSocket();
  const { setMessages, messages } = useChat();
  const [isQuill, setIsQuill] = useState(false);
  const handlereplyMsgCancel = () => {
    setOpen(false);
  };

  const toggle_Quill = () => {
    setIsQuill(!isQuill);
  };
  useEffect(() => {
    if (Array.from(allFiles)?.length > 0) {
      setIsAttachment(true)
    } else {
      setIsAttachment(false)
    }
  }, [allFiles])
  

  return (
    <>
      <Modal
        size="lg"
        isOpen={open && curMessageId}
        toggle={toggleOpen}
        backdrop={"static"}
        id="staticBackdrop"

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
              <div class=" chat-input-section border border-2 border-primary rounded-4">
                <div className="row">
                  <div className="col">
                    <div className="position-relative">
                      {recorder &&
                        recorder.state === "recording" ? (
                        <div className="border border-primary d-flex justify-content-center recorder">
                          <i
                            className="d-block d-md-inline mdi mdi-microphone font-size-18 text-primary"
                            style={{
                              height: "30px",
                              paddingLeft: "50px",
                            }}
                          ></i>
                          <p
                            className="text-primary mt-1 font-size-12"
                            style={{
                              height: "30px",
                              paddingRight: "50px",
                            }}
                          >
                            {duration}Secs
                          </p>
                        </div>
                      ) : (
                        <>
                          {blobURL ? (
                            <div className="p-5">
                              <audio
                                className="w-100 w-sm-100"
                                style={{
                                  height: "33px",
                                  paddingLeft: "10px",
                                }}
                                src={blobURL}
                                controls="controls"
                              ></audio>
                            </div>
                          ) : (
                            <>
                              <div className="p-2 pt-0">
                                {" "}
                                {Array.from(allFiles)?.length >
                                  0 && (
                                    <div class="d-flex gap-2 flex-wrap mt-2">
                                      {Array.from(allFiles)?.map(
                                        (att, a) => (
                                          <span
                                            class="badge badge-soft-primary font-size-13 p-2"
                                            key={a}
                                          >
                                            {att.name}
                                            <i
                                              class="bx bx-x-circle mx-1"
                                              onClick={() =>
                                                handleFileRemove(
                                                  att?.name
                                                )
                                              }
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            />
                                          </span>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                              <div>
                                <ReactQuillInput
                                  mentionsArray={mentionsArray}
                                  value={curMessage}
                                  onChange={setcurMessage}
                                  isQuill={isQuill}
                                  currentChat={currentChat}
                                  getChatName={getChatName}
                                  setAllFiles={setAllFiles}
                                  subject={subject}
                                  setSubject={setSubject}
                                />
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ position: "absolute", right: "30px", top: "15px" }}>
                <i
                  className="bi bi-type"
                  onClick={() => {
                    toggle_Quill();
                  }}
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  title={isQuill ? "Show Formatting" : "Hide Formatting"}
                ></i>
              </div>
              <div style={{ position: "absolute", right: "15px", top: "50px" }}>
                <input
                  type="file"
                  name="file"
                  multiple="true"
                  id="hidden-file"
                  className="d-none"
                  accept=".png, .jpg, .jpeg,.pdf,.doc,.xls,.docx,.xlsx,.zip,.mp3,.webm"
                  onChange={e => handleFileChange(e)}
                ></input>
                <label
                  for="hidden-file"
                  style={{ margin: "10px" }}
                >
                  <i
                    class="mdi mdi-attachment mdi-rotate-315"
                    disabled={
                      recorder?.state === "recording"
                    }
                    title="Attachments"
                    style={{
                      // color: "#556EE6",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  ></i>
                </label>
                {recorder &&
                  recorder.state === "recording" ? (
                  <i
                    className="mdi mdi-microphone font-size-20 text-danger me-2"
                    title="Stop Recording"
                    onClick={stopRecording}
                    disabled={recorder?.state == "stopped"}
                    style={{
                      cursor: "pointer",
                      paddingTop: "6px",
                    }}
                  ></i>
                ) : (
                  <i
                    className="mdi mdi-microphone font-size-20  me-2"
                    title="Start Recording"
                    onClick={startRecording}
                    disabled={recorder?.state == "recording"}
                    style={{
                      cursor: "pointer",
                      paddingTop: "6px",
                    }}
                  ></i>
                )}
            
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
            onClick={() => handleSendMessage(curMessageId?._id)}
          >
            Send
          </button>
        </div>
      </Modal >
    </>
  );
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
  getChatName: PropTypes.any,
  mentionsArray: PropTypes.any,
  handleSendMessage: PropTypes.any,
  setAllFiles: PropTypes.any,
  allFiles: PropTypes.any,
  handleFileChange: PropTypes.any,
  handleFileRemove: PropTypes.any,
  curMessage: PropTypes.any,
  setcurMessage: PropTypes.any,
  setAllVoicemsg: PropTypes.any,
  setRecorder: PropTypes.any,
  recorder: PropTypes.any,
  allVoicemsg: PropTypes.any,
  isAttachment: PropTypes.any,
  blobURL: PropTypes.any,
  duration: PropTypes.any,
  isVoiceMessage: PropTypes.any,
  startRecording: PropTypes.any,
  stopRecording: PropTypes.any,
  durationIntervalId: PropTypes.any,
  setDurationIntervalId: PropTypes.any,
  setBlobURL: PropTypes.any,
  setIsAttachment: PropTypes.any,
  setIsVoiceMessage: PropTypes.any,
  setDuration: PropTypes.any,
  subject: PropTypes.any,
  setSubject: PropTypes.any,
}
export default ReplyMsgModal
