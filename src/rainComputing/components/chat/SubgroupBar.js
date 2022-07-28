import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Col, Row } from "reactstrap"
import "./style/subgroup-bar.scss"
import { getSubgroups } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const SubgroupBar = ({
  groups,
  setSelectedgroup,
  subGroupColors,
  subGroupIndex,
  setSubGroupindex,
}) => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const itemStyle = index => {
    const color = subGroupColors[index % subGroupColors.length] || "#00ff00"
    return {
      backgroundColor: subGroupIndex === index ? color : color + "22",
      color: subGroupIndex === index ? "white" : color,
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
                  style={itemStyle(s)}
                  onClick={() => {
                    setSubGroupindex(s)
                    setSelectedgroup(sub)
                  }}
                >
                  {sub.groupName} ({sub.groupMembers?.length})
                </div>
              ))}
          </div>
        </Col>
        {isShowMenu && (
          <Col xs={1}>
            <i className="bx bx-dots-vertical-rounded font-size-17 mt-1 pointer" />
          </Col>
        )}
      </Row>
    </div>
  )
}

SubgroupBar.propTypes = {
  setSelectedgroup: PropTypes.func,
  subGroupColors: PropTypes.any,
  groups: PropTypes.array,
  subGroupIndex: PropTypes.number,
  setSubGroupindex: PropTypes.func,
}

export default React.memo(SubgroupBar)
