import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb"
//Import images
import paymentImg from "../../../../assets/images/paymentsuccess.png"
import { useHistory } from "react-router-dom"

const PaymentStatus = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push("/")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Status | Rain- Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs title="Rain" breadcrumbItem="Payment Successfully" /> */}

          <Row className="justify-content-center">
            <Col xl="5" sm="8">
              <Card>
                <CardBody>
                  <div className="text-center">
                    <Row className="justify-content-center">
                      <Col lg="10">
                        <h4 className="mt-4 font-weight-semibold">
                          Thank You For Your Payment !
                        </h4>
                        <p className="text-muted mt-3">
                          Your payment is successful ! Attorney{" "}
                          <p className="text-primary">
                            {"Hsuanyeh Chang, PhD, Esq."}
                          </p>will Review Your Case and Get Back To You.
                        </p>

                        <div className="mt-4">
                          {/* button triggers modal */}
                          <Button
                            type="button"
                            color="primary"
                            onClick={handleClick}
                          >
                            View Status
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <Row className="justify-content-center mt-5 mb-2">
                      <Col sm="6" xs="8">
                        <div>
                          <img src={paymentImg} alt="" className="img-fluid" />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PaymentStatus
