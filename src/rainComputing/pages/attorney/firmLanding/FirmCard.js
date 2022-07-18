import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap"

const FirmCard = ({ isMyFirm, firmname, membersCount, ctaLink }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="mt-0">{firmname}</CardTitle>
        <CardText>Total Members: {membersCount}</CardText>
        <Link
          to="/firmgroup"
          className={`btn ${isMyFirm ? "btn-success" : "btn-primary"}`}
        >
          {isMyFirm ? "Go to my firm" : "Go to firm"}
        </Link>
      </CardBody>
    </Card>
  )
}

FirmCard.propTypes = {
  isMyFirm: PropTypes.bool,
  firmname: PropTypes.string,
  membersCount: PropTypes.number,
  ctaLink: PropTypes.string,
}

export default FirmCard
