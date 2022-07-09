import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"

//Import Card
import LandingCard from "./LandingCard"

//redux
import {
  getAllAttorneys,
  getAttorneysCount,
} from "rainComputing/helpers/backend_helper"
import Pagination from "components/pagination/Pagination"

const LandingGrid = () => {
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(true)
  const [attorneys, setAttorneys] = useState([])
  const [attorneysCount, setAttorneysCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)

  const loadAttorney = async () => {
    const res = await getAllAttorneys({ page, limit, searchText })
    if (res.success) {
      setAttorneys(res.attorneys)
    } else {
      console.log("Error while fetching Attorneys", res)
    }
  }

  const loadAttorneyCount = async () => {
    const res = await getAttorneysCount({ searchText })
    if (res.success) {
      setAttorneysCount(res.count)
    } else {
      console.log("Error while fetching AttorneysCount", res)
    }
  }

  useEffect(() => {
    const handleLoad = async () => {
      setLoading(true)
      await loadAttorney()
      setLoading(false)
    }
    handleLoad()
  }, [page, limit])

  useEffect(() => {
    setPage(1)
  }, [searchText])

  useEffect(() => {
    console.log("searchText :", searchText)
    const handleLoad = async () => {
      setLoading(true)
      await loadAttorneyCount()
      await loadAttorney()
      setLoading(false)
    }

    handleLoad()
  }, [searchText])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Raincomputing | Homepage</title>
        </MetaTags>

        <Container fluid>
          <>
            <div className="mb-2">
              <form className="app-search  ">
                <div className="position-relative">
                  <input
                    type="text-success"
                    className="form-control "
                    placeholder="Search for Attorney..."
                    onChange={e => setSearchText(e.target.value)}
                  />
                  <span className="bx bx-search-alt" />
                </div>
              </form>
            </div>
            {loading ? (
              <Row>
                <Col xs="12">
                  <div className="text-center my-3">
                    <Link to="#" className="text-success">
                      <i className="bx bx-hourglass bx-spin me-2" />
                      Loading. . .
                    </Link>
                  </div>
                </Col>
              </Row>
            ) : (
              <>
                <Row>
                  {map(attorneys, (user, key) => (
                    <LandingCard user={user} key={"_user_" + key} />
                  ))}
                </Row>
                <div className="d-flex justify-content-center">
                  <Pagination
                    className="pagination-bar"
                    currentPage={page}
                    totalCount={attorneysCount}
                    pageSize={limit}
                    onPageChange={p => setPage(p)}
                  />
                </div>
              </>
            )}
          </>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(LandingGrid)
