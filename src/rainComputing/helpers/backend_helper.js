import { del, get, post, put } from "./api_helper"
import { SERVER_URL } from "./configuration"
const BASE_URL = `${SERVER_URL}/api`

const getAllAttorneys = payload => post(`${BASE_URL}/user/allAttorney`, payload)

const getAllUsers = payload => post(`${BASE_URL}/user/allUser`, payload)
const getAllChatRooms = payload =>
  post(`${BASE_URL}/pchat/getAllChatRoomByUserId`, payload)
const createChatRoom = payload =>
  post(`${BASE_URL}/pchat/createChatRoom`, payload)
const getRoomMessages = payload =>
  post(`${BASE_URL}/pchat/getRoomMessages`, payload)

export {
  getAllAttorneys,
  getAllUsers,
  getAllChatRooms,
  createChatRoom,
  getRoomMessages,
}
