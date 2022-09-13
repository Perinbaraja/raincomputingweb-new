import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { getCasesById } from "rainComputing/helpers/backend_helper"
import { getUserById } from "rainComputing/helpers/backend_helper"
import { useQuery } from "rainComputing/helpers/hooks/useQuery"
//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb"

import DeleteModal from "rainComputing/components/modals/DeleteModal"
import { useModal } from "rainComputing/helpers/hooks/useModal"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const CaseDetails = () => {
  const [modalOpen, setModalOpen, toggleModal] = useModal(false)
  const query = useQuery()
  const [loading, setLoading] = useState(false)
  const [caseDetail, setCaseDetail] = useState(null)
  const [getUser, setGetUser] = useState(null)

  const getCases = async () => {
    const res = await getCasesById({
      caseid: query.get("id"),
    })
    if (res.success) {
      console.log("r", res)
      setCaseDetail(res.cases)
    }
  }

  useEffect(() => {
    getCases()
  }, [])

  const getUserId = async () => {
    const res = await getUserById({
      userId: caseDetail?.caseMembers?.addedBy,
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
  return (
    <React.Fragment>
      <DeleteModal
        show={modalOpen}
        //   onDeleteClick={handleRemovingUser}
        confirmText="Yes,DeActive"
        cancelText="Cancel"
        onCloseClick={toggleModal}
      />
      <div className="page-content">
        <MetaTags>
          <title>Case Details | Rain - Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Link to="/attorneylist-page">
            <Breadcrumb title="Rain" breadcrumbItem="Case Details" />
          </Link>

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Case Name
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder">
                        {caseDetail?.caseName}
                      </label>
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Case ID
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder text-primary">
                        {caseDetail?.caseId}
                      </label>
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Number of Members
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder">
                        {caseDetail?.caseMembers?.length}
                      </label>
                    </div>
                  </Row>

                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Case Members
                    </label>
                    {caseDetail?.caseMembers.map((cd, i) => (
                      <div
                        className="col-md-5 col-lg-2 col-form-label "
                        key={i}
                      >
                        <label className="fw-bolder">
                          {/* {admins?.firstname} */}
                          {cd?.id?.firstname + "  " + cd?.id?.lastname}
                        </label>
                      </div>
                    ))}
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Case Created By
                    </label>
                    {/* {caseDetail?.caseMembers[0] */}
                    {/* .filter(i => i.id === caseDetail?.admins) */}
                    {/* .map((m, i) => ( */}
                    <div
                      className="col-md-5 col-lg-2 col-form-label "
                      // key={i}
                    >
                      <label className="fw-bolder">
                        {caseDetail?.caseMembers[0]?.id?.firstname +
                          "  " +
                          caseDetail?.caseMembers[0]?.id?.lastname}
                        {/* {getUser?.firstname + "  " + getUser?.lastname} */}
                      </label>
                    </div>
                    {/* ))} */}
                  </Row>
                  <Row>
                    <div className="modal-footer">
                      <Link to="/caselist-page">
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

                      {/* <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          // setSelectedUser(user)
                          setModalOpen(true)
                        }}
                      >
                        DeActivate
                      </button> */}
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

export default CaseDetails
