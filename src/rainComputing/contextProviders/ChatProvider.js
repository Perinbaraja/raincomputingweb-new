import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getAllChatRooms } from "rainComputing/helpers/backend_helper"
import { useNotifications } from "./NotificationsProvider"

const currentUser = JSON.parse(localStorage.getItem("authUser"))

const ChatContext = React.createContext()

export const useChat = () => {
  return useContext(ChatContext)
}

export function ChatProvider({ socket, children }) {
  const { notifications, setNotifications } = useNotifications()
  const [chats, setChats] = useState([])
  const [currentRoom, setCurrentRoom] = useState(null)
  const [messages, setMessages] = useState([])

  const getRoomsonEveryMessage = async () => {
    const chatRoomsRes = await getAllChatRooms({ userID: currentUser.userID })
    if (chatRoomsRes.success) {
      setChats(chatRoomsRes.chats)
    } else {
      setChats([])
    }
  }
  const handleSendingMessage = msgData => {
    socket.emit("send_message", msgData)
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
          setMessages([...messages, { message: msgData }])
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
