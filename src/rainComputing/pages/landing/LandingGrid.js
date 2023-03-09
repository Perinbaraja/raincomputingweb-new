import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"
import banner from "../../../assets/images/background-img/banner.jpg"
import illustration from "../../../assets/images/law-illustration.jpg"
import PerfectScrollbar from "react-perfect-scrollbar"
import contact from "../../../assets/images/contact-mail.gif"

//Import Card
import LandingCard from "./LandingCard"

// //redux
// import {
//   getAllAttorneys,
//   getAttorneysCount,
// } from "rainComputing/helpers/backend_helper"

import { getAllRegAttorneys } from "rainComputing/helpers/backend_helper"

import Pagination from "components/pagination/Pagination"
import ChatBot from "../chatbot"
import { useDropzone } from "react-dropzone"

const LandingGrid = () => {
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(true)
  const [attorneys, setAttorneys] = useState([])
  const [attorneysCount, setAttorneysCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)

  const loadAttorney = async () => {
    const res = await getAllRegAttorneys({ page, limit, searchText })
    if (res.success) {
      // console.log(first)
      setAttorneys(res.attorneys)
    } else {
      console.log("Error while fetching Attorneys", res)
    }
  }
  // const loadAttorneyCount = async () => {
  //   const res = await getAttorneysCount({ searchText })
  //   if (res.success) {
  //     setAttorneysCount(res.count)
  //   } else {
  //   }
  // }

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
    const handleLoad = async () => {
      setLoading(true)
      // await loadAttorneyCount()
      await loadAttorney()
      setLoading(false)
    }

    handleLoad()
  }, [searchText])

  return (
    <React.Fragment>
      <div>
        <div className="" id="landinggrid">
          <Container fluid>
            <div className="mb-2">
              <div className="app-search ">
                <input
                  type="text-success"
                  className="form-control "
                  placeholder="Search for Attorney..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
                {/* <span className="bx bx-search-alt mt-3" /> */}
              </div>
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
                  {attorneys
                    ?.filter(
                      item =>
                        item?.regUser?.firstname
                          ?.toString()
                          .toLowerCase()
                          .includes(searchText.toString().toLowerCase()) ||
                        item?.regUser?.lastname
                          ?.toString()
                          .toLowerCase()
                          .includes(searchText.toString().toLowerCase()) ||
                        item?.regUser?.firm
                          ?.toString()
                          .toLowerCase()
                          .includes(searchText.toString().toLowerCase())
                    )
                    .slice((page - 1) * 12, page * 12)
                    .map((user, key) => (
                      <LandingCard user={user} key={"_user_" + key} />
                    ))}
                </Row>
                <div className="d-flex justify-content-center">
                  <Pagination
                    className="pagination-bar"
                    currentPage={page}
                    totalCount={attorneys?.length}
                    pageSize={limit}
                    onPageChange={p => setPage(p)}
                  />
                </div>

                {/* <div>
         <div  id="bannerimg" className="text-white"> A law firm with a passion for success<br/>
              <div id="rights">Protecting Your<span className="text-primary" id="span"> Rights</span>, Your <span className="text-primary" id="span">Freedom</span>, Your <span className="text-primary" id="span">Future</span></div>
         </div> 
      
          <img src= {banner} alt="banner background"  id="banner"/>
           
      </div> */}
                <section style={{paddingTop:"50px",paddingBottom:"60px"}}>
                  <div className="">
                    <div className="d-flex flex-md-row flex-column" id="">
                      <div id="" className="col-sm-8">
                        <div>
                          <h2 className=" text-primary mb-5 " id="">
                            About Us <div style={{width:"70px",height:"3px",backgroundColor:"#556ee6",borderRadius:"10px"}}></div>
                          </h2>
                        </div>
                        <p id="">
                          We pride ourselves on our down to earth and friendly
                          approach, with many of us being heavily involved in
                          our spare time in making the law a better and more
                          accessible place for all. Members are currently
                          involved in Bar Council Committees, Inn Scholarship
                          Committees, wellbeing, advocacy training, ethics
                          training and outreach programmes to Inner London
                          schools. We are a group of passionate mental health
                          advocates, experienced criminal defense attorneys and
                          rock star paralegals. Above all, we are human beings
                          that want to help you and your family face the
                          criminal justice system with confidence.
                        </p>
                        <p id="">
                          {" "}
                          At the same time we have the advantage of being
                          present in four different cities and therefore closer
                          to our clients. We provide a new level of legal
                          services that bridges the gap between the law and
                          modern business reality. An ongoing measure of success
                          is the large number of referrals we receive from
                          satisfied clients.
                        </p>
                      </div>

                      <div id="" className="flex-fill">
                        <img
                          src={illustration}
                          alt="about illustration"
                          className="img-fluid"
                          id="illimage"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <div
                  className=" d-flex flex-md-row flex-column px-5 "
                  style={{ paddingTop: "50px", paddingBottom: "90px" }}
                >
                  <div id="" className="col-md-6 col-sm-12">
                    {/* <h2 >Contact Us </h2>
                           <div id="contactline"></div> */}

                    <img src={contact} alt="contact info" id="congif" />

                    <h4>Love to hear from you</h4>
                    <p>Stay Connected.....</p>
                  </div>

                  <div id="" className="col-md-6 col-sm-12">
                    <h2>Contact Us </h2>
                    <div id="contactline"></div>

                    <div className="formsec">
                      <form>
                        <input
                          type="text"
                          placeholder="FirstName"
                          required
                          id="formcon1"
                        ></input>
                        <input
                          type="text"
                          placeholder="LastName"
                          id="formcon"
                        ></input>
                        <input
                          type="email"
                          placeholder="Mail ID"
                          required
                          id="formcon1"
                        ></input>

                        <input
                          type="tel"
                          placeholder="Phone no"
                          id="formcon"
                        ></input>
                      </form>
                      <button type="button" id="formbut">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Container>
          <div className="py-5">
            <iframe
              src="https://webchat.botframework.com/embed/testrainbot-bot?s=8ugnF6uTJL4.-geCgZnAB57pnDg_qR3LdDFbCrZ0cQd4ObBVhmNUaSQ"
              style={{ minWidth: "400px", width: "100px", height: "500px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(LandingGrid)
