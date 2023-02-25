import { useChat } from "rainComputing/contextProviders/ChatProvider"
import { getPinnedMsg, pinMessage } from "rainComputing/helpers/backend_helper"
import React, { useEffect, useState } from "react"
import { Card, Dropdown, DropdownToggle, Modal } from "reactstrap"
import moment from "moment"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import AttachmentViewer from "../AttachmentViewer"

const PinnedModels = () => {
  const { currentRoom: currentChat,setMessages,messages } = useChat()
  const [pinModal, setPinModal] = useState(false)
  const [pinnedMsg, setPinnedMsg] = useState([])
  const currentChats = currentChat?.groupMembers.map(i => i?.id)

  const getSender = id => currentChats?.find(i => i?._id === id?.sender)

  const tog_scroll = () => {
    setPinModal(!pinModal)
  }
  useEffect(() => {
    if (pinModal) {
      const PinnedMessage = async () => {
        const payload = { groupId: currentChat?._id }
        const res = await getPinnedMsg(payload)
        if (res.success) {
          setMessages(
            messages?.map(m => m?._id === currentChat?._id? res?.pinMessages : m)
          )
          setPinnedMsg(res?.pinMessages)
        }

      }
      PinnedMessage()
    }
  }, [pinModal])

  const text = {
    color: "#0000F9",
  }

  return (
    <>
      <Modal
        isOpen={pinModal}
        toggle={() => {
          tog_scroll()
        }}
        // scrollable={true}
      >
        <div className="modal-header ">
          <h5 className="modal-title mt-0">
            <i className="mdi mdi-pin-outline mdi-rotate-315 text-danger px-2"></i>
            Pinned Message
          </h5>
          <button
            type="button"
            onClick={() => setPinModal(false)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75 ">
            {pinnedMsg &&
              pinnedMsg?.map((msg, m) => (
                <div className=" border border-primary my-2 " key={m}>
                  <div className="conversation-list">
                    <div
                      className="text-wrap   px-2 py-4"
                      style={{
                        backgroundColor: currentChat?.color
                          ? currentChat?.color + "33"
                          : "#00EE00" + "33",
                      }}
                    >
                      <div className="conversation-name ">
                        <p className="text pt-1 " style={text}>
                          {getSender(msg)?.firstname} {getSender(msg)?.lastname}
                        </p>{" "}
                      </div>
                      <div className="mb-1">
                                              {msg.isAttachment ? (
                                                <>
                                                  <AttachmentViewer
                                                    attachments={
                                                      msg.attachments
                                                    }
                                                  />
                                                   <p>{msg?.messageData}</p> 
                                                  <div className="mt-3">
                                                    {" "}
                                                  </div>
                                                  <div
                                                    className="mt-1"
                                                    style={{
                                                      whiteSpace:
                                                        "break-spaces",
                                                    }}
                                                  >
                                                  </div>
                                                </>
                                              ) : (
                                                <div className="mb-1">
                                                <p>{msg?.messageData}</p>
                                              </div>
                                              )}
                                            </div>
                     
                      <p className="chat-time mb-0 ">
                        <i className="bx bx-comment-check align-middle " />
                        {/* <i className="bx bx-time-five align-middle me-1" /> */}
                        {moment(msg.createdAt).format("DD-MM-YY HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>
      <Dropdown isOpen={pinModal} toggle={tog_scroll}>
        <DropdownToggle className="btn nav-btn" tag="i">
          <i
            className="mdi mdi-pin-outline mdi-rotate-315"
            onClick={() => {
              tog_scroll()
            }}
          />
        </DropdownToggle>
      </Dropdown>
    </>
  )
}

export default PinnedModels
