import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
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
  Alert,
} from "reactstrap"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { registerAttorney } from "rainComputing/helpers/backend_helper"
import { useHistory } from "react-router-dom"
const AttorneyRegister = () => {
  const history = useHistory()
  const { currentUser, setCurrentUser } = useUser()
  const [profileUpdateError, setProfileUpateError] = useState("")
  const [profileUpdateSuccess, setProfileUpateSuccess] = useState("")
  const [updateError, setUpdateError] = useState("")
  const [updateSuccess, setUpdateSuccess] = useState("")
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      attorneybarnumber: "",
      phonenumber: "",
      firm:"",
      bio:"",
      country:"",
      state:"",
      city:"",
      postalCode:"",
      email: currentUser.email,
    },
    validationSchema: Yup.object({
      attorneybarnumber: Yup.string().required(
        "Please Enter Your Attorney BarNumber"
      ),
      phonenumber: Yup.string().required("Please Enter Your Phone Number"),
      //   email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: values => {
      handleAttorneyReg({
        registerNumber: values.attorneybarnumber,
        phoneNumber: values.phonenumber,
        firm: values.firm,
        bio: values.bio,
        country: values.country,
        state: values.state,                    
        city: values.city,
        postalCode: values.postalCode,
        userID: currentUser.userID,
        status: "approved",
      })
    },
  })
 const country = [
  {value: "india", text:"india"},
  {value:"singapore",text:"singapore"},
  {value:"england",text:"england"},
  {value:"china",text:"china"}
 ]
 const state = [
  {value:"tamilnadu",text:"Tamilnadu"},
  {value:"hougang",text:"Hougang"},
  {value:"zhejiang",text: "Zhejiang"},
  {value: "london",text:"London"}
 ]
  const handleAttorneyReg = async payload => {
    const res = await registerAttorney(payload)
    if (res.success) {
      setUpdateError("")
      localStorage.setItem("authUser", JSON.stringify(res))
      setCurrentUser(res)
      setUpdateSuccess("Registering attorney Successfully")
      history.push("/")
    } else {
      setUpdateSuccess("")
      setUpdateError("Failed to Register an attroney!!")
    }
  }

  return (
    <React.Fragment>
      <div className="p-5 m-5">
        {updateError && <Alert color="danger">{updateError}</Alert>}
              {updateSuccess && <Alert color="success">{updateSuccess}</Alert>}
              {profileUpdateError && (
                <Alert color="danger">{profileUpdateError}</Alert>
              )}
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Form
                    className="needs-validation"
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                    }}
                  >
                    <h4 className="card-title mb-4">
                      {" "}
                      Attorney Registration Details
                    </h4>
                    <div className="wizard clearfix">
                      <div className="steps clearfix">
                        <ul>
                          <NavItem>
                            <NavLink>
                              <span className="number">1</span> Attorney
                              Registration
                            </NavLink>
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
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom05">
                                Firm
                                </Label>
                                <Input
                                  name="firm"
                                  id="validationCustom05"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your Address"
                                  onChange={validation.handleChange}
                                  value={validation.values.firm || ""}
                                />
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
                                  placeholder="Enter Your Phone No."
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
                                <Label htmlFor="validationCustom05">
                                Biography
                                </Label>
                                <Input
                                  name="bio"
                                  id="validationCustom05"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your bio"
                                  onChange={validation.handleChange}
                                  value={validation.values.bio || ""}
                                />
                              </FormGroup>
                            </Col>
                          
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom05">
                                  Country
                                </Label>
                                <select
                                  name="country"
                                  id="validationCustom05"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your Country"
                                  onChange={validation.handleChange}
                                  value={validation.values.country || ""}
                              >
                               <option value="">Select Country</option>
                                {country.map((option,i)=>(
                                  <option value={option?.value} key={i}>
                                    {option?.text}
                                  </option>
                                ))}
                                </select>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom05">
                                  State
                                </Label>
                                <select
                                  name="state"
                                  id="validationCustom05"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your State"
                                  onChange={validation.handleChange}
                                  value={validation.values.state || ""}
                                >
                                  <option value="">Select State</option>
                                 {state.map((option,i)=>(
                                  <option value={option?.value} key={i}>
                                    {option?.text}
                                  </option>
                                 ))}
                                </select>
                              </FormGroup>
                            </Col>
                          
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom05">
                                 City
                                </Label>
                                <Input
                                  name="city"
                                  id="validationCustom05"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your City"
                                  onChange={validation.handleChange}
                                  value={validation.values.city || ""}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom05">
                                  PostalCode
                                </Label>
                                <Input
                                  name="postalCode"
                                  id="validationCustom05"
                                  className="form-control"
                                  rows="2"
                                  placeholder="Enter Your PostalCode"
                                  onChange={validation.handleChange}
                                  value={validation.values.postalCode || ""}
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

export default AttorneyRegister
