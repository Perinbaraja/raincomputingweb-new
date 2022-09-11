import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  FormFeedback,
} from "reactstrap"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { SERVER_URL } from "rainComputing/helpers/configuration"
import { Link } from "react-router-dom"
//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb"
import * as Yup from "yup"
import { useFormik } from "formik"
import { attImages } from "../../../../helpers/mockData"
import ReactTextareaAutosize from "react-textarea-autosize"
import { appointmentRequest } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const PaymentVia = () => {
  const history = useHistory()
  const { currentUser, setCurrentUser } = useUser()
  const imgIndex = Math.floor(Math.random() * 8)
  const [loading, setLoading] = useState(false)
  const [allFiles, setAllFiles] = useState([])
  const [isAttachments, setIsAttachments] = useState(false)
  const [caseData, setCaseData] = useState("")
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }
  const handleCancelClick = () => {
    history.push("/")
  }
  //SideEffect for setting isAttachments
  useEffect(() => {
    if (Array.from(allFiles)?.length > 0) {
      setIsAttachments(true)
    } else {
      setIsAttachments(false)
    }
  }, [allFiles])
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      caseData: "",
    },
    validationSchema: Yup.object({
      caseData: Yup.string().required("Please Enter Your case detail"),
    }),
    onSubmit: values => {
    },
  })
  
  //Textbox empty or spaces
  const isEmptyOrSpaces = () => {
    return caseData === null || caseData.match(/^ *$/) !== null
  }
  const handleAppointmentRequest = async () => {
    setLoading(true)
    if (isEmptyOrSpaces()) {
      // console.log("You can't send empty Case Details")
    } else {
      let attachmentsId = []
      let payload = {
        caseData: caseData,
        attorney: "631202e3879cd1751698643c",
        User: currentUser.userID,
        isAttachments,
        appointmentstatus: "requested",
      }
      if (isAttachments) {
        const formData = new FormData()
        for (var i = 0; i < allFiles.length; i++) {
          formData.append("file", allFiles[i])
        }
        const fileUploadRes = await axios.post(
          `${SERVER_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          }
        )
        const { data } = fileUploadRes
        if (data.success) {
          await data.files?.map(file =>
            attachmentsId.push({
              type: file.contentType,
              size: file.size,
              id: file.id,
              name: file.originalname,
              dbName: file.filename,
              aflag: true,
            })
          )
        } else {
          setLoading(false)
        }
      }
      payload.attachments = attachmentsId
      console.log("req value: ", payload)
      const res = await appointmentRequest(payload)
      if (res.success) {
        toastr.success(`Appointment request send successfully `, "Success")
        localStorage.setItem("authUser", JSON.stringify(res))
        history.push("/payment-page")
      } else {
        toastr.error(`you have already send reqest`, "Failed!!!")
        console.log("Failed to send request", res)
      }
      setAllFiles([])
      setCaseData("")
      setIsAttachments(false)
    }
    setLoading(false)
  }
  //Handling File change
  const handleFileChange = e => {
    setAllFiles(e.target.files)
  }
  const onKeyPress = e => {
    const { key } = e
    if (key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      // handleSendMessage()
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            User Payment Details | Rain - Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid>
          <>
            <Breadcrumb title="Rain" breadcrumbItem="User Payment Details" />
            <Row>
              <Col lg="10">
                <Card>
                  <CardBody>
                    <div>
                      <Row>
                        <label className="fw-bolder col-md-5 col-lg-2 col-form-label">
                          Attorney
                        </label>
                        <div className="col-md-5 col-lg-5 col-form-label ">
                          <label className="fw-bolder">
                            {"Hsuanyeh Chang, PhD, Esq."}{" "}
                          </label>
                        </div>
                      </Row>
                      <Row className="mb-5">
                        <label className="col-md-5 col-lg-2 col-form-label"></label>
                        <div className="col-md-5 col-lg-5 col-form-label ">
                          <label className="text-muted">
                            {"PATENT ATTORNEY & ATTORNEY AT LAW"}{" "}
                          </label>
                        </div>
                      </Row>

                      <Row>
                        <label className="fw-bolder col-md-5 col-lg-2 col-form-label">
                          Consultation Fees
                        </label>
                        <div className="col-md-5 col-lg-2 col-form-label ">
                          <label className="fw-bolder text-danger">$ 200</label>
                        </div>
                      </Row>

                      <Form
                        className="needs-validation"
                        onSubmit={e => {
                          e.preventDefault()
                          console.log("values")
                          validation.handleSubmit()
                        }}
                      >
                        <div className="p-2 chat-input-section pt-2">
                          <Row>
                            <Col>
                              <FormGroup className="mb-3">
                                <div className="position-relative">
                                  <ReactTextareaAutosize
                                    type="text"
                                    onKeyPress={onKeyPress}
                                    name="caseData"
                                    // onChange={validation.handleChange}
                                    onChange={e => setCaseData(e.target.value)}
                                    onBlur={validation.handleBlur}
                                    // value={validation.values.caseData || ""}
                                    value={caseData}
                                    invalid={
                                      validation.touched.caseData &&
                                      validation.errors.caseData
                                        ? true
                                        : false
                                    }
                                    style={{
                                      resize: "none",
                                    }}
                                    minRows={2}
                                    className="form-control "
                                    placeholder="Enter case details..."
                                  />
                                  {validation.touched.caseData &&
                                  validation.errors.caseData ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.caseData}
                                    </FormFeedback>
                                  ) : null}
                                  <div className="chat-input-links">
                                    <ul className="list-inline mb-0">
                                      <li className="list-inline-item">
                                        <div>
                                          <Input
                                            type="file"
                                            name="file"
                                            multiple={true}
                                            id="hidden-file"
                                            className="d-none"
                                            accept=".png, .jpg, .jpeg,.pdf,.doc,.xls,.docx,.xlsx,.zip"
                                            onChange={e => {
                                              handleFileChange(e)
                                            }}
                                          />

                                          <Label
                                            htmlFor="hidden-file"
                                            style={{ margin: 0 }}
                                          >
                                            <i
                                              className="mdi mdi-attachment mdi-rotate-315 mdi-24px"
                                              style={{
                                                color: "#556EE6",
                                                fontSize: 16,
                                              }}
                                            />
                                          </Label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </FormGroup>
                              {Array.from(allFiles)?.length > 0 && (
                                <div className="d-flex gap-2 flex-wrap mt-2 ">
                                  {Array.from(allFiles)?.map((att, a) => (
                                    <span
                                      className="badge badge-soft-primary font-size-13"
                                      key={a}
                                    >
                                      {att.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </Col>

                            <div className="modal-footer d-flex justify-content-center ">
                              <Button
                                // type="submit"
                                type="button"
                                color="primary"
                                className="btn btn-primary ms-3 w-lg "
                                disabled={isEmptyOrSpaces()}
                                onClick={() => handleAppointmentRequest()}
                              >
                                Payment
                              </Button>

                              <Button
                                type="button"
                                className="btn btn-danger ms-3 w-lg"
                                onClick={() => handleCancelClick()}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Row>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PaymentVia
