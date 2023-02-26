import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { useLocation, withRouter } from "react-router-dom"
import { isEmpty } from "lodash"
import { Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import ProjectDetail from "./projectDetail"
//IMPORT ATTORNEY DETAILS
import { getAttorneyByid as onGetAttorneyDetails } from "store/projects/actions"
//redux
import { useSelector, useDispatch } from "react-redux"
import { regAttorneyDetails } from "rainComputing/helpers/backend_helper"

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}
const ProjectsOverview = props => {
  const [attorneyDetails,setAttorneyDetail] = useState({})
  let query = useQuery()

    const getAttorneyinfo = async () => {
      const res = await regAttorneyDetails({objectId:query.get("uid")})
      if (res) {
        setAttorneyDetail(res.attorney)
      }
  }
console.log("attorneyDetails:",attorneyDetails);
  useEffect(() =>{
    getAttorneyinfo()
  },[])

  return (
    <React.Fragment>
      <div className="p-5 m-5">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Projects" breadcrumbItem="Project Overview" /> */}
          {!isEmpty(attorneyDetails) && (
            <>
              <Row>
                <Col>
                  <ProjectDetail project={attorneyDetails} />
                </Col>

                
                {/* <Col lg="4">
                  <TeamMembers team={projectDetail.team} />
                </Col> */}
              </Row>
              <Row>
                {/* <Col lg="4">
                  <OverviewChart options={options} series={series} />
                </Col> */}
                {/* <Col lg="4">
                  <AttachedFiles files={projectDetail.files} />
                </Col> */}
                {/* <Col lg="4">
                  <Comments comments={projectDetail.comments} />
                </Col> */}
              </Row>
             
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}
ProjectsOverview.propTypes = {
  match: PropTypes.object,
}
export default withRouter(ProjectsOverview)
