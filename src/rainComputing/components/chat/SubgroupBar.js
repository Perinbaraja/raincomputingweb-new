import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Col, Row } from "reactstrap"
import "./style/subgroup-bar.scss"
import { getSubgroups } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const SubgroupBar = ({
  groups,
  setSelectedgroup,
  openSubGroupmodel,
  selectedGroup,
  currentCase,
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
            {/* <div
              className="pointer sg-item text-nowrap "
              style={itemStyle(0)}
              onClick={() => {
                setSelectedgroup(0), setSlectedSubGroup(parentRoom)
              }}
              // style={{ backgroundColor: colors[s % colors.length] }}
            >
              Everyone
            </div> */}
            {groups &&
              groups.map((sub, s) => (
                <div
                  key={s}
                  className="pointer sg-item text-nowrap "
                  style={itemStyle(sub)}
                  onClick={() => {
                    setSelectedgroup(sub)
                  }}
                >
                  {sub.groupName} ({sub.groupMembers?.length})
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
  subGroupColors: PropTypes.any,
  groups: PropTypes.array,
  openSubGroupmodel: PropTypes.func,
  currentCase: PropTypes.any,
}

export default React.memo(SubgroupBar)
