import React, { useEffect, useState, Suspense, lazy, useCallback } from "react"
import { MetaTags } from "react-meta-tags"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import profile from "assets/images/avatar-defult.jpg"
import UserDropdown from "rainComputing/components/chat/UserDropdown"
import classNames from "classnames"
import ChatboxSettingDropdown from "rainComputing/components/chat/ChatboxSettingDropdown"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import TextareaAutosize from "react-textarea-autosize"
import {
  createOnevsOneChat,
  getAllUsers,
  getCasesByUserId,
  getGroupsByUserIdandCaseId,
  getMessagesByUserIdandGroupId,
  getOnevsOneChat,
  updateCase,
} from "rainComputing/helpers/backend_helper"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
import DynamicModel from "rainComputing/components/modals/DynamicModal"
import { useToggle } from "rainComputing/helpers/hooks/useToggle"
import DynamicSuspense from "rainComputing/components/loader/DynamicSuspense"
import { initialNewCaseValues } from "rainComputing/helpers/initialFormValues"
import { FakeCases } from "../FakeData"
import CaseGrid from "rainComputing/components/chat/CaseGrid"
import useAccordian from "rainComputing/helpers/hooks/useAccordian"
import SubgroupBar from "rainComputing/components/chat/SubgroupBar"
import { useChat } from "rainComputing/contextProviders/ChatProvider"
import moment from "moment"
import axios from "axios"
import { SERVER_URL } from "rainComputing/helpers/configuration"
import AttachmentViewer from "rainComputing/components/chat/AttachmentViewer"
import NoChat from "rainComputing/components/chat/NoChat"
import DeleteModal from "rainComputing/components/modals/DeleteModal"
import { useModal } from "rainComputing/helpers/hooks/useModal"

const CreateCase = lazy(() =>
  import("rainComputing/components/chat/CreateCase")
)
const SubGroups = lazy(() => import("rainComputing/components/chat/SubGroups"))

//Chat left sidebar nav items
const sidebarNavItems = ["Chat", "Case", "Contact"]
//Chat subGroupColors
const subGroupColors = ["#0000ff", "#ffa500", "#ffc0cb", "#87ceeb"]

