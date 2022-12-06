import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import moment from "moment"
import { getGroupNameById } from "rainComputing/helpers/backend_helper"
const GroupMsg = props => {
  // console.log("case notify : ", props)
  const { caseId, messageData, createdAt } = props?.notification

  const [isLoading, setIsLoading] = useState(true)
  const [caseName, setCaseName] = useState(caseId)

  useEffect(() => {
    const getGroupName = async () => {
      const groupRes = await getGroupNameById({caseId})
      const groupData = groupRes?.caseDetails[0]?.caseId
      // console.log("groupData",groupData)
      setCaseName(`${groupData?.caseName}`)
      setIsLoading(false)
    }
    getGroupName()
  }, [caseId])
  return (
    !isLoading && (
      <a href="/chat-rc" className="text-reset notification-item">
        <div className="d-flex">
          <div className="avatar-xs me-3">
            <span className="avatar-title bg-primary rounded-circle font-size-16">
              <i className="bx bx-chat" />
            </span>
          </div>
          <div className="flex-grow-1">
            <div className="font-size-11 text-muted">
              <p className="mb-1">{` New messages from ${caseName}`}</p>
              <p className="text-primary">{`${messageData}`}</p>
              <p className="mb-0">
                <i className="mdi mdi-clock-outline" />{" "}
                {moment(createdAt).format("DD-MM-YY hh:mm")}
              </p>
            </div>
          </div>
        </div>
      </a>
    )
  )
}
GroupMsg.propTypes = {
  notification: PropTypes.any,
}
export default GroupMsg
