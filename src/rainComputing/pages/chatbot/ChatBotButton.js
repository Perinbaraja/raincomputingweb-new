import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import "./chatbot.css"
import {  Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
const ChatBot = ({ modal_standard, setmodal_standard }) => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    axios
      .post("http://localhost:8080/message", { message: input })
      .then(res => {
        setResponse(res.data.message)
        console.log("res.data.message :",res)
      })
      .catch(err => {
        console.error(err)
      })
  }
  console.log("response:", response)
  const tog_standard = () => {
    setmodal_standard(!modal_standard)
  }

  return (
      <div>
        <Modal
          isOpen={modal_standard}
          toggle={() => {
            tog_standard()
          }}
        >
          <ModalHeader className=" bg-info ">
            <h5 className="text-white px-2 mt-2 ">Chat Bot</h5>
            <button
              type="button"
              onClick={() => {
                setmodal_standard(false)
              }}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </ModalHeader>
          <ModalBody>
            <div className="chat-conversation">
              {response && <p>{response}</p>}
            </div>
          </ModalBody>
          <div className=" mb-2">
            {/* <input
                    className="form-control chat-input  "
                    placeholder="Ask Something..."
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  >
                  </input> */}
            <form onSubmit={handleSubmit}>
              <Row>
                <div className="position-relative d-flex ">
                  <Col>
                    <input
                      className="form-control chat-input  "
                      placeholder="Send a message..."
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                    />{" "}
                  </Col>
                  <Col className="col-auto d-flex">
                    <button
                      className="btn btn-primary btn-rounded chat-send "
                      onSubmit={handleSubmit}
                      type="submit"
                    >
                      <i className="mdi mdi-send" />
                    </button>
                  </Col>
                </div>
              </Row>
            </form>
          </div>
        </Modal>
      </div>
  )
}

ChatBot.propTypes = {
  modal_standard: PropTypes.func,
  setmodal_standard: PropTypes.func,
}

export default ChatBot
