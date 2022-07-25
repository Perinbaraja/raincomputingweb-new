import React from "react"
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import profile from "assets/images/avatar-defult.jpg"

const CaseMembers = () => {
  const MembersCard = () => (
    <Card className="pointer member-card">
      <CardImg
        top
        className="avatar-lg  align-self-center rounded-circle "
        src={profile}
        alt="members"
      />
      <CardBody className="text-center px-4 text-nowrap ">
        <CardTitle className="mt-0">FirstName LastName</CardTitle>
        <CardText className="m-0">Company Name</CardText>
        <CardText className="">Title</CardText>
        <CardText className="text-muted">Added by you</CardText>
      </CardBody>
    </Card>
  )

  return (
    <>
      <div className="mt-5 d-flex gap-5 p-2" style={{ overflowX: "auto" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((member, m) => (
          <div key={m} className="position-relative " style={{ width: 240 }}>
            <MembersCard />
            <span style={{ position: "absolute", top: 10, right: 10 }}> -</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default CaseMembers
