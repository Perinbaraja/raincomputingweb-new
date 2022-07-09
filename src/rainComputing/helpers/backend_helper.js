import { del, get, post, put } from "./api_helper"
import { SERVER_URL } from "./configuration"
const BASE_URL = `${SERVER_URL}/api`

const getAllAttorneys = payload => post(`${BASE_URL}/user/allAttorney`, payload)

const getAttorneysCount = payload =>
  post(`${BASE_URL}/user/attorneyCount`, payload)

const getAllUsers = payload => post(`${BASE_URL}/user/allUser`, payload)

const getAllChatRooms = payload =>
  post(`${BASE_URL}/pchat/getAllChatRoomByUserId`, payload)

const createChatRoom = payload =>
  post(`${BASE_URL}/pchat/createChatRoom`, payload)

const getRoomMessages = payload =>
  post(`${BASE_URL}/pchat/getRoomMessages`, payload)

const userRegisteration = payload => post(`${BASE_URL}/user/register`, payload)
const userLogin = payload => post(`${BASE_URL}/user/login`, payload)
const userUpdate = payload => put(`${BASE_URL}/user/edit`, payload)
const findMe = () => get(`${BASE_URL}/user/whoiam`)
const logoutUser = () => get(`${BASE_URL}/user/logout`)

export {
  getAllAttorneys,
  getAttorneysCount,
  getAllUsers,
  getAllChatRooms,
  createChatRoom,
  getRoomMessages,
  userRegisteration,
  userLogin,
  userUpdate,
  findMe,
  logoutUser,
}
