import React, { lazy } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import PropTypes from "prop-types"
import { Card, CardBody, CardTitle } from "reactstrap"
import { useToggle } from "rainComputing/helpers/hooks/useToggle"
import DynamicSuspense from "../loader/DynamicSuspense"
const CreateSubGroup = lazy(() => import("./CreateSubGroup"))

const SubGroups = ({ groups, caseMembers, currentCaseId, getSubGroups }) => {
  const {
    toggleOpen: createSubGroupModelOpen,
    setToggleOpen: setCreateSubGroupModelOpen,
    toggleIt: toggleCreateSubGroupModelOpen,
  } = useToggle(false)
  return (
    <>
      <DynamicSuspense>
        <CreateSubGroup
          open={createSubGroupModelOpen}
          setOpen={setCreateSubGroupModelOpen}
          toggleOpen={toggleCreateSubGroupModelOpen}
          caseMembers={caseMembers}
          caseId={currentCaseId}
          getSubGroups={getSubGroups}
        />
      </DynamicSuspense>

      <div className="mt-1 d-flex gap-5 p-2" style={{ overflowX: "auto" }}>
        {groups &&
          groups.map((sub, i) => (
            <Card
              key={i}
              className="rounded text-nowrap"
              style={{ minWidth: 220 }}
            >
              <CardTitle className="bg-primary text-white px-2 pt-3 pb-2 ">
                {sub.groupName}
              </CardTitle>
              <CardBody className="p-2 my-2 text-nowrap">
                <PerfectScrollbar style={{ height: 180 }}>
                  {sub?.groupMembers &&
                    sub?.groupMembers.map((members, m) => (
                      <p key={m}>
                        {members?.id?.firstname + " " + members?.id?.lastname}
                      </p>
                    ))}
                </PerfectScrollbar>
              </CardBody>
            </Card>
          ))}
        <Card
          className="rounded border border-light d-flex flex-column text-black-50 justify-content-center align-items-center"
          style={{ minWidth: 220 }}
        >
          <i
            className="mdi mdi-plus-circle-outline mdi-48px pointer"
            onClick={() => {
              setCreateSubGroupModelOpen(true)
            }}
          />
        </Card>
      </div>
    </>
  )
}

SubGroups.propTypes = {
  groups: PropTypes.array,
  caseMembers: PropTypes.array,
  currentCaseId: PropTypes.any,
  getSubGroups: PropTypes.any,
}

export default SubGroups
