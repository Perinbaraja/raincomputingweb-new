import React, { useCallback, useEffect, useState } from "react"

import { MetaTags } from "react-meta-tags"
// import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
import moment from "moment"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
} from "reactstrap"
import classnames from "classnames"

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

//Custom
import images from "assets/images"

//JSON

import {
  createChatRoom,
  getAllAttorneys,
  getAllChatRooms,
  getAllUsers,
  getRoomMessages,
} from "rainComputing/helpers/backend_helper"
import { useNotifications } from "rainComputing/contextProviders/NotificationsProvider"
import { useChat } from "rainComputing/contextProviders/ChatProvider"

import profile from "assets/images/avatar-defult.jpg"

// const initialGroupMember = [currentUser.userID]
const RcChat = () => {
  const currentUser = JSON.parse(localStorage.getItem("authUser"))

  const {
    chats,
    setChats,
    currentRoom,
    setCurrentRoom,
    getRoomsonEveryMessage,
    handleSendingMessage,
    messages,
    setMessages,
  } = useChat()
  const { notifications, setNotifications } = useNotifications()

  const [messageBox, setMessageBox] = useState(null)
  // eslint-disable-next-line no-unused-vars
  //   const [currentUser, setCurrentUser] = useState({
  //     name: "Henry Wells",
  //     isActive: true,
  //   })
  const [menu1, setMenu1] = useState(false)
  const [search_Menu, setsearch_Menu] = useState(false)
  const [settings_Menu, setsettings_Menu] = useState(false)
  const [other_Menu, setother_Menu] = useState(false)
  const [activeTab, setactiveTab] = useState("1")
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online")
  const [curMessage, setcurMessage] = useState("")

  //Custom
  const [contacts, setContacts] = useState([])
  const [recivers, setRecivers] = useState([])
  const [createGroupModal, setCreateGroupModal] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupMembers, setGroupMembers] = useState([])
  const [groupCreationLoader, setGroupCreationLoader] = useState(false)

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom()
  }, [messages])

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu)
  }

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu)
  }

  const toggleOther = () => {
    setother_Menu(!other_Menu)
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  //Use For Chat Box

  const addMessage = async () => {
    if (curMessage) {
      const msgData = {
        chatRoomId: currentRoom._id,
        sender: currentUser.userID,
        receivers: recivers,
        messageData: curMessage,
        createdAt: Date.now(),
      }
      handleSendingMessage(msgData)
      setMessages([...messages, { message: msgData }])
      await getRoomsonEveryMessage()
      setcurMessage("")
    }
  }

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  const onKeyPress = e => {
    const { key, value } = e
    if (key === "Enter") {
      addMessage()
    }
  }

  const ongetAllChatRooms = async () => {
    const chatRoomsRes = await getAllChatRooms({ userID: currentUser.userID })
    if (chatRoomsRes.success) {
      setChats(chatRoomsRes.chats)
      setCurrentRoom(chatRoomsRes.chats[0])
      if (chatRoomsRes.chats.length < 1) {
        setactiveTab("3")
      }
    } else {
      setChats([])
    }
  }

  const handleCreateChatRoom = useCallback(async memberId => {
    const members = [currentUser.userID, memberId]
    const createdRoomRes = await createChatRoom({ members })
    if (createdRoomRes.success) {
      await ongetAllChatRooms()
      setactiveTab("1")
    } else {
      console.log("Error : ", createdRoomRes?.msg || "error")
    }
  }, [])

  const getNotificationCount = id => {
    const notiCount = notifications.filter(c => c.chatRoomId === id)
    return notiCount ? notiCount.length : 0
  }

  const getChatName = members => {
    const chatMember = members.filter(
      member => member._id !== currentUser.userID
    )
    return chatMember[0].firstname + " " + chatMember[0].lastname
  }

  const getMemberName = id => {
    const memberName = currentRoom.members.find(member => member._id === id)
    if (memberName) return memberName.firstname + " " + memberName.lastname
    return "Guest"
  }

  const toggle_createGroupModal = () => {
    setCreateGroupModal(!createGroupModal)
    document.body.classList.add("no_padding")
  }

  const handleGroupCreationCancel = () => {
    setGroupMembers(initialGroupMember)
    setGroupName("")
    setCreateGroupModal(!createGroupModal)
  }

  const handleAddingGroupMembers = id => {
    if (groupMembers.includes(id)) {
      const membersAfterRemove = groupMembers.filter(m => m !== id)
      setGroupMembers(membersAfterRemove)
    } else {
      setGroupMembers([...groupMembers, id])
    }
  }

  const handleGroupCreation = async () => {
    setGroupCreationLoader(true)
    if (groupMembers.length < 1 && !groupName) {
      console.log("You need more members to create Group or Provide group name")
    } else {
      const payLoad = {
        members: [currentUser.userID, ...groupMembers],
        isGroup: true,
        groupName: groupName,
      }
      const createdRoomRes = await createChatRoom(payLoad)
      if (createdRoomRes.success) {
        await ongetAllChatRooms()
      } else {
        console.log("Error : ", createdRoomRes?.msg || "error")
      }
    }
    setCreateGroupModal(false)
    setGroupCreationLoader(false)
  }

  useEffect(() => {
    /* To Set Attorney as Contacts */
    // const onGetContacts = async () => {
    //   const attorneyRes = await getAllAttorneys({
    //     page: 1,
    //     limit: 10,
    //     searchText: "a",
    //   })
    //   if (attorneyRes.success) {
    //     setContacts(attorneyRes.attorneys)
    //   } else {
    //     setContacts([])
    //   }
    // }

    /* To Set User as Contacts */
    const onGetContacts = async () => {
      const userRes = await getAllUsers({ userID: currentUser.userID })
      if (userRes.success) {
        setContacts(userRes.users)
      } else {
        setContacts([])
      }
    }
    onGetContacts()
    ongetAllChatRooms()
    return () => setCurrentRoom(null)
  }, [])

  useEffect(() => {
    if (currentRoom) {
      if (notifications.length > 0) {
        const filteredNotification = notifications.filter(
          n => n.chatRoomId !== currentRoom._id
        )
        setNotifications(filteredNotification)
      }
      setRecivers(
        currentRoom.members
          .filter(m => m._id !== currentUser.userID)
          .map(r => r._id)
      )
      const onGetMessages = async () => {
        const messagesRes = await getRoomMessages({
          chatRoomId: currentRoom._id,
        })
        if (messagesRes.success) {
          setMessages(messagesRes.messages)
        } else {
          setMessages([])
        }
      }
      onGetMessages()
    }
  }, [currentRoom])

  return (
    <>
      <div className="page-content">
        <>
          <Modal
            size="lg"
            isOpen={createGroupModal}
            toggle={() => {
              toggle_createGroupModal()
            }}
            backdrop={"static"}
            id="staticBackdrop"
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myLargeModalLabel">
                New Group
              </h5>
              <button
                onClick={() => {
                  handleGroupCreationCancel()
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
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Group name
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="My Group 1"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <p className="col-md-2 text-center mt-1">Select Members</p>
                <div
                  className="col-md-10 px-1 d-flex flex-wrap"
                  style={{ height: "max-content" }}
                >
                  {contacts.map((contact, i) => (
                    <Button
                      key={i}
                      color={
                        groupMembers.includes(contact._id) ? "success" : "light"
                      }
                      className="btn-rounded mx-1 mb-2"
                      onClick={() => handleAddingGroupMembers(contact._id)}
                    >
                      {contact.firstname} {contact.lastname}
                    </Button>
                  ))}
                </div>
              </Row>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  handleGroupCreationCancel()
                }}
                className="btn btn-secondary "
                data-dismiss="modal"
              >
                Close
              </button>
              {groupCreationLoader ? (
                <button type="button" className="btn btn-dark ">
                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                  Loading
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleGroupCreation()}
                >
                  Create Group
                </button>
              )}
            </div>
          </Modal>
        </>
        <MetaTags>
          <title>Chat</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div className="">
                    <div className="py-4 border-bottom">
                      <div className="d-flex">
                        <div className="align-self-center me-3">
                          <img
                            src={images.avatar1}
                            className="avatar-xs rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="font-size-15 mt-0 mb-1">
                            {/* {currentUser.name} */}
                            {currentUser?.username}
                          </h5>
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-circle text-success align-middle me-1" />
                            Active
                          </p>
                        </div>

                        <Dropdown
                          isOpen={menu1}
                          toggle={() => setMenu1(!menu1)}
                          className="float-end ms-2"
                        >
                          <DropdownToggle tag="i" className="text-muted">
                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem href="#">Action</DropdownItem>
                            <DropdownItem href="#">Another action</DropdownItem>
                            <DropdownItem href="#">Something else</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="search-box chat-search-box py-4">
                      <div className="position-relative">
                        <Input
                          id="search-user"
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>

                    <div className="chat-leftsidebar-nav">
                      <Nav pills justified>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1")
                            }}
                          >
                            <i className="bx bx-chat font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Chat</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggleTab("2")
                            }}
                          >
                            <i className="bx bx-group font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Groups</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggleTab("3")
                            }}
                          >
                            <i className="bx bx-book-content font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Contacts</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab} className="py-4">
                        <TabPane tabId="1">
                          <div>
                            <h5 className="font-size-14 mb-3">Recent</h5>
                            <ul
                              className="list-unstyled chat-list"
                              id="recent-list"
                            >
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {map(chats, chat => (
                                  <li
                                    key={chat._id}
                                    className={
                                      currentRoom &&
                                      currentRoom._id === chat._id
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => setCurrentRoom(chat)}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">
                                          {/* <i
                                            className={
                                              chat.status === "online"
                                                ? "mdi mdi-circle text-success font-size-10"
                                                : chat.status === "intermediate"
                                                ? "mdi mdi-circle text-warning font-size-10"
                                                : "mdi mdi-circle font-size-10"
                                            }
                                          /> */}
                                          {getNotificationCount(chat._id) >
                                            0 && (
                                            <span className="badge bg-danger rounded-pill">
                                              {getNotificationCount(chat._id)}
                                            </span>
                                          )}
                                        </div>
                                        <div className="align-self-center me-3">
                                          <img
                                            src={profile}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                          />
                                        </div>

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {chat.isGroup
                                              ? chat.groupName
                                              : getChatName(chat.members)}
                                          </h5>
                                          <p className="text-truncate mb-0">
                                            {chat.description}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {moment(chat.lastModified).format(
                                            "DD-MM-YY hh:mm"
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>

                        <TabPane tabId="2">
                          <div className="d-grid gap-2">
                            <button
                              type="button"
                              className="btn btn-info btn-rounded mb-2"
                              onClick={() => toggle_createGroupModal()}
                            >
                              Create group
                              <i className="bx bx-pencil font-size-16 align-middle me-2 mx-2"></i>
                            </button>
                          </div>
                          <h5 className="font-size-14 mb-3">Group</h5>
                          <ul className="list-unstyled chat-list">
                            <PerfectScrollbar style={{ height: "410px" }}>
                              {chats &&
                                chats
                                  .filter(c => c.isGroup)
                                  .map(group => (
                                    <li
                                      key={group._id}
                                      className={
                                        currentRoom &&
                                        currentRoom._id === group._id
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <Link
                                        to="#"
                                        onClick={() => setCurrentRoom(group)}
                                      >
                                        <div className="d-flex align-items-center">
                                          {getNotificationCount(group._id) >
                                            0 && (
                                            <span className="badge bg-danger rounded-pill">
                                              {getNotificationCount(group._id)}
                                            </span>
                                          )}
                                          {/* <div className="avatar-xs me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {group.image}
                                            </span>
                                          </div> */}

                                          <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="font-size-14 mb-0">
                                              {group.groupName}
                                            </h5>
                                          </div>
                                          <div className="font-size-11">
                                            {moment(group.lastModified).format(
                                              "DD-MM-YY hh:mm"
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                            </PerfectScrollbar>
                          </ul>
                        </TabPane>

                        <TabPane tabId="3">
                          <h5 className="font-size-14 mb-3">Contact</h5>

                          <div>
                            <PerfectScrollbar style={{ height: "310px" }}>
                              {contacts &&
                                contacts.map((contact, i) => (
                                  <ul
                                    key={i}
                                    className="list-unstyled chat-list"
                                  >
                                    <li>
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          handleCreateChatRoom(contact._id)
                                        }}
                                      >
                                        <div className="d-flex justify-content-between">
                                          <h5 className="font-size-14 mb-0">
                                            {contact.firstname}{" "}
                                            {contact.lastname}
                                          </h5>
                                          <i className="font-size-24 bx bxl-messenger me-2" />
                                        </div>
                                      </Link>
                                    </li>
                                  </ul>
                                ))}
                            </PerfectScrollbar>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </div>
                {currentRoom && (
                  <div className="w-100 user-chat">
                    <Card>
                      <div className="p-4 border-bottom ">
                        <Row>
                          <Col md="4" xs="9">
                            <h5 className="font-size-15 mb-1">
                              {currentRoom.isGroup
                                ? currentRoom.groupName
                                : getChatName(currentRoom.members)}
                            </h5>

                            <p className="text-muted mb-0">
                              <i
                                className={
                                  Chat_Box_User_Status === "online"
                                    ? "mdi mdi-circle text-success align-middle me-1"
                                    : Chat_Box_User_Status === "intermediate"
                                    ? "mdi mdi-circle text-warning align-middle me-1"
                                    : "mdi mdi-circle align-middle me-1"
                                }
                              />
                              {Chat_Box_User_Status}
                            </p>
                          </Col>
                          <Col md="8" xs="3">
                            <ul className="list-inline user-chat-nav text-end mb-0">
                              <li className="list-inline-item d-none d-sm-inline-block">
                                <Dropdown
                                  isOpen={search_Menu}
                                  toggle={toggleSearch}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-search-alt-2" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-md">
                                    <Form className="p-3">
                                      <FormGroup className="m-0">
                                        <InputGroup>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
                                            aria-label="Recipient's username"
                                          />
                                          {/* <InputGroupAddon addonType="append"> */}
                                          <Button color="primary" type="submit">
                                            <i className="mdi mdi-magnify" />
                                          </Button>
                                          {/* </InputGroupAddon> */}
                                        </InputGroup>
                                      </FormGroup>
                                    </Form>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                              <li className="list-inline-item  d-none d-sm-inline-block">
                                <Dropdown
                                  isOpen={settings_Menu}
                                  toggle={toggleSettings}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-cog" />
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem href="#">
                                      View Profile
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      Clear chat
                                    </DropdownItem>
                                    <DropdownItem href="#">Muted</DropdownItem>
                                    <DropdownItem href="#">Delete</DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                              <li className="list-inline-item">
                                <Dropdown
                                  isOpen={other_Menu}
                                  toggle={toggleOther}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-dots-horizontal-rounded" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="#">Action</DropdownItem>
                                    <DropdownItem href="#">
                                      Another Action
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      Something else
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <div className="chat-conversation p-3">
                          <ul className="list-unstyled">
                            <PerfectScrollbar
                              style={{ height: "470px" }}
                              containerRef={ref => setMessageBox(ref)}
                            >
                              <li>
                                <div className="chat-day-title">
                                  <span className="title">Today</span>
                                </div>
                              </li>
                              {messages &&
                                messages.map((msg, m) => (
                                  <li
                                    key={"test_k" + m}
                                    className={
                                      msg.message.sender === currentUser.userID
                                        ? "right"
                                        : ""
                                    }
                                  >
                                    <div className="conversation-list">
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          href="#"
                                          className="btn nav-btn"
                                          tag="i"
                                        >
                                          <i className="bx bx-dots-vertical-rounded" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem href="#">
                                            Copy
                                          </DropdownItem>
                                          <DropdownItem href="#">
                                            Save
                                          </DropdownItem>
                                          <DropdownItem href="#">
                                            Forward
                                          </DropdownItem>
                                          <DropdownItem href="#">
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                      <div
                                        className="ctext-wrap"
                                        style={{
                                          backgroundColor:
                                            msg.message.sender ==
                                              currentUser.userID && "#b3ffb3",
                                        }}
                                      >
                                        <div className="conversation-name">
                                          {getMemberName(msg.message.sender)}
                                        </div>
                                        <p>{msg.message.messageData}</p>
                                        <p className="chat-time mb-0">
                                          <i className="bx bx-time-five align-middle me-1" />
                                          {moment(msg.createdAt).format(
                                            "DD-MM-YY hh:mm"
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </PerfectScrollbar>
                          </ul>
                        </div>
                        <div className="p-3 chat-input-section">
                          <Row>
                            <Col>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  value={curMessage}
                                  onKeyPress={onKeyPress}
                                  onChange={e => setcurMessage(e.target.value)}
                                  className="form-control chat-input"
                                  placeholder="Enter Message..."
                                />
                                <div className="chat-input-links">
                                  <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                      <Link to="#">
                                        <i
                                          className="mdi mdi-emoticon-happy-outline"
                                          id="Emojitooltip"
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="Emojitooltip"
                                        >
                                          Emojis
                                        </UncontrolledTooltip>
                                      </Link>
                                    </li>
                                    <li className="list-inline-item">
                                      <Link to="#">
                                        <i
                                          className="mdi mdi-file-image-outline"
                                          id="Imagetooltip"
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="Imagetooltip"
                                        >
                                          Images
                                        </UncontrolledTooltip>
                                      </Link>
                                    </li>
                                    <li className="list-inline-item">
                                      <Link to="#">
                                        <i
                                          className="mdi mdi-file-document-outline"
                                          id="Filetooltip"
                                        />
                                        <UncontrolledTooltip
                                          placement="top"
                                          target="Filetooltip"
                                        >
                                          Add Files
                                        </UncontrolledTooltip>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Col>
                            <Col className="col-auto">
                              <Button
                                type="button"
                                color="primary"
                                onClick={() => addMessage()}
                                className="btn btn-primary btn-rounded chat-send w-md "
                              >
                                <span className="d-none d-sm-inline-block me-2">
                                  Send
                                </span>{" "}
                                <i className="mdi mdi-send" />
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default RcChat
