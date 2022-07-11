import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

import { Link } from "react-router-dom"

// import images
import profileImg from "assets/images/profile-img.png"
import computer from "assets/images/computer.png"
import rainlogo from "assets/images/RainCom_Logo.webp"
import logo from "assets/images/rain-drop.png"
import { userRegisteration } from "rainComputing/helpers/backend_helper"

const RainRegister = () => {
  const [registrationError, setRegistrationError] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstname: Yup.string().required("Please Enter Your firstname"),
      lastname: Yup.string().required("Please Enter Your lastname"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(/^(?=.{5,})/, "Must Contain 5 Characters"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      setLoading(true)
      //   dispatch(registerUser({ ...values, aflag: true }))
      const res = await userRegisteration({ ...values, aflag: true })
      if (res.success) {
        setRegistrationError("")
        setRegistrationSuccess(res.msg)
        // onSubmitProps.setSubmitting(false) //Vidhya
        onSubmitProps.resetForm()
      } else {
        setRegistrationSuccess("")
        setRegistrationError(res.msg)
      }
      setLoading(false)
    },
  })

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | Raincomputing</title>
      </MetaTags>
      <div className="d-none d-xl-block ps-lg-5 ms-lg-5">
        <img src={rainlogo} height="50" />
      </div>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="d-flex ">
        <div className="d-none d-xl-block  ps-lg-5 ms-lg-5 mt-2 ">
          <div className="my-5">
            <div className="justify-content-center">
              <img src={computer} height="350" />
            </div>
            <p className="fs-5 pt-5 ps-5 ">
              Manage all communication in one place
            </p>
          </div>
        </div>
        <div className="container  ms-xl-1 mt-2 ">
          <Container className="cont1">
            <Row className="justify-content-center">
              <Col md={8} lg={7} xl={9}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary"> Register</h5>
                          <p>Get your rain account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-3">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <Form
                        className="form-horizontal"
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                          onSubmit.reset()
                          //e. reset()
                        }}
                      >
                        {registrationSuccess && (
                          <Alert
                            className="fw-bolder text-center"
                            color="success"
                          >
                            {registrationSuccess}
                          </Alert>
                        )}

                        {registrationError && (
                          <Alert
                            color="danger"
                            className="fw-bolder text-center"
                          >
                            {registrationError}
                          </Alert>
                        )}

                        <div className="mb-2">
                          <Label className="form-label">First Name</Label>
                          <Input
                            name="firstname"
                            type="text"
                            placeholder="Enter first name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstname || ""}
                            invalid={
                              validation.touched.firstname &&
                              validation.errors.firstname
                                ? true
                                : false
                            }
                          />
                          {validation.touched.firstname &&
                          validation.errors.firstname ? (
                            <FormFeedback type="invalid">
                              {validation.errors.firstname}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-2">
                          <Label className="form-label">Last Name</Label>
                          <Input
                            name="lastname"
                            type="text"
                            placeholder="Enter last name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastname || ""}
                            invalid={
                              validation.touched.lastname &&
                              validation.errors.lastname
                                ? true
                                : false
                            }
                          />
                          {validation.touched.lastname &&
                          validation.errors.lastname ? (
                            <FormFeedback type="invalid">
                              {validation.errors.lastname}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-2">
                          <Label className="form-label">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
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
                        </div>

                        <div className="mb-2">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mt-3 d-grid">
                          {loading ? (
                            <button
                              type="button"
                              className="btn btn-dark"
                              style={{ cursor: "not-allowed" }}
                            >
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                              Registering...
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                              Register
                            </button>
                          )}
                        </div>

                        <div className=" mt-2 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="/login"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Login
                            </Link>{" "}
                          </p>
                        </div>

                        <div className="mt-2 text-center">
                          <p className="mb-0">
                            By registering you agree to the raincomputing{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RainRegister
