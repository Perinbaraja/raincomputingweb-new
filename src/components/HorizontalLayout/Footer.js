import React from "react"
import { Container, Row, Col, Button } from "reactstrap"
import { Link } from 'react-router-dom'
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
// import TwitterLogin from "react-twitter-auth"
import { GoogleLogin } from "react-google-login" 

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <div className="col-md-3 col-sm-10 " id="footermenu">
              <ul className="list-unstyled">
                <h3 className="text-primary">ABOUT</h3>
                <Link 
                role = "button"
                to = "#" className="text-dark">
                <li className="mt-4 "> - About Us</li>
                <li className="mt-3 "> - How it works</li>
                <li className="mt-3 "> - Security</li>
                </Link>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6" id="footermenu">
              <ul className="list-unstyled ">
                <h3 className="text-primary">SOLUTION</h3>
                <Link 
                role = "button"
                to = "#" className="text-dark">
                <li className="mt-4 "> - Enterprise</li>
                <li className="mt-3 "> - Private Label</li>
                <li className="mt-3 "> - Management</li>
                </Link>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6" id="footermenu">
              <ul className="list-unstyled  ">
                <h3 className="text-primary">CONTACT</h3>
                <Link 
                role = "button"
                to = "#" className="text-dark">
                <li className="mt-4 "> - Contact Us </li>
                <li className="mt-3"> - Careers</li>
                <li className="mt-3 "> - Security</li>
                </Link>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6 ">
              <ul className="list-unstyled  ">
                <h3 className="text-primary">FOLLOW US</h3>
                <Link 
                role = "button"
                to = "#" >
                <li className="mt-4 text-dark " >
                  <i className="mdi mdi-facebook text-primary mx-2" />
                  Facebook{" "}
                </li>
                {/* <li><i className="mdi mdi-twitter"/>Twitter</li> */}
                <li className="mt-3 text-dark ">
                  {" "}
                  <i className="mdi mdi-google text-primary mx-2" />
                  Google
                </li>
                </Link>
              </ul>
            </div>

            <hr></hr>

            <Col md={6}>{new Date().getFullYear()} © <a href="#" id="footlog">RainComputing</a></Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block mb-4">
                Design & Develop by <a href="#" id="footlog"><strong>RainComputing</strong></a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
