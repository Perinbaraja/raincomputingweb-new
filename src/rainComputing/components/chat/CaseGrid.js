import React, { useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Col, Collapse, Row } from "reactstrap"
import "./style/case-grid.scss"
import Chevron from "assets/icon/chevron-down.svg"
import profile from "assets/images/avatar-defult.jpg"
import { useToggle } from "rainComputing/helpers/hooks/useToggle"
import OnOffSwitch from "../switch/OnOffSwitch"
import DynamicModel from "../modals/DynamicModal"
import CaseMembers from "./CaseMembers"

const CaseGrid = ({
  caseData,
  index,
  active,
  onAccordionButtonClick,
  handleSelectingCase,
  selected,
}) => {
  const { toggleOpen: notifyOn, toggleIt: setNotifyOn } = useToggle(false)
  const {
    toggleOpen: membersModelOpen,
    setToggleOpen: setMembersModelOpen,
    toggleIt: toggleMembersModelOpen,
  } = useToggle(false)
  const AccordionContainer = ({ children }) => (
    <Row
      className="align-items-baseline my-2 text-muted"
      style={{ maxWidth: "100%" }}
    >
      <Col xs={11}>{children}</Col>
      <Col xs={1} style={{ padding: 0 }}>
        <img src={Chevron} className="accordion-icon-right" />
      </Col>
    </Row>
  )

  return (
    <>
      <>
        <DynamicModel
          open={membersModelOpen}
          toggle={toggleMembersModelOpen}
          size="lg"
          modalTitle=" Case Members Setting"
          modalSubtitle={`You have ${
            caseData?.caseMembers?.length + 1
          } Members`}
        >
          <CaseMembers members={caseData?.caseMembers} />
        </DynamicModel>
      </>
      <li className={classNames("px-3 py-2", selected && "active-case-bg")}>
        <Row className="align-middle py-1" style={{ maxWidth: "100%" }}>
          <Col
            xs={11}
            className="pointer"
            onClick={() => handleSelectingCase(caseData)}
          >
            <span className="fw-medium">{caseData.caseId}</span>
            <span className="text-muted font-size-12 ms-2">
              {caseData.caseName}
            </span>
          </Col>
          <Col xs={1} style={{ padding: 2 }}>
            <img
              src={Chevron}
              onClick={() => onAccordionButtonClick(index)}
              aria-expanded={index === active}
              className="accordion-icon"
            />
          </Col>
        </Row>

        <Collapse isOpen={index === active} className="accordion-collapse">
          <div
            className="mb-4 pointer"
            onClick={() => setMembersModelOpen(true)}
          >
            <span className="fw-medium font-size-11 ">Case Members</span>
            <AccordionContainer>
              <div className="members-container">
                {caseData?.caseMembers.map((member, m) => (
                  <div className="align-self-center me-1" key={m}>
                    <img
                      src={
                        member?.id?.profilePic
                          ? member?.id?.profilePic
                          : profile
                      }
                      className="avatar-xs rounded-circle"
                      alt=""
                    />
                    {/* <span className="d-flex fw-medium">
                      {members?.id?.firstname}{" "}
                    </span> */}
                  </div>
                ))}
              </div>
            </AccordionContainer>
          </div>
          <div className="mb-4 pointer">
            <span className="fw-medium font-size-11">
              Saved Messages & Files
            </span>
            {/* <AccordionContainer>
              <span>
                Bookmarks <span>({caseData?.bookmarks?.length})</span>
              </span>
            </AccordionContainer> */}
            {/* <AccordionContainer>
              <span>
                Pending Messages <span>(1)</span>
              </span>
            </AccordionContainer> */}
            {/* <AccordionContainer>
              <span>
                Shared Files <span>({caseData?.files?.length})</span>
              </span>
            </AccordionContainer> */}
          </div>
          {/* <div className="mb-2 pointer">
            <span className="fw-medium font-size-11">Case Notification</span>
            <div className="d-flex justify-content-between me-3">
              <span className="text-muted">Message Notification</span>
              <OnOffSwitch
                isNotificationOn={notifyOn}
                setNotify={setNotifyOn}
              />
            </div>
          </div> */}
        </Collapse>
      </li>
    </>
  )
}

CaseGrid.propTypes = {
  caseData: PropTypes.object,
  index: PropTypes.number,
  active: PropTypes.number,
  onAccordionButtonClick: PropTypes.func,
  handleSelectingCase: PropTypes.func,
  children: PropTypes.any,
  selected: PropTypes.bool,
}

export default CaseGrid
