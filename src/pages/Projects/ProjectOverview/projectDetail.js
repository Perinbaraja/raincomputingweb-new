import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { map, get, attempt } from "lodash"
import {
  Card,
  CardBody,
  Col,
  Row,
  Label,
  Button,
  Input,
  Form,
  FormGroup,
  FormFeedback,
} from "reactstrap"
import { Link } from "react-router-dom"
import img1 from "../../../assets/images/img1m.png"
import * as Yup from "yup"
import { useFormik } from "formik"
import PerfectScrollbar from "react-perfect-scrollbar"
import { attImages } from "../../../helpers/mockData"
import ReactTextareaAutosize from "react-textarea-autosize"
import { appointmentRequest } from "rainComputing/helpers/backend_helper"
import { useHistory } from "react-router-dom"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const ProjectDetail = ({ project }) => {
  const history = useHistory()
  const { currentUser, setCurrentUser } = useUser()
  const imgIndex = Math.floor(Math.random() * 8)
  const [loading, setLoading] = useState(false)
  const [allFiles, setAllFiles] = useState([])
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      caseData: "",
    },
    validationSchema: Yup.object({
      caseData: Yup.string().required("Please Enter Your case detail"),
    }),
    onSubmit: values => {
      handleAppointmentRequest({
        caseData: values.caseData,
        attorney: "62d2a70586e7821195591d80",
        User: currentUser.userID,
        appointmentstatus: "request",
      })
    },
  })
  const handleAppointmentRequest = async payload => {
    console.log("req value: ", payload)
    const res = await appointmentRequest(payload)
    if (res.success) {
      toastr.success(`Appointment request send successfully `, "Success")
      localStorage.setItem("authUser", JSON.stringify(res))
      setCurrentUser(res)
      history.push("/payment-via")
    } else {
      toastr.error(`you have already send reqest`, "Failed!!!")
      console.log("Failed to send request", res)
    }
  }
  //Handling File change
  const handleFileChange = e => {
    setAllFiles(e.target.files)
  }
  const onKeyPress = e => {
    const { key } = e
    if (key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card>
      <CardBody>
        <PerfectScrollbar style={{ height: "330px" }}>
          <div className="d-flex">
            <img
              src={project.img ? project.img : attImages[imgIndex].url}
              alt=""
              className="avatar-lg rounded-circle me-4"
            />
            {/* src={user.img ? user.img : attImages[imgIndex].url} */}
            <div className="flex-grow-1 overflow-hidden">
              <h5 className="text-truncate font-size-16">
                {project.firstname} {project.lastname}
              </h5>
              <p className="text-muted font-size-14">{project.firm}</p>
              <p className="text-muted font-size-14">{project.type}</p>
            </div>
          </div>

          <div>
            {" "}
            <h5 className="font-size-16 mt-4">Biography :</h5>
            <p className="text-muted">{project.bio ? project.bio : null}</p>
          </div>
          <div>
            {" "}
            <h5 className="font-size-16 mt-4">Education :</h5>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l1 ? project.l1 : null}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project?.l2}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l3}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l4}
            </p>
          </div>
          <div>
            {""}
            <h5 className="font-size-16 mt-4">Technical Expertise :</h5>
            <p className="text-muted mb-1">
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l5}
            </p>
            <p className="text-muted mb-1">
              {/* {" "} */}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l6}
            </p>
            <p className="text-muted mb-1">
              {/* {" "} */}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l7}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l8}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l9}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l10}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l11}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l12}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l13}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l14}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l15}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l16}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l17}
            </p>
            <p className="text-muted mb-1">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l18}
            </p>
          </div>
          <div>
            {" "}
            <h5 className="font-size-16 mt-4">Legal Experience :</h5>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l19}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project?.l20}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l21}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l22}
            </p>
            <p className="text-muted ">
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l23}
            </p>
            <p className="text-muted ">
              {/* {" "} */}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l24}
            </p>
            <p className="text-muted ">
              {/* {" "} */}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l25}
            </p>
            <p className="text-muted ">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l26}
            </p>
          </div>
          <div>
            {" "}
            <h5 className="font-size-16 mt-4">Practice Admissions :</h5>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l27}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project?.l28}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l29}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l30}
            </p>
            <p className="text-muted ">
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l31}
            </p>
            <p className="text-muted ">
              {/* {" "} */}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l32}
            </p>
          </div>
          <div>
            {" "}
            <h5 className="font-size-16 mt-4">Recognition :</h5>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l33}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project?.l34}
            </p>
            <p className="text-muted">
              {" "}
              <i className="mdi mdi-chevron-right text-primary me-1" />
              {project.l35}
            </p>
          </div>

          <h5 className="font-size-16 mt-4">Attorney Address :</h5>
          <p> </p>
          <p className="text-muted ">
            {project.address1}, {project.address2}{" "}
          </p>
          <p className="text-muted ">{project.city}</p>
          <p className="text-muted ">{project.country}</p>
          <p className="text-muted ">{project.phone}</p>

          {/* {get(project, "projectDetails.description")} */}

          <div className="text-muted mt-4">
            {project.projectDetails &&
              map(project.projectDetails.points, (point, index) => (
                <p key={index}>
                  <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                  {point}
                </p>
              ))}
          </div>

          <Row className="task-dates">
            {/* <Col sm="4" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar me-1 text-primary" /> Start Date
              </h5>
              <p className="text-muted mb-0">{project.startDate}</p>
            </div>
          </Col> */}

            {/* <Col sm="4" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar-check me-1 text-primary" /> Due
                Date
              </h5>
              <p className="text-muted mb-0">{project.dueDate}</p>
            </div>
          </Col> */}
          </Row>
        </PerfectScrollbar>
      </CardBody>
      <Row>
        <div className="d-flex justify-content-center ">
          <Link to="/payment-via">
            <button type="button" className="btn btn-primary ms-3 w-lg ">
              Get Appointment
            </button>
          </Link>
        </div>
      </Row>
    </Card>
  )
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
}

export default ProjectDetail
