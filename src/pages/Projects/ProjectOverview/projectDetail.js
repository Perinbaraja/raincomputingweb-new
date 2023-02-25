import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import "../../Projects/ProjectOverview/projectdetail.scss"
import { map, get, attempt } from "lodash"
import {
  Card,
  CardBody,
  Row,
} from "reactstrap"
import { Link } from "react-router-dom"
import { attImages } from "../../../helpers/mockData"

const ProjectDetail = ({ project }) => {
  const imgIndex = Math.floor(Math.random() * 8)

  return (
    <Card id="projcard">
      <div id="appcard">
      <CardBody >
        
          <div className="d-flex">
            <img
              src={project.profilePic ? project.profilePic : attImages[imgIndex].url}
              alt=""
              className="avatar-lg me-4"
            />
            {/* src={user.img ? user.img : attImages[imgIndex].url} */}
            <div className="flex-grow-1 overflow-hidden">
              <h5 className="text-primary text-truncate font-size-16">
                {project.firstname} {project.lastname}
              </h5>
              <p className="text-muted font-size-14">{project.firm}</p>
              <p className="text-muted font-size-14"><strong>{project.type}</strong></p>
            </div>

            <Row>
                  <div className="d-flex justify-content-center mt-4 ">
                    <Link to={`/payment-via?uid=${project._id}`}>
                     <button type="button" className="btn btn-primary ms-3 w-lg ">
                       Get Appointment
                      </button>
                    </Link>
                  </div>
            </Row>
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
         
      </CardBody>
      </div> 
    </Card>
  )
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
}

export default ProjectDetail
