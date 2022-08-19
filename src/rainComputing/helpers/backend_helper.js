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
const removeFirmMember = payload =>
  put(`${BASE_URL}/firm/removefirmmember`, payload)

const verifyUserEmail = payload => post(`${BASE_URL}/user/verifyEmail`, payload)

const setForgettingPassword = payload =>
  post(`${BASE_URL}/user/verifyForgetPassword`, payload)

const setResetPassword = payload =>
  post(`${BASE_URL}/user/forgetPassword`, payload)

const getSubgroups = payload =>
  post(`${BASE_URL}/subgroup/getByParentRoom`, payload)

const createNewCase = payload => post(`${BASE_URL}/case/create`, payload)
const getCasesByUserId = payload =>
  post(`${BASE_URL}/case/getByUserId`, payload)

const getGroupsByUserIdandCaseId = payload =>
  post(`${BASE_URL}/group/getByUserandCaseId`, payload)

const getMessagesByUserIdandGroupId = payload =>
  post(`${BASE_URL}/message/get`, payload)

const createOnevsOneChat = payload =>
  post(`${BASE_URL}/group/createChat`, payload)

const getOnevsOneChat = payload => post(`${BASE_URL}/group/getChat`, payload)

const getFileFromGFS = ({ id }, config) =>
  get(`${SERVER_URL}/file/${id}`, config)
const profilePicUpdate = payload =>
  put(`${BASE_URL}/user/profilePicUpdate`, payload)

//Admin
const adminLogin = payload => post(`${BASE_URL}/admin/adminLogin`, payload)
const allUsersList = () => get(`${BASE_URL}/admin/allUsersList`)
const allAttorneysList = () => get(`${BASE_URL}/admin/allAttorneysList`)
const allFirmsList = () => get(`${BASE_URL}/admin/allFirmsList`)
const removeUser = payload => put(`${BASE_URL}/admin/removeUser`, payload)
const removeAttorney = payload =>
  put(`${BASE_URL}/admin/removeAttorney`, payload)
const allReqAttorneyList = () => get(`${BASE_URL}/admin/allReqAttorneyList`)
const attorneyStatusUpdate = payload =>
  put(`${BASE_URL}/admin/attorneyStatus`, payload)
const adminLogout = () => get(`${BASE_URL}/admin/signOut`)

const createSubgroup = payload => post(`${BASE_URL}/group/createGroup`, payload)

const updateSubgroup = payload => post(`${BASE_URL}/group/updateGroup`, payload)
const updateCase = payload => post(`${BASE_URL}/case/updateCase`, payload)
const getCounts = payload => post(`${BASE_URL}/bff/getCounts`, payload)
const getCaseFiles = payload => post(`${BASE_URL}/message/getFiles`, payload)

//Appoinments

const appointmentRequest = payload =>
  post(`${BASE_URL}/appointment/appointmentrequest`, payload)
const getAllAppointmentRequestById = payload =>
  post(`${BASE_URL}/appointment/getAllAppointmentRequestByUserId`, payload)

const appointmentStatusUpdate = payload =>
  put(`${BASE_URL}/appointment/appointmentStatus`, payload)
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
  verifyUserEmail,
  setForgettingPassword,
  setResetPassword,
  getSubgroups,
  createNewCase,
  getCasesByUserId,
  getGroupsByUserIdandCaseId,
  getMessagesByUserIdandGroupId,
  getFileFromGFS,
  createOnevsOneChat,
  getOnevsOneChat,
  profilePicUpdate,
  adminLogin,
  adminLogout,
  allUsersList,
  allAttorneysList,
  allFirmsList,
  removeUser,
  removeAttorney,
  allReqAttorneyList,
  attorneyStatusUpdate,
  createSubgroup,
  updateSubgroup,
  updateCase,
  getCounts,
  getCaseFiles,
  appointmentRequest,
  getAllAppointmentRequestById,
  appointmentStatusUpdate,
}
