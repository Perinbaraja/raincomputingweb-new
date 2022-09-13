import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import { Link } from "react-router-dom"
import subGroupUserGrid from "./subGroupUserGrid"

//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb"
import { useQuery } from "rainComputing/helpers/hooks/useQuery"
import DeleteModal from "rainComputing/components/modals/DeleteModal"
import { useModal } from "rainComputing/helpers/hooks/useModal"
import { getUserById } from "rainComputing/helpers/backend_helper"
import { getPaymentId } from "rainComputing/helpers/backend_helper"
import { success } from "toastr"
import { set } from "lodash"
import { allPaymentData } from "rainComputing/helpers/backend_helper"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { removeUser } from "rainComputing/helpers/backend_helper"
import { getAllUsers } from "rainComputing/helpers/backend_helper"
import { allCasesData } from "rainComputing/helpers/backend_helper"
import {
  getGroupsByUserIdandCaseId,
  getCasesByUserId,
  getGroupsByCaseId,
} from "rainComputing/helpers/backend_helper"

const UserDetails = () => {
  const query = useQuery()
  const [modalOpen, setModalOpen, toggleModal] = useModal(false)
  const [getUser, setGetUser] = useState(null)
  const [getGroups, setGetGroups] = useState([])
  const [getPayment, setGetPayment] = useState(null)
  const [paymentData, setPaymentData] = useState([])
  const [loading, setLoading] = useState(false)
  const [caseData, setCaseData] = useState([])
  const [caseByID, setCaseByID] = useState([])
  const [count, setCount] = useState([])
  const [subGroups, setSubgroups] = useState([])

  const getUserId = async () => {
    const res = await getUserById({
      userId: query.get("id"),
    })
    if (res.success) {
      setGetUser(res.User)
      console.log("res", res)
    }
    //console.log("el", res)
  }

  useEffect(() => {
    getUserId()
  }, [])
  // const onGettingSubgroups = async () => {
  //   const payLoad = {
  //     caseId: caseData._id,
  //     userId: caseData.admins,
  //   }
  //   const subGroupsRes = await getGroupsByUserIdandCaseId(payLoad)
  //   if (subGroupsRes.success) {
  //     console.log("groups", subGroupsRes.groups)
  //     setAllgroups(subGroupsRes.groups)
  //     // setCurrentChat(subGroupsRes.groups[0])
  //   }
  // }
  // useEffect(() => {
  //   if (caseData) {
  //     onGettingSubgroups()
  //   }
  // }, [caseData])

  const getAllPaymentData = async () => {
    //setLoading(true)
    const res = await allPaymentData({})
    // console.log("paymentres :", res)
    if (res.success) {
      setPaymentData(res.paymentIntent)
      console.log("pay", res)
      console.log(paymentData)
    }
    // setLoading(false)
  }

  useEffect(() => {
    getAllPaymentData()
  }, [])
  const getPaymentStatus = () => {
    //setLoading(true)
    const Paid = paymentData?.find(i => i.consumerId._id === getUser._id)
    // const Paid = paymentData?.consumerId.find(p => p._id === getUser._id)
    //setLoading(false)
    console.log("paid", Paid)
    return Paid ? "Paid" : "Not Paid"
    //setLoading(false)
  }
  const handleRemovingUser = async () => {
    const payload = {
      userID: [getUser?._id],
    }
    const res = await removeUser(payload)
    if (res.success) {
      console.log(res)
      toastr.success(`User has been Deactivated successfully`, "Success")

      await getAllUsers()
    } else {
      console.log("Error : ", res?.msg || "error")
    }
    setModalOpen(false)
  }
  const getAllCases = async () => {
    setLoading(true)
    const res = await allCasesData({})
    console.log("case", res)
    if (res.success) {
      setCaseData(res.cases)
      // setCount(
      //   caseData.caseMembers
      //     .filter(m => m._id === query.get("id"))
      //     .map(r => r._id)
      // )
    } else {
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllCases()
  }, [])
  const getCasesCount = () => {
    const CaseCount = caseData?.caseMembers?.find(c => c._id === getUser._id)
    console.log("count", CaseCount)
    return CaseCount ? CaseCount.length : 0
  }
  const getCaseById = async () => {
    const res = await getCasesByUserId({
      userId: query.get("id"),
    })
    if (res.success) {
      setCaseByID(res.cases)
      console.log("usercase", res)
    }
    //console.log("el", res)
  }
  useEffect(() => {
    getCaseById()
  }, [])
  const getGroupsName = async cs => {
    const res = await getGroupsByUserIdandCaseId({
      caseId: cs,
      userId: query.get("id"),
    })
    if (res.success) {
      setGetGroups(res.groups)
      console.log("groups", res)
    }
    //console.log("el", res)
  }

  const getSubGroupsName = async () => {
    const res = await getGroupsByCaseId({
      caseId: getGroups.caseId,
    })
    if (res.success) {
      setSubgroups(res.subGroups)
      console.log("subgroups", res)
    }
    //console.log("el", res)
  }

  useEffect(() => {
    getSubGroupsName()
  }, [])
  return (
    <React.Fragment>
      <DeleteModal
        show={modalOpen}
        onDeleteClick={handleRemovingUser}
        confirmText="Yes,DeActive"
        cancelText="Cancel"
        onCloseClick={toggleModal}
      />
      <div className="page-content">
        <MetaTags>
          <title>User Deatails | Rain - Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Link to="/userlist-page">
            <Breadcrumb title="Rain" breadcrumbItem="User Details" />
          </Link>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <label className="col-md-5 col-lg-2 col-form-label">
                      User Name
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder">
                        {getUser?.firstname + " " + getUser?.lastname}
                      </label>
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Email
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder text-primary">
                        {getUser?.email}
                      </label>
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Payment
                    </label>
                    {/* {paymentData
                      // .filter(f => f?.consumerId === query.get("id"))
                      .map((p, i) => ( */}
                    <div
                      className="col-md-5 col-lg-2 col-form-label "
                      // key={i}
                    >
                      <label className="fw-bolder fw-bolder">
                        {/* {p?.firstname} */}
                        {/* {paymentData?.consumerId?.firstname} */}
                        {getPaymentStatus()}
                      </label>
                    </div>
                    {/* ))} */}
                  </Row>
                  <Row className="my-md-3">
                    <div className="text-primary p-3">
                      <h5 className="text-primary">CASES:</h5>
                    </div>
                  </Row>

                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Cases Associated with
                    </label>
                    {/* {/* {caseData &&
                      caseData
                        .filter(f => f?.caseMembers._id === query.get("id"))
                        .map((cs, i) => ( */}
                    {/* {caseData &&
                      caseData.map((cs, i) => ( */}
                    <div
                      className="col-md-5 col-lg-2 col-form-label "
                      // key={i}
                    >
                      <label className="fw-bolder fw-bolder">
                        {caseByID.length}
                        {/* {cs.length} */}
                      </label>
                    </div>
                    {/* ))} */}
                  </Row>
                  <Row>
                    <label className="col-md-5 col-lg-2 col-form-label fw-bolder fw-bolder">
                      Cases:
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder fw-bolder">SubGroups:</label>
                    </div>
                  </Row>
                  <Row>
                    {/* <label className="col-md-8 col-lg-2 col-form-label"></label> */}
                    {caseByID &&
                      caseByID.map((cs, i) => (
                        <div
                          // className="col-md-5 col-lg-2 col-form-label "
                          key={i}
                        >
                          {/* <div className="fw-bolder fw-bolder"> */}
                          <label className="col-md-col-lg-2 col-form-label  ">
                            {cs?.caseName}
                            <subGroupUserGrid
                              caseId={cs?._id}
                              userId={getUser._id}
                            />
                            {/* {JSON.stringify(getGroupsName(cs?._id))} */}
                          </label>
                        </div>
                      ))}

                    {getGroups &&
                      getGroups.map((g, i) => (
                        <div
                          className="col-md-5 col-lg-2 col-form-label"
                          key={i}
                        >
                          <label className="fw-bolder fw-bolder">
                            {g?.groupName}
                          </label>
                        </div>
                      ))}
                    {/* ))} */}
                  </Row>

                  <Row>
                    <div className="modal-footer">
                      <Link to="/userlist-page">
                        <button
                          type="button"
                          // onClick={() => {
                          //   handleClose()
                          // }}
                          className="btn btn-primary "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          // setSelectedUser(user)
                          setModalOpen(true)
                        }}
                      >
                        DeActivate
                      </button>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
UserDetails.propTypes = {
  caseId: PropTypes.string,
}
export default UserDetails
