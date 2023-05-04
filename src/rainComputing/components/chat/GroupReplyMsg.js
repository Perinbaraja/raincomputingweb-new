import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import moment from "moment"
import { getGroupNameById } from "rainComputing/helpers/backend_helper"
import ChatLoader from "./ChatLoader"

const GroupReplyMsg = props => {
  const { currentChat, msg, createdAt, caseId } = props?.notification

  const [isLoading, setIsLoading] = useState(true)
  const [caseName, setCaseName] = useState(caseId)

  useEffect(() => {
    const getGroupName = async () => {
      const groupRes = await getGroupNameById({ caseId })
      const groupData = groupRes?.caseDetails[0]?.caseId
      setCaseName(`${groupData?.caseName}`)
      setIsLoading(false)
    }
    getGroupName()
  }, [caseId])

  return (
    <>
      {" "}
      {isLoading ? (
        <ChatLoader />
      ) : (
        <Link
          to={`/chat-rc?rg_id=${currentChat?._id}&rc_id=${caseId}`}
          className="text-reset notification-item"
        >
          <div className="d-flex">
            <div className="avatar-xs me-3">
              <span className="avatar-title bg-primary rounded-circle font-size-16">
                <i className="bx bx-chat" />
              </span>
            </div>
            <div className="flex-grow-1">
              <div className="font-size-11 text-muted">
                <p className="mb-1 text-danger">{` New Reply messages from ${caseName}`}</p>
                <p className="text-primary">{`${msg}`}</p>
                <p className="mb-0">
                  <i className="mdi mdi-clock-outline" />{" "}
                  {moment(createdAt).format("DD-MM-YY hh:mm")}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}
GroupReplyMsg.propTypes = {
  notification: PropTypes.any,
}
export default GroupReplyMsg
