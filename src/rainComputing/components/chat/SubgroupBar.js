import React, { useState } from "react"
import PropTypes from "prop-types"
import { Col, Row } from "reactstrap"
import "./style/subgroup-bar.scss"

const SubgroupBar = ({ selectedGroup, setSelectedgroup, subGroupColors }) => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const itemStyle = id => {
    const color = subGroupColors[id % subGroupColors.length] || "#00ff00"
    return {
      backgroundColor: selectedGroup === id ? color : color + "22",
      color: selectedGroup === id ? "white" : color,
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
            {[1, 2, 3, 4].map((sub, s) => (
              <div
                key={s}
                className="pointer sg-item text-nowrap "
                style={itemStyle(s)}
                onClick={() => setSelectedgroup(s)}
                // style={{ backgroundColor: colors[s % colors.length] }}
              >
                {s === 0 ? "Everyone (6)" : `Private Group ${s} (5)`}
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
  selectedGroup: PropTypes.number,
  setSelectedgroup: PropTypes.func,
  subGroupColors: PropTypes.any,
}

export default SubgroupBar
