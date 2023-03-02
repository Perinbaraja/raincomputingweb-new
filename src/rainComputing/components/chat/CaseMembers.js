import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap"
import profile from "assets/images/avatar-defult.jpg"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { addAdmin } from "rainComputing/helpers/backend_helper"
import toastr from "toastr"

const CaseMembers = ({ members, admins, caseId }) => {
  const { currentUser } = useUser()

  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  const onAddingAdmin = async id => {
    const payload = {
      caseId,
      admin: id,
    }
    const res = await addAdmin(payload)
    toastr.success(`You has been Added Admin successfully`, "Success")
  }
  const MembersCard = ({ member }) => (
    <Card className="pointer member-card ">
      <CardImg
        top
        className="avatar-lg  align-self-center rounded-circle "
        src={member?.id?.profilePic ? member?.id?.profilePic : profile}
        alt="members"
        style={{ objectFit: "cover" }}
      />
      <CardBody className="text-center px-4 text-nowrap ">
        <CardTitle className="mt-0">
          {member?.id?.firstname} {member?.id?.lastname}
        </CardTitle>
        <CardText className="my-1">{member?.id?.email}</CardText>
        <CardText className="m-0">Rain Computing</CardText>
        <CardText className="">Attorney</CardText>
        <CardText className="text-muted">
          Added by{" "}
          {member?.addedBy?._id === currentUser?.userID
            ? "You"
            : member?.addedBy?.firstname + " " + member?.addedBy?.lastname}
        </CardText>
      </CardBody>
    </Card>
  )

  return (
    <>
      <div
        className="mt-5 d-flex gap-5 p-2 custom-scrollbar"
        style={{ overflowX: "auto" }}
      >
        {members.map((member, m) => (
          <div key={m} className="position-relative " style={{ width: 240 }}>
            <MembersCard member={member} />
            {admins?.includes(currentUser?.userID) &&
              !admins?.includes(member?.id?._id) && (
                <span
                  style={{ position: "absolute", top: 10, right: 10 }}
                  onClick={() => onAddingAdmin(member?.id?._id)}
                >
                  <i className="bx bx-plus bg-danger font-size-16 rounded-circle text-white fw-medium " id="Admin" />
                  <UncontrolledTooltip placement="bottom" target={"Admin"}>
                    Make a Admin
                  </UncontrolledTooltip>
                </span>
              )}
          </div>
        ))}
        {/* {admins?.includes(currentUser?.userID) && (
          <Card
            className="rounded border border-light d-flex flex-column text-black-50 justify-content-center align-items-center"
            style={{ minWidth: 240 }}
          >
            <i className="mdi mdi-plus-circle-outline mdi-48px pointer" />
          </Card>
        )} */}
      </div>
    </>
  )
}

CaseMembers.propTypes = {
  members: PropTypes.array,
  admins: PropTypes.array,
  member: PropTypes.object,
  caseId: PropTypes.string,
}

export default CaseMembers
