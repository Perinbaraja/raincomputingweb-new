import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import MetaTags from "react-meta-tags"
import AttorneyCard from "./attorneyLanding/AttorneyCard"
import AttorneyDetails from "./attorneyLanding/AttorneyDetailsCard"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const AttorneyLanding = () => {
  const { currentAttorney } = useUser()
  return (
    <div className="page-content ">
      <MetaTags>
        <title>Request Page | Rain - Admin & Dashboard Template</title>
      </MetaTags>
      {currentAttorney?.status && currentAttorney?.status === "approved" ? (
        <AttorneyDetails />
      ) : (
        <AttorneyCard status={currentAttorney?.status} />
      )}
    </div>
  )
}

export default AttorneyLanding
