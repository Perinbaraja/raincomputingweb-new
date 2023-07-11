import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import { withTranslation } from "react-i18next"
import { useNotifications } from "rainComputing/contextProviders/NotificationsProvider"
import PrivateMsg from "rainComputing/components/chat/PrivateMsg"
import GroupMsg from "rainComputing/components/chat/GroupMsg"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import ChatLoader from "rainComputing/components/chat/ChatLoader"
import PrivateReplyMsg from "rainComputing/components/chat/PrivateReplyMsg"
import GroupReplyMsg from "rainComputing/components/chat/GroupReplyMsg"

const NotificationDropdown = props => {
  const { currentUser, setCurrentUser } = useUser()
  const { notifications, setNotifications } = useNotifications()
 
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    // Check if there are new notifications
    if (currentUser?.isNotifySound) {
      const newNotifications = notifications.filter(
        notify => !notify.playedSound
      )

      if (newNotifications.length > 0) {
        // Play the audio notification for each new notification
        newNotifications.forEach(notify => {
          const audioElement = new Audio(currentUser?.notificationSound)
          audioElement.play()

          // Update the notification to mark it as played
          notify.playedSound = true
        })

        // To trigger re-render and update the notifications array in state
        setNotifications([...notifications])
      }
    }
  }, [currentUser?.isNotifySound, notifications, ])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          {currentUser && <i className="bx bx-bell" />}
          {notifications.length > 0 && (
            <span className="badge bg-danger rounded-pill">
              {notifications.length}
            </span>
          )}
        </DropdownToggle>
        {notifications.length > 0 && (
          <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0"> {props.t("Notifications")} </h6>
                </Col>
                <div className="col-auto">
                  <a href="/chat-rc" className="small">
                    {" "}
                    View All
                  </a>
                </div>
              </Row>
            </div>
            {loading ? (
              <ChatLoader />
            ) : (
              <SimpleBar style={{ height: "230px" }}>
                <div>
                  {notifications.map((notify, i) => {
                    if (notify.isReply && !notify.caseId) {
                      return <PrivateReplyMsg notification={notify} key={i} />
                    } else if (notify.isReply && notify.caseId) {
                      return <GroupReplyMsg notification={notify} key={i} />
                    } else if (notify.caseId) {
                      return <GroupMsg notification={notify} key={i} />
                    } else {
                      return (
                        <div className="text-reset notification-item" key={i}>
                          <PrivateMsg notification={notify} key={i} />
                        </div>
                      )
                    }
                  })}
                </div>
              </SimpleBar>
            )}
          </DropdownMenu>
        )}
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
