import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb"

import DeleteModal from "rainComputing/components/modals/DeleteModal"
import { useModal } from "rainComputing/helpers/hooks/useModal"

const UserDetails = () => {

    const [modalOpen, setModalOpen, toggleModal] = useModal(false)

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
          <title>User Deatails | Rain - Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Link to = "/userlist-page">
          <Breadcrumb title="Rain" breadcrumbItem="User Details" />
          </Link>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <label
                      htmlFor="example-text-input"
                      className="col-md-5 col-lg-2 col-form-label"
                    >
                      User Name
                    </label>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        type="text"
                        id="example-text-input"
                        placeholder="User Name"
                        value={""}
                        name="userName"
                        // onChange={e => setCaseName(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label
                      htmlFor="email"
                      className="col-md-5 col-lg-2 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        type="text"
                        id="email"
                        placeholder="xxx@rain.com"
                        value={""}
                        // onChange={e => setCaseId(e.target.value)}
                      />
                    </div>
                  </Row>
                  <Row>
                    <span className="text-muted">Payment</span>
                    <div className="d-flex flex-wrap gap-2 my-2"></div>
                  </Row>
                  <Row>
                  <div className="d-flex flex-wrap gap-5 my-4">
                    <span className="text-muted">Activity</span>
                    {/* <i className="mdi mdi-download text-primary mdi-24px" /> */}
                    </div>
                  </Row>
                  <Row>
                    <div className="modal-footer">
                      <Link to ="/userlist-page">
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

export default UserDetails
