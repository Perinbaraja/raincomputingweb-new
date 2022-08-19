import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
// import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  FormFeedback,
  Button,
} from "reactstrap"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { regAttorneyDetails } from "rainComputing/helpers/backend_helper"

const AttorneyDetailsCard = () => {
  const { currentUser, setCurrentUser } = useUser()
  const [attorneyDetail, setAttorneyDetail] = useState({})
  const { currentAttorney } = useUser()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      attorneybarnumber: attorneyDetail?.barNumber,
      phonenumber: attorneyDetail?.phoneNumber,
      email: currentUser.email,
      address: attorneyDetail?.address,
    },
    validationSchema: Yup.object({
      attorneybarnumber: Yup.string().required(
        "Please Enter Your Attorney BarNumber"
      ),
      phonenumber: Yup.string().required("Please Enter Your Phone Number"),
    }),
    onSubmit: values => {
      handleAttorneyReg({
        // barNumber: values.attorneybarnumber,
        // phoneNumber: values.phonenumber,
        // address: values.address,
        // userID: currentUser.userID,
        // status: "requested",
      })
    },
  })

  useEffect(() => {
    if (currentAttorney) {
      const payload = { objectId: currentAttorney._id }
      const getAttorneyinfo = async () => {
        const res = await regAttorneyDetails(payload)
        const { attorney } = res
        if (attorney) {
          console.log("payload", attorney)
          setAttorneyDetail(attorney)
        }
      }
      getAttorneyinfo()
    }
  }, [currentAttorney])

  return (
    <React.Fragment>
      <div >
        <MetaTags>
          <title>RainComputing | Rain - Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Form
                    className="needs-validation"
                    onSubmit={e => {
                      e.preventDefault()
                      console.log("values")
                      validation.handleSubmit()
                    }}
                  >
                    <h4 className="card-title mb-4"> My info</h4>
                    <div className="wizard clearfix">
                      <div className="steps clearfix">
                        <ul>
                          <NavItem>
                            {/* <NavLink>
                              <span className="number">1</span> ATTORNEY
                            </NavLink> */}
                          </NavItem>
                        </ul>
                      </div>
                      <div className="content clearfix mt-4">
                        <Form>
                          <Row>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom01">
                                  Attorney BarNumber
                                </Label>

                                <Input
                                  name="attorneybarnumber"
                                  type="text"
                                  readOnly
                                  className="form-control"
                                  id="validationCustom01"
                                  placeholder="Enter Your Attorney BarNumber"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={
                                    validation.values.attorneybarnumber || ""
                                  }
                                  invalid={
                                    validation.touched.attorneybarnumber &&
                                    validation.errors.attorneybarnumber
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.attorneybarnumber &&
                                validation.errors.attorneybarnumber ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.attorneybarnumber}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom03">
                                  Phone Number
                                </Label>
                                <Input
                                  type="text"
                                  name="phonenumber"
                                  className="form-control"
                                  id="validationCustom03"
                                  placeholder="Enter Your Phone Number"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.phonenumber || ""}
                                  invalid={
                                    validation.touched.phonenumber &&
                                    validation.errors.phonenumber
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.phonenumber &&
                                validation.errors.phonenumber ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.phonenumber}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom04">
                                  Email
                                </Label>
                                <Input
                                  type="email"
                                  name="email"
                                  readOnly
                                  className="form-control"
                                  id="validationCustom04"
                                  placeholder="Enter Your Email ID"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.email || ""}
                                  invalid={
                                    validation.touched.email &&
                                    validation.errors.email
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.email &&
                                validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom05">
                                  Address
                                </Label>
                                <textarea
                                  name="address"
                                  id="validationCustom05"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your Address"
                                  onChange={validation.handleChange}
                                  value={validation.values.address || ""}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                        <Button color="primary" type="submit">
                          SUBMIT
                        </Button>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
// AttorneyDetails.propTypes = {
//   currentAttorney: PropTypes.object,
// }
export default AttorneyDetailsCard
