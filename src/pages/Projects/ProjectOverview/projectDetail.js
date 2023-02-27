import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import "../../Projects/ProjectOverview/projectdetail.scss"
import { map, get, attempt } from "lodash"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import { attImages } from "../../../helpers/mockData"

const ProjectDetail = ({ project }) => {
  const imgIndex = Math.floor(Math.random() * 8)

  return (
    // <Card id="projcard" text-primary>
    //   <div id="appcard">
    //   <CardBody >

    //       <div className="d-flex">
    //         <img
    //           src={project?.regUser?.profilePic ? project?.regUser?.profilePic : attImages[imgIndex].url}
    //           alt=""
    //           className="avatar-md me-4"
    //         />
    //         {/* src={user.img ? user.img : attImages[imgIndex].url} */}
    //         <div className="flex-grow-1 overflow-hidden">
    //           <h5 className="text-primary text-truncate font-size-16">
    //             {project?.regUser?.firstname} {project?.regUser?.lastname}
    //           </h5>
    //           <p className="text-muted font-size-14">{project.firm}</p>
    //           <p className="text-muted font-size-14"><strong>{project.type}</strong></p>
    //         </div>

    //         <Row>
    //               <div className="d-flex justify-content-center mt-4 ">
    //                 <Link to={`/payment-via?uid=${project._id}`}>
    //                  <button type="button" className="btn btn-primary ms-3 w-lg ">
    //                    Get Appointment
    //                   </button>
    //                 </Link>
    //               </div>
    //         </Row>
    //       </div>

    //       <div>
    //         {" "}
    //         <h5 className="font-size-18 mb-3 mt-4 text-primary">Bio :</h5>
    //         <p className="text-muted font-size-14">{project.bio ? project.bio : null}</p>
    //       </div>
    //       <div>
    //         {" "}
    //         <h5 className="font-size-20 mb-3 mt-4 text-primary">Education :</h5>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l1 ? project.l1 : null}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project?.l2}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l3}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l4}
    //         </p>
    //       </div>
    //       <div>
    //         {""}
    //         <h5 className="font-size-18 mb-3 mt-4 text-primary">Technical Expertise :</h5>
    //         <p className="text-muted mb-1 font-size-14">
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l5}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {/* {" "} */}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l6}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {/* {" "} */}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l7}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l8}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l9}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l10}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l11}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l12}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l13}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l14}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l15}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l16}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l17}
    //         </p>
    //         <p className="text-muted mb-1 font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l18}
    //         </p>
    //       </div>
    //       <div>
    //         {" "}
    //         <h5 className="font-size-18 mb-3 mt-4 text-primary">Legal Experience :</h5>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l19}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project?.l20}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l21}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l22}
    //         </p>
    //         <p className="text-muted font-size-14 ">
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l23}
    //         </p>
    //         <p className="text-muted font-size-14 ">
    //           {/* {" "} */}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l24}
    //         </p>
    //         <p className="text-muted font-size-14 ">
    //           {/* {" "} */}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l25}
    //         </p>
    //         <p className="text-muted font-size-14 ">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l26}
    //         </p>
    //       </div>
    //       <div>
    //         {" "}
    //         <h5 className="font-size-18 mb-3 mt-4 text-primary">Practice Admissions :</h5>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l27}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project?.l28}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l29}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l30}
    //         </p>
    //         <p className="text-muted font-size-14 ">
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l31}
    //         </p>
    //         <p className="text-muted font-size-14 ">
    //           {/* {" "} */}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l32}
    //         </p>
    //       </div>
    //       <div>
    //         {" "}
    //         <h5 className="font-size-18 mb-3 mt-4 text-primary">Recognition :</h5>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l33}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project?.l34}
    //         </p>
    //         <p className="text-muted font-size-14">
    //           {" "}
    //           <i className="mdi mdi-chevron-right text-primary me-1" />
    //           {project.l35}
    //         </p>
    //       </div>

    //       <h5 className="font-size-18 mb-3 mt-4 text-primary">Attorney Address :</h5>
    //       <p> </p>
    //       <p className="text-muted font-size-14 ">
    //         {project.address1}, {project.address2}{" "}
    //       </p>
    //       <p className="text-muted ">{project.city}</p>
    //       <p className="text-muted ">{project.country}</p>
    //       <p className="text-muted ">{project.phone}</p>

    //       {/* {get(project, "projectDetails.description")} */}

    //       <div className="text-muted mt-4 ">
    //         {project.projectDetails &&
    //           map(project.projectDetails.points, (point, index) => (
    //             <p key={index}>
    //               <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
    //               {point}
    //             </p>
    //           ))}
    //       </div>

    //       <Row className="task-dates">
    //         {/* <Col sm="4" xs="6">
    //         <div className="mt-4">
    //           <h5 className="font-size-14">
    //             <i className="bx bx-calendar me-1 text-primary" /> Start Date
    //           </h5>
    //           <p className="text-muted mb-0">{project.startDate}</p>
    //         </div>
    //       </Col> */}

    //         {/* <Col sm="4" xs="6">
    //         <div className="mt-4">
    //           <h5 className="font-size-14">
    //             <i className="bx bx-calendar-check me-1 text-primary" /> Due
    //             Date
    //           </h5>
    //           <p className="text-muted mb-0">{project.dueDate}</p>
    //         </div>
    //       </Col> */}
    //       </Row>

    //   </CardBody>
    //   </div>
    // </Card>
    <Card id="projcard">
      
      <CardBody>
        
        <Row>
          <Col lg="6 ">
            <div className="d-flex">
              <img
                src={
                  project?.regUser?.profilePic
                    ? project?.regUser?.profilePic
                    : attImages[imgIndex].url
                }
                alt=""
                style={{width:"500px",height:"500px",objectFit:"cover"}}
              />
            </div>
          </Col>
          <Col lg="6 ">
            <div className="">
              <h1 className="">
                {project?.regUser?.firstname} {project?.regUser?.lastname}
              </h1>
            </div>
            <div className="">
              <h5 className="font-size-14">{project?.firm}</h5>
            </div>
            <div>
              {" "}
              <h5 className="font-size-18 mb-3 mt-4 text-primary">Bio :</h5>
              <p className="text-muted font-size-14">
                {project.bio ? project.bio : null}
              </p>
            </div>
            <div className="mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-telephone"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              <span className="font-size-18">{project?.phoneNumber}</span>
            </div>
            <div className="mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
              <span className="font-size-18 ">{project?.regUser?.email}</span>
            </div>
            <div className="mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span className="text-lowercase font-size-18">
                {project?.address},{project?.country},{project?.state},
                {project?.city},{project?.postalCode}
              </span>
            </div>
            <div className="d-flex justify-content-center mt-4 ">
              <Link to={`/payment-via?uid=${project._id}`}>
                <button type="button" className="btn btn-primary ms-3 w-lg ">
                  Get Appointment
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </CardBody>

    </Card>
  )
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
}

export default ProjectDetail
