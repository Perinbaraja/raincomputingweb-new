import React from "react"
import PropTypes from "prop-types"
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import profile from "assets/images/avatar-defult.jpg"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const CaseMembers = ({ members }) => {
  const { currentUser } = useUser()
  const MembersCard = ({ member }) => (
    <Card className="pointer member-card ">
      <CardImg
        top
        className="avatar-lg  align-self-center rounded-circle "
        src={profile}
        alt="members"
      />
      <CardBody className="text-center px-4 text-nowrap ">
        <CardTitle className="mt-0">
          {member?.id?.firstname} {member?.id?.lastname}
        </CardTitle>
        <CardText className="m-0">Rain Computing</CardText>
        <CardText className="">Attorney</CardText>
        <CardText className="text-muted">
          Added by{" "}
          {member?.addedBy?._id === currentUser?.userID
            ? "You"
            : member?.addedBy?.firstname + member?.addedBy?.lastname}
        </CardText>
      </CardBody>
    </Card>
  )

  return (
    <>
      <div className="mt-5 d-flex gap-5 p-2" style={{ overflowX: "auto" }}>
        {members.map((member, m) => (
          <div key={m} className="position-relative " style={{ width: 240 }}>
            <MembersCard member={member} />
            <span style={{ position: "absolute", top: 10, right: 10 }}>
              <i className="bx bx-message-alt-minus bg-danger font-size-16 rounded-circle text-white fw-medium" />
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

CaseMembers.propTypes = {
  members: PropTypes.array,
  member: PropTypes.object,
}

export default CaseMembers
