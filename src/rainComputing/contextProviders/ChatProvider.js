import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getAllChatRooms } from "rainComputing/helpers/backend_helper"
import { useNotifications } from "./NotificationsProvider"

const ChatContext = React.createContext()

export const useChat = () => {
  return useContext(ChatContext)
}

export function ChatProvider({ socket, children }) {
  const currentUser = JSON.parse(localStorage.getItem("authUser"))
  const { notifications, setNotifications } = useNotifications()
  const [chats, setChats] = useState([])
  const [currentRoom, setCurrentRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageStack, setMessageStack] = useState([])

  const getRoomsonEveryMessage = async () => {
    const chatRoomsRes = await getAllChatRooms({ userID: currentUser.userID })
    if (chatRoomsRes.success) {
      setChats(chatRoomsRes.chats)
    } else {
      setChats([])
    }
  }
  const handleSendingMessage = async msgData => {
    setMessageStack(prevStae => [...prevStae, msgData])
    await socket.emit("s_m", msgData)
  }

  //   useEffect(() => {
  //     if (socket == null) return

  //     socket.once("receive_message", async msgData => {
  //       console.log("receive_message From SocketProvider ", msgData)
  //       if (!currentRoom) {
  //         setNotifications([msgData, ...notifications])
  //       } else {
  //         if (msgData.chatRoomId === currentRoom._id) {
  //           setMessages([...messages, { message: msgData }])
  //         } else {
  //           setNotifications([msgData, ...notifications])
  //         }
  //       }

  //       await getRoomsonEveryMessage()
  //     })
  //   }, [socket, handleSendingMessage])
  useEffect(() => {
    if (currentRoom) {
      if (socket == null) return
      socket.off("receive_message").once("receive_message", async msgData => {
        if (msgData.chatRoomId === currentRoom._id) {
          if (notifications.length > 0) {
            const filteredNotification = notifications.filter(
              n => n.chatRoomId !== currentRoom._id
            )
            setNotifications(filteredNotification)
          }
          setMessages([...messages, msgData])
        } else {
          setNotifications([msgData, ...notifications])
        }
        await getRoomsonEveryMessage()
      })
    } else {
      if (socket == null) return
      socket.off("receive_message").once("receive_message", async msgData => {
        setNotifications([msgData, ...notifications])
      })
    }
  }, [socket, handleSendingMessage])

  useEffect(() => {
    if (currentRoom) {
      if (socket == null) return
      socket.off("r_m").once("r_m", async msgData => {
        if (msgData?.groupId === currentRoom._id) {
          console.log("Received message : ", msgData)
          setMessages([...messages, msgData])
        } else {
          console.log("Received message for notifications 1: ", msgData)
          setNotifications([msgData, ...notifications])
          const options = {
            title: "Rain Computing",
            body: `New Message From Rain Computing ${msgData?.messageData}`,
            icon: "https://t3.ftcdn.net/jpg/00/96/93/40/360_F_96934079_NnI7vUzC4f3q4Z15ZA3OoC7sG9cRNELb.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
            dir: "ltr",
            // tag: "tag",
            click_action: "http://localhost:3000/chat-rc"
          }
          const notification = new Notification(
            "Rain Computing Notification",
            options
          )
        }
      })
      socket.off("s_s").once("s_s", async msgData => {
        console.log("Message send successfully : ", msgData)
        setMessageStack([])
        setMessages([...messages, msgData])
      })
    } else {
      if (socket == null) return
      socket.off("r_m").once("r_m", async msgData => {
        console.log("Received message for notifications: ", msgData)
        setNotifications([msgData, ...notifications])
        const options = {
          title: "Rain Computing",
          body: `New Message From Rain Computing ${msgData?.messageData}`,
          icon: "https://t3.ftcdn.net/jpg/00/96/93/40/360_F_96934079_NnI7vUzC4f3q4Z15ZA3OoC7sG9cRNELb.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
          dir: "ltr",
          // tag: "tag",
          href: "http://localhost:3000/chat-rc",
          click_action: "http://localhost:3000/chat-rc"
        }
        const notification = new Notification(
          "Rain Computing Notification",
          options
        )
      })
    }
    socket.off("u_l").once("u_l", async msgData => {
      setNotifications([...msgData, ...notifications])
    })
  }, [socket, handleSendingMessage])
  return (
    <ChatContext.Provider
      value={{
        chats,
        currentRoom,
        setChats,
        setCurrentRoom,
        getRoomsonEveryMessage,
        handleSendingMessage,
        messages,
        setMessages,
        messageStack,
        setMessageStack,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

ChatProvider.propTypes = {
  children: PropTypes.any,
  socket: PropTypes.any,
}
