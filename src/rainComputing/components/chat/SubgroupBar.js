import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Col, Row } from "reactstrap"
import "./style/subgroup-bar.scss"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const SubgroupBar = ({
  groups,
  setSelectedgroup,
  openSubGroupmodel,
  selectedGroup,
  currentCase,
  notifyCount,
}) => {
  const { currentUser } = useUser()
  const [isShowMenu, setIsShowMenu] = useState(false)
  const itemStyle = sub => {
    const color = sub?.color ? sub?.color : "#0000FF"

    return {
      backgroundColor: selectedGroup?._id === sub?._id ? color : color + "22",
      color: selectedGroup?._id === sub?._id ? "white" : color,
    }
  }

  return (
    <div className="sg-wrapper">
      <Row
        onMouseEnter={() => setIsShowMenu(true)}
        onMouseLeave={() => setIsShowMenu(false)}
        className="align-items-center"
      >
        <Col xs={11} className="">
          <div className="sg-container">
            {groups &&
              groups.map((sub, s) => (
                <div
                  key={s}
                  className="pointer sg-item text-nowrap position-relative"
                  style={itemStyle(sub)}
                  onClick={() => {
                    setSelectedgroup(sub)
                  }}
                >
                  {sub.groupName} ({sub.groupMembers?.length})
                  {notifyCount(sub?._id) > 0 && (
                    // <div className="badge bg-danger font-size-11 ">
                    //   {notifyCount(sub?._id)}
                    // </div>
                    <i className="bx bxs-bell bx-tada text-danger">
                      {notifyCount(sub?._id)}
                    </i>
                  )}
                </div>
              ))}
          </div>
        </Col>
        {currentCase?.admins?.includes(currentUser?.userID) && isShowMenu && (
          <Col xs={1}>
            <i
              className="bx bx-dots-vertical-rounded font-size-17 mt-1 pointer"
              onClick={() => openSubGroupmodel(true)}
            />
          </Col>
        )}
      </Row>
    </div>
  )
}

SubgroupBar.propTypes = {
  selectedGroup: PropTypes.object,
  setSelectedgroup: PropTypes.func,
  groups: PropTypes.array,
  openSubGroupmodel: PropTypes.func,
  currentCase: PropTypes.any,
  notifyCount: PropTypes.func,
}

export default React.memo(SubgroupBar)
