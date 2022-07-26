import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Col, Row } from "reactstrap"
import "./style/subgroup-bar.scss"
import { getSubgroups } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const SubgroupBar = ({
  parentRoom,
  selectedGroup,
  setSelectedgroup,
  subGroupColors,
  setRecivers,
}) => {
  const { currentUser } = useUser()
  const [selectedSubGroup, setSlectedSubGroup] = useState(parentRoom)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [groups, setGroups] = useState([])
  const itemStyle = id => {
    const color = subGroupColors[id % subGroupColors.length] || "#00ff00"
    return {
      backgroundColor: selectedGroup === id ? color : color + "22",
      color: selectedGroup === id ? "white" : color,
    }
  }

  useEffect(() => {
    if (selectedGroup === 0) {
      setRecivers(
        parentRoom.members
          .filter(m => m._id !== currentUser?.userID)
          .map(r => r._id)
      )
    } else {
      setRecivers(
        selectedSubGroup.members
          .filter(m => m.id !== currentUser?.userID)
          .map(r => r.id)
      )
    }

    return () => {}
  }, [selectedSubGroup])

  useEffect(() => {
    console.log("parentRoom :", parentRoom)

    const gettingSubGroups = async () => {
      const payload = {
        parentRoomId: parentRoom._id,
      }

      const res = await getSubgroups(payload)

      if (res.success) {
        setGroups(res.subGroups)
      } else {
        console.log("Error while fetching SubGroups : ", res)
      }
    }

    gettingSubGroups()
    return () => {}
  }, [parentRoom])

  console.log("selectedSubGroup:", groups)
  return (
    <div className="sg-wrapper">
      <Row
        onMouseEnter={() => setIsShowMenu(true)}
        onMouseLeave={() => setIsShowMenu(false)}
        className="align-items-center"
      >
        <Col xs={11} className="">
          <div className="sg-container">
            <div
              className="pointer sg-item text-nowrap "
              style={itemStyle(0)}
              onClick={() => {
                setSelectedgroup(0), setSlectedSubGroup(parentRoom)
              }}
              // style={{ backgroundColor: colors[s % colors.length] }}
            >
              Everyone
            </div>
            {groups &&
              groups.map((sub, s) => (
                <div
                  key={s}
                  className="pointer sg-item text-nowrap "
                  style={itemStyle(s + 1)}
                  onClick={() => {
                    setSelectedgroup(s + 1), setSlectedSubGroup(sub)
                  }}
                >
                  {sub.name} ({sub.members?.length})
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
  setRecivers: PropTypes.func,
  subGroupColors: PropTypes.any,
  parentRoom: PropTypes.string,
}

export default React.memo(SubgroupBar)
