import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  UncontrolledTooltip,
} from "reactstrap"
import { attImages } from "helpers/mockData"
import "./landingcard.scss"

const LandingCard = props => {
  const imgIndex = Math.floor(Math.random() * 8)
  const { user } = props

  return (
    <React.Fragment>
      <Col xl="4" md="6" sm="12">
        <Card className="text-center " id="attcard">
          <Link to={`/projects-overview?uid=${user._id}`}>
            <CardBody >
              <div className="d-flex">
                <div id="attimg">
                  <img
                    className="avatar-xl1"
                    src={user?.regUser?.profilePic ? user?.regUser?.profilePic : attImages[imgIndex].url}
                    alt=""
                  />
                </div>
                <div id="attdetail">
                  <div className="mt-1 mx-3">
                    <h5 id="attname" className="font-size-16 mb-1 text-primary ">
                     {user?.regUser?.firstname} {user?.regUser?.lastname} {user?.initial}
                    </h5>
                  </div> <br></br>
                  <p className="mx-3 text-dark" id="attfirm">PATTENT ATTORNEY & LAW</p>
                  <p className="mx-3 text-muted">Attorney</p>
              </div>
              </div>
              <div className="d-flex justify-content-end">
                <div id="prof"></div>
                    <div className="d-flex mx-3">
                      <Link
                        to={`/chat-rc`}
                        id={"message" + user._id}
                      >
                        <div id="attmenus">
                       <i className="bx bx-message-square-dots"  id="atticon"/>
                        </div>
                  
                        <UncontrolledTooltip
                         placement="bottom"
                         target={"message" + user._id}
                        >
                         Chat
                        </UncontrolledTooltip>
                      </Link>
                    </div>
                    <div className="d-flex mx-3">
                      <Link
                        to={`/projects-overview?uid=${user._id}`}
                        id={"profile" + user._id}
                     >
                        <div id="attmenus">
                        <i className="bx bx-user-circle" id="atticon" />
                        </div>
                      </Link>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"profile" + user._id}
                      >
                        Profile
                      </UncontrolledTooltip>
                    </div>

              </div>
              
            </CardBody>
          </Link>

          {/* <CardFooter className="bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              <div className="flex-fill">
                <Link
                  to={`/chat-rc?uid=62ec8de74fde4cb410073cc0`}
                  id={"message" + user._id}
                >
                  <i className="bx bx-message-square-dots" />
                  <UncontrolledTooltip
                    placement="bottom"
                    target={"message" + user._id}
                  >
                    Chat
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link to="#" id={"project" + user._id}>
                  <i className="bx bx-pie-chart-alt" />
                  <UncontrolledTooltip
                    placement="bottom"
                    target={"project" + user._id}
                  >
                    Schedule
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link
                  to={`/projects-overview?uid=${user._id}`}
                  id={"profile" + user._id}
                >
                  <i className="bx bx-user-circle" />
                </Link>
                <UncontrolledTooltip
                  placement="bottom"
                  target={"profile" + user._id}
                >
                  Profile
                </UncontrolledTooltip>
              </div>
            </div>
          </CardFooter> */}
        </Card>
      </Col>
    </React.Fragment>
  )
}

LandingCard.propTypes = {
  user: PropTypes.object,
}

export default LandingCard