const ChatRc = () => {
  const { currentUser } = useUser()
  const {
    toggleOpen: newCaseModelOpen,
    setToggleOpen: setNewCaseModelOpen,
    toggleIt: toggleNewCaseModelOpen,
  } = useToggle(false)
  const {
    toggleOpen: subGroupModelOpen,
    setToggleOpen: setSubGroupModelOpen,
    toggleIt: togglesubGroupModelOpen,
  } = useToggle(false)
  const {
    toggleOpen: chatSettingOpen,
    setToggleOpen: setChatSettingOpen,
    toggleIt: toggleChatSettingOpen,
  } = useToggle(false)
  const {
    chats,
    setChats,
    currentRoom: currentChat,
    setCurrentRoom: setCurrentChat,
    getRoomsonEveryMessage,
    handleSendingMessage,
    messages,
    setMessages,
    messageStack,
  } = useChat()

  const { activeAccordian, handleSettingActiveAccordion } = useAccordian(-1)

  const [modalOpen, setModalOpen, toggleModal] = useModal(false)
  const [messageBox, setMessageBox] = useState(null)
  const [pageLoader, setPageLoader] = useState(true)
  const [activeTab, setactiveTab] = useState("1")
  const [contacts, setContacts] = useState([])
  const [newCase, setNewCase] = useState(initialNewCaseValues)
  const [allCases, setAllCases] = useState([])
  const [currentCase, setCurrentCase] = useState(null)
  const [allgroups, setAllgroups] = useState([])
  // const [currentChat, setCurrentChat] = useState(null)
  // const [currentSubGroupIndex, setCurrentSubGroupIndex] = useState(0)
  const [receivers, setReceivers] = useState([])
  const [curMessage, setcurMessage] = useState("")
  const [isAttachment, setIsAttachment] = useState(false)
  const [allFiles, setAllFiles] = useState([])
  const [loading, setLoading] = useState(false)

  //Toaster settings
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  //Toggle Active tab in chat-left-side
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  //Creating New ChatRoom
  const handleCreateChatRoom = async id => {
    const payload = {
      members: [currentUser?.userID, id],
    }
    const createdChatRes = await createOnevsOneChat(payload)
    if (createdChatRes.success) {
      toastr.success(`Chat has been created successfully`, "Success")
      await ongetAllChatRooms()
      setCurrentChat(createdChatRes.group)
      setactiveTab("1")
    } else {
      toastr.error(`Failed to create chat`, "Failed!!!")
      console.log("Failed to create 1vs1 chat ", createdChatRes)
    }
  }

  //Getting all 1vs1 chats
  const ongetAllChatRooms = async () => {
    const chatRoomsRes = await getOnevsOneChat({ userId: currentUser.userID })
    if (chatRoomsRes.success) {
      setChats(chatRoomsRes.groups)
      setCurrentChat(chatRoomsRes.groups[0])
      if (chatRoomsRes.groups.length < 1) {
        setactiveTab("3")
      }
    } else {
      setChats([])
    }
  }

  //Getting 1vs1 chat name
  const getChatName = members => {
    const chatMember = members.filter(
      member => member.id?._id !== currentUser.userID
    )
    if (chatMember.length > 0)
      return chatMember[0].id?.firstname + " " + chatMember[0].id?.lastname
    return "Guest Chat"
  }

  //getting 1vs1 chat profilePic

  const getChatProfilePic = members => {
    const chatMember = members.filter(
      member => member.id?._id !== currentUser.userID
    )
    if (chatMember.length > 0)
      return chatMember[0].id?.profilePic
        ? chatMember[0].id?.profilePic
        : profile

    return profile
  }

  //getting 1vs1 chat sender name

  const getSenderOneChat = senderId => {
    const chatMember = currentChat?.groupMembers.find(
      member => member.id?._id === senderId
    )
    if (chatMember)
      return chatMember.id?.firstname + " " + chatMember.id?.lastname
    return senderId
  }

  //Getting all the cases
  const ongetAllCases = async () => {
    const allCasesRes = await getCasesByUserId({ userId: currentUser.userID })
    if (allCasesRes.success) {
      setAllCases(allCasesRes.cases)
    } else {
      setAllCases([])
      console.log("Rendering ongetAllCases error", allCasesRes)
    }
  }

  //Selecting current case
  const onSelectingCase = cas => {
    setCurrentCase(cas)
  }

  //Deleting Case

  const onDeletingCase = async () => {
    const payload = {
      id: currentCase?._id,
      deleteIt: true,
    }
    const res = await updateCase(payload)
    if (res.success) {
      toastr.success(
        `Case ${res?.caseId} has been Deleted successfully`,
        "Success"
      )
      setCurrentCase(null)
      await ongetAllChatRooms()
      await ongetAllCases()
    } else {
      toastr.error("Failed to delete case", "Failed!!!")
    }
    setModalOpen(false)
  }

  //Sending Message
  const handleSendMessage = async () => {
    setLoading(true)
    if (isAttachment || curMessage) {
      let attachmentsId = []
      let payLoad = {
        caseId: currentCase?._id,
        groupId: currentChat?._id,
        sender: currentUser?.userID,
        receivers,
        messageData: curMessage,
        isAttachment,
      }
      if (isAttachment) {
        const formData = new FormData()
        for (var i = 0; i < allFiles.length; i++) {
          formData.append("file", allFiles[i])
        }
        // formData.append("file", allFiles)
        const fileUploadRes = await axios.post(
          `${SERVER_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          }
        )
        const { data } = fileUploadRes
        if (data.success) {
          await data.files?.map(file =>
            attachmentsId.push({
              type: file.contentType,
              size: file.size,
              id: file.id,
              name: file.originalname,
              dbName: file.filename,
              aflag: true,
            })
          )
        }
      }
      payLoad.attachments = attachmentsId
      handleSendingMessage(payLoad)
      setAllFiles([])
      setcurMessage("")
      setIsAttachment(false)
    } else {
      console.log("You can't send empty message")
    }
    setLoading(false)
  }

  //Detecting Enter key Press in textbox
  const onKeyPress = e => {
    const { key } = e
    if (key === "Enter") {
      handleSendMessage()
    }
  }

  //Getting sender name
  const getMemberName = id => {
    const memberName = allCases
      .find(cas => cas._id === currentCase?._id)
      ?.caseMembers?.find(member => member?.id?._id === id)
    if (memberName)
      return memberName?.id?.firstname + " " + memberName?.id?.lastname
    return "Guest"
  }

  //Scrolling to bottom of message
  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  //Handling File change
  const handleFileChange = e => {
    setAllFiles(e.target.files)
  }

  //SideEffect for setting isAttachment

  useEffect(() => {
    if (Array.from(allFiles)?.length > 0) {
      setIsAttachment(true)
    }
  }, [allFiles])
  //Scroll to messages bottom on load & message arrives
  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom()
  }, [messages])

  //Fetching SubGroups
  const onGettingSubgroups = async () => {
    const payLoad = {
      caseId: currentCase._id,
      userId: currentUser.userID,
    }
    const subGroupsRes = await getGroupsByUserIdandCaseId(payLoad)
    if (subGroupsRes.success) {
      setAllgroups(subGroupsRes.groups)
      setCurrentChat(subGroupsRes.groups[0])
    }
  }

  //SideEffect for fetching Subgroups after case selected
  useEffect(() => {
    if (currentCase) {
      onGettingSubgroups()
    }
  }, [currentCase])

  //SideEffect of setting receivers after currentchat changes
  useEffect(() => {
    if (currentChat) {
      setReceivers(
        currentChat.groupMembers
          .filter(m => m.id?._id !== currentUser.userID)
          .map(r => r.id?._id)
      )
      const onGettingGroupMessages = async () => {
        const payload = {
          groupId: currentChat?._id,
          userId: currentUser?.userID,
        }
        const res = await getMessagesByUserIdandGroupId(payload)
        if (res.success) {
          setMessages(res.groupMessages)
        } else {
          console.log("Failed to fetch Group message", res)
        }
      }

      onGettingGroupMessages()
    }
  }, [currentChat])

  useEffect(() => {
    const onGetContacts = async () => {
      const userRes = await getAllUsers({ userID: currentUser.userID })
      console.log("userres", userRes)
      if (userRes.success) {
        setContacts(userRes.users)
      } else {
        setContacts([])
      }
    }
    onGetContacts()
    ongetAllChatRooms()
    ongetAllCases()
    setPageLoader(false)
  }, [])

  return (
    <div className="page-content">
      <>
        {pageLoader ? (
          <>Loadinggg....</>
        ) : (
          <>
            {/* Model for creating case*/}
            <DynamicModel
              open={newCaseModelOpen}
              toggle={toggleNewCaseModelOpen}
              size="lg"
              modalTitle="New Case"
              footer={false}
            >
              <DynamicSuspense>
                <CreateCase
                  formValues={newCase}
                  setFormValues={setNewCase}
                  contacts={contacts}
                  setModalOpen={setNewCaseModelOpen}
                  getAllCases={ongetAllCases}
                />
              </DynamicSuspense>
            </DynamicModel>

            {/* Model for creating subgroup */}
            <DynamicModel
              open={subGroupModelOpen}
              toggle={togglesubGroupModelOpen}
              modalTitle="Subgroup Setting"
              modalSubtitle={`You have ${
                allgroups.filter(a => !a.isParent)?.length || 0
              } subgroups`}
              footer={true}
              size="lg"
            >
              <DynamicSuspense>
                <SubGroups
                  currentCaseId={currentCase?._id}
                  caseMembers={currentCase?.caseMembers}
                  groups={allgroups.filter(a => !a.isParent)}
                  getSubGroups={onGettingSubgroups}
                />
              </DynamicSuspense>
            </DynamicModel>

            <DeleteModal
              show={modalOpen}
              onDeleteClick={()=>onDeletingCase()}
              confirmText="Yes,Remove"
              cancelText="Cancel"
              onCloseClick={toggleModal}
            />

            <MetaTags>
              <title>Chat RC</title>
            </MetaTags>
            <Container fluid>
              <Row>
                <Col xs="12" lg="5">
                  <div className="pb-2 border-bottom">
                    <div className="d-flex">
                      <div className="align-self-center me-3">
                        <img
                          src={
                            currentUser?.profilePic
                              ? currentUser?.profilePic
                              : profile
                          }
                          className="avatar-sm rounded-circle"
                          alt=""
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="font-size-14 mt-0 mb-1">
                          {currentUser?.firstname + " " + currentUser.lastname}
                        </h5>
                        <p className="text-muted mb-0">
                          <i className="mdi mdi-circle text-success align-middle me-1" />
                          Active
                        </p>
                      </div>
                      <UserDropdown />
                    </div>
                  </div>
                  <div className="my-1">
                    <Nav pills justified>
                      {sidebarNavItems.map((navItem, n) => (
                        <NavItem key={n}>
                          <NavLink
                            className={classNames({
                              active: activeTab === JSON.stringify(n + 1),
                            })}
                            onClick={() => {
                              toggleTab(JSON.stringify(n + 1))
                            }}
                          >
                            {navItem}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                    <TabContent activeTab={activeTab} className="py-1">
                      <TabPane tabId="1">
                        <ul
                          className="list-unstyled chat-list"
                          id="recent-list"
                        >
                          <PerfectScrollbar style={{ height: "300px" }}>
                            {map(chats, chat => (
                              <li
                                key={chat._id}
                                className={
                                  currentChat && currentChat._id === chat._id
                                    ? "active"
                                    : ""
                                }
                              >
                                <Link
                                  to="#"
                                  onClick={() => {
                                    setCurrentCase(null)
                                    setCurrentChat(chat)
                                  }}
                                >
                                  <div className="d-flex">
                                    {/* <div className="align-self-center me-3">
                                          {getNotificationCount(chat._id) >
                                            0 && (
                                            <span className="badge bg-danger rounded-pill">
                                              {getNotificationCount(chat._id)}
                                            </span>
                                          )}
                                        </div> */}
                                    <div className="align-self-center me-3">
                                      <img
                                        src={
                                          chat.isGroup
                                            ? profile
                                            : getChatProfilePic(
                                                chat.groupMembers
                                              )
                                        }
                                        className="rounded-circle  avatar-sm  "
                                        alt=""
                                      />
                                    </div>

                                    <div className="flex-grow-1 overflow-hidden align-self-center ">
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        {chat.isGroup
                                          ? chat.groupName
                                          : getChatName(chat.groupMembers)}
                                      </h5>
                                      <p className="text-truncate mb-0">
                                        {/* {chat.description} */}
                                      </p>
                                    </div>
                                    <div className="font-size-11">
                                      {moment(chat.updatedAt).format(
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
                      <TabPane tabId="2">
                        <div className="d-grid gap-2 my-2">
                          <button
                            type="button"
                            className="btn btn-info btn-rounded mb-2"
                            onClick={() => setNewCaseModelOpen(true)}
                          >
                            Create case
                            <i className="bx bx-pencil font-size-16 align-middle me-2 mx-2"></i>
                          </button>
                        </div>
                        <PerfectScrollbar style={{ height: "300px" }}>
                          <ul className="list-unstyled chat-list ">
                            {allCases.length > 0 &&
                              allCases.map((ca, j) => (
                                <CaseGrid
                                  caseData={ca}
                                  index={j}
                                  key={j}
                                  active={activeAccordian}
                                  onAccordionButtonClick={
                                    handleSettingActiveAccordion
                                  }
                                  handleSelectingCase={onSelectingCase}
                                  selected={currentCase?._id === ca?._id}
                                />
                              ))}
                          </ul>
                        </PerfectScrollbar>
                      </TabPane>
                      <TabPane tabId="3">
                        <div className="my-2">
                          <PerfectScrollbar style={{ height: "300px" }}>
                            {contacts &&
                              contacts.map((contact, i) => (
                                <ul key={i} className="list-unstyled chat-list">
                                  <li>
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        handleCreateChatRoom(contact._id)
                                      }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <div className="align-self-center d-flex align-items-center me-3">
                                          <img
                                            src={
                                              contact?.profilePic
                                                ? contact?.profilePic
                                                : profile
                                            }
                                            className="avatar-xs rounded-circle"
                                            alt=""
                                          />
                                          <h5 className="font-size-14 mb-0 ms-2">
                                            {contact.firstname}{" "}
                                            {contact.lastname}
                                          </h5>
                                        </div>

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
                </Col>
                <Col xs="12" lg="7" className="align-self-center">
                  <div className="w-100 ">
                    {currentChat ? (
                      <Card>
                        <div className="py-2 px-3 border-bottom">
                          <Row>
                            <Col md="4" xs="9">
                              <h5 className="font-size-15 mb-1">
                                {currentChat.isGroup
                                  ? currentCase?.caseName || "Case Chat"
                                  : getChatName(currentChat.groupMembers)}
                              </h5>
                              {currentChat?.isGroup && (
                                <span
                                  style={{
                                    color: currentChat?.color
                                      ? currentChat?.color
                                      : "#0000FF",
                                  }}
                                >
                                  {currentChat?.groupName}
                                </span>
                              )}
                            </Col>
                            <Col md="8" xs="3">
                              <ul className="list-inline user-chat-nav text-end mb-0">
                                <li className="list-inline-item align-middle">
                                  <Dropdown
                                    isOpen={chatSettingOpen}
                                    toggle={() => toggleChatSettingOpen(!open)}
                                    className="float-end me-2"
                                  >
                                    <DropdownToggle
                                      className="btn nav-btn"
                                      tag="i"
                                    >
                                      <i className="bx bx-cog" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                      <DropdownItem href="#">
                                        Manage Group
                                      </DropdownItem>
                                      {currentCase && (
                                        <DropdownItem
                                          href="#"
                                          onClick={() => setModalOpen(true)}
                                        >
                                          Delete case
                                        </DropdownItem>
                                      )}
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
                                style={{ height: "320px" }}
                                containerRef={ref => setMessageBox(ref)}
                              >
                                {messages &&
                                  messages.map((msg, m) => (
                                    <li
                                      key={"test_k" + m}
                                      className={
                                        msg.sender === currentUser.userID
                                          ? "right"
                                          : ""
                                      }
                                    >
                                      <div
                                        className="conversation-list"
                                        style={{ maxWidth: "80%" }}
                                      >
                                        {/* <UncontrolledDropdown>
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
                                      </UncontrolledDropdown> */}
                                        <div
                                          className="ctext-wrap "
                                          style={{
                                            backgroundColor:
                                              msg.sender ==
                                                currentUser.userID &&
                                              currentChat?.color
                                                ? currentChat?.color + "33"
                                                : "#0000FF" + "33",
                                          }}
                                        >
                                          <div className="conversation-name">
                                            {currentChat.isGroup
                                              ? getMemberName(msg.sender)
                                              : getSenderOneChat(msg.sender)}
                                          </div>
                                          <div className="mb-1">
                                            {msg.isAttachment ? (
                                              <AttachmentViewer
                                                attachments={msg.attachments}
                                                text={msg.messageData}
                                              />
                                            ) : (
                                              msg.messageData
                                            )}
                                          </div>
                                          <p className="chat-time mb-0">
                                            <i className="bx bx-comment-check align-middle me-1" />
                                            {/* <i className="bx bx-time-five align-middle me-1" /> */}
                                            {moment(msg.createdAt).format(
                                              "DD-MM-YY hh:mm"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                {messageStack?.length > 0 &&
                                  messageStack.map((msg, m) => (
                                    <li key={"test_k" + m} className="right">
                                      <div className="conversation-list">
                                        <div
                                          className="ctext-wrap "
                                          style={{
                                            backgroundColor:
                                              msg.sender ==
                                                currentUser.userID &&
                                              currentChat?.color
                                                ? currentChat?.color + "33"
                                                : "#0000FF" + "33",
                                          }}
                                        >
                                          <div className="conversation-name">
                                            {currentUser?.firstname +
                                              currentUser?.lastname}
                                          </div>
                                          <div className="mb-1">
                                            {msg.messageData}
                                          </div>
                                          <p className="chat-time mb-0">
                                            <i className="bx bx-loader bx-spin  align-middle me-1" />
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
                          {currentChat?.isGroup && (
                            <SubgroupBar
                              groups={allgroups}
                              selectedGroup={currentChat}
                              setSelectedgroup={setCurrentChat}
                              subGroupColors={subGroupColors}
                              openSubGroupmodel={setSubGroupModelOpen}
                              currentCase={currentCase}
                            />
                          )}
                          <div className="p-2 chat-input-section">
                            <Row>
                              <Col>
                                <div className="position-relative">
                                  <TextareaAutosize
                                    type="text"
                                    value={curMessage}
                                    onKeyPress={onKeyPress}
                                    style={{
                                      resize: "none",
                                    }}
                                    onChange={e =>
                                      setcurMessage(e.target.value)
                                    }
                                    className="form-control chat-input"
                                    placeholder="Enter Message..."
                                  />

                                  <div className="chat-input-links">
                                    <ul className="list-inline mb-0">
                                      <li className="list-inline-item">
                                        <div>
                                          <Input
                                            type="file"
                                            name="file"
                                            multiple={true}
                                            id="hidden-file"
                                            className="d-none"
                                            accept=".png, .jpg, .jpeg,.pdf"
                                            onChange={e => {
                                              handleFileChange(e)
                                            }}
                                          />

                                          <Label
                                            htmlFor="hidden-file"
                                            style={{ margin: 0 }}
                                          >
                                            <i
                                              className="mdi mdi-file-image-outline "
                                              style={{
                                                color: "#556EE6",
                                                fontSize: 16,
                                              }}
                                            />
                                          </Label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                {Array.from(allFiles)?.length > 0 && (
                                  <div className="d-flex gap-2 flex-wrap mt-2 ">
                                    {Array.from(allFiles)?.map((att, a) => (
                                      <span
                                        className="badge badge-soft-primary font-size-13"
                                        key={a}
                                      >
                                        {att.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </Col>
                              <Col className="col-auto">
                                {loading ? (
                                  <Button
                                    type="button"
                                    className="btn btn-primary btn-rounded chat-send w-md "
                                    color="primary"
                                    style={{ cursor: "not-allowed" }}
                                  >
                                    <i className="bx  bx-loader-alt bx-spin font-size-20 align-middle me-2"></i>
                                  </Button>
                                ) : (
                                  <Button
                                    type="button"
                                    color="primary"
                                    onClick={() => handleSendMessage()}
                                    className="btn btn-primary btn-rounded chat-send w-md "
                                  >
                                    <span className="d-none d-sm-inline-block me-2">
                                      Send
                                    </span>
                                    <i className="mdi mdi-send" />
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <NoChat />
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </>
    </div>
  )
}

export default ChatRc
