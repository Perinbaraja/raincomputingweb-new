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
const registerAttorney = payload =>
  post(`${BASE_URL}/attorney/register`, payload)
const getAttorneyByUserID = payload =>
  post(`${BASE_URL}/attorney/getByUserId`, payload)
const getFirmsByAttorneyID = payload =>
  post(`${BASE_URL}/firm/getFirmByAttorneyId`, payload)
const registerFirm = payload => post(`${BASE_URL}/firm/register`, payload)
const getAllRegAttorneys = payload =>
  post(`${BASE_URL}/attorney/getAllAttorney`, payload)
const regAttorneyDetails = payload =>
  post(`${BASE_URL}/attorney/regAttorneyDetails`, payload)

const addNewUser = payload => put(`${BASE_URL}/pchat/addtoGroup`, payload)
//Removing the User from Group
const deleteUser = payload =>
  put(`${BASE_URL}/pchat/removeGroupmember`, payload)
//Deleting the Group
const deleteGroup = payload => put(`${BASE_URL}/pchat/deleteChat`, payload)

const getFirmbyId = payload => post(`${BASE_URL}/firm/getFirmById`, payload)

const addFirmMember = payload => put(`${BASE_URL}/firm/addtofirm`, payload)
const removeFirmMember = payload => put(`${BASE_URL}/firm/removefirmmember`, payload)

// const verifyUserEmail = payload => post(`${BASE_URL}/user/verifyEmail`, payload)

// const setForgettingPassword = payload =>post(`${BASE_URL}/user/verifyForgetPassword`, payload)

// const setResetPassword = payload =>post(`${BASE_URL}/user/forgetPassword`, payload)


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
  registerAttorney,
  getAttorneyByUserID,
  getFirmsByAttorneyID,
  registerFirm,
  getAllRegAttorneys,
  regAttorneyDetails,
  addNewUser,
  deleteUser,
  deleteGroup,
  getFirmbyId,
  addFirmMember,
  removeFirmMember,
  // verifyUserEmail,
  // setForgettingPassword,
  // setResetPassword
}
