import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Col,
  Container,
  Row,
  Badge,
  Card,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap"
import Breadcrumb from "components/Common/Breadcrumb"
import { Link } from "react-router-dom"
import profile from "assets/images/avatar-defult.jpg"
import { appointmentUserStatus } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const AppointmentCard = () => {
  const [statusUpdate, setStatusUpdate] = useState(null)
  const { currentUser, setCurrentUser } = useUser()
  const chatid= "62ebc2854fde4cb41007350a"

  useEffect(() => {
    // if (currentUser?._id) {
    const getStatusByUser = async () => {
      const res = await appointmentUserStatus({
        userID: currentUser?.userID,
      })
      if (res.success) {
        setStatusUpdate(res.list)
        console.log("res :", res)
      }
    }
    getStatusByUser()
    // }
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Link to="/">
            <Breadcrumb title="Rain" breadcrumbItem="Appointment Status" />
          </Link>
          {statusUpdate && statusUpdate.length > 0 ? (
          <Row>
            {statusUpdate &&
              statusUpdate.map((att, i) => (
                <Col xl="4" sm="6" key={i}>
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <div className="avatar-md me-4">
                          <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                            <img
                              src={
                                att?.attorney?.regUser?.profilePic
                                  ? att?.attorney?.regUser?.profilePic
                                  : profile
                              }
                              className="rounded-circle  avatar-md"
                              alt=""
                              style={{ objectFit: "cover" }}
                            />
                          </span>
                        </div>

                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="text-truncate font-size-15">
                            {att?.attorney?.regUser?.firstname}
                            {"  "}
                            {att?.attorney?.regUser?.lastname}
                          </h5>
                          <p className="text-muted mb-4">ATTORNEY</p>
                        </div>
                      </div>
                    </CardBody>
                    <div className="px-4 py-3 border-top">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item me-5">
                          <Badge className={`${att?.appointmentstatus ? "bg-success" : "bg-warning"}`}>
                            {att?.appointmentstatus}
                          </Badge>
                        </li>
                        <li className="list-inline-item me-5" id="money">
                          <i className="mdi mdi-cash-usd-outline mdi-24px me-2" />
                          {"$ 200"}
                        </li>
                       { statusUpdate && att?.appointmentstatus === "approved" &&(
                        <Link
                        to={`/chat-rc?uid=${chatid}`}
                             >
                        <li className="list-inline-item me-3" id="chat">
                          <i className="mdi mdi-chat-outline mdi-24px me-1" /> {""}
                          <UncontrolledTooltip
                            placement="bottom"
                            target="chat"
                          >
                            Chat
                          </UncontrolledTooltip>
                        </li>
                        </Link>
                       )}
                      </ul>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
           ): (
            <p className="text-center">
              You Don&apos;t have any  Request Attorney
            </p>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AppointmentCard
