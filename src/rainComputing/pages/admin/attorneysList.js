import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  Table,
  Modal,
} from "reactstrap"
import { Link } from "react-router-dom"
//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb"
import { allAttorneysList } from "rainComputing/helpers/backend_helper"
import DeleteModal from "rainComputing/components/modals/DeleteModal"
import { useModal } from "rainComputing/helpers/hooks/useModal"
import { removeAttorney } from "rainComputing/helpers/backend_helper"

function attorneysList() {
  const [modalOpen, setModalOpen, toggleModal] = useModal(false)
  const [allAttorneys, setAllAttorneys] = useState([])
  const [selectedAttorney, setSelectedAttorney] = useState(null)

  const getAllAttorneys = async () => {
    const res = await allAttorneysList({})
    // console.log("res", res)
    if (res.success) {
      setAllAttorneys(res.attorneys)
    }
  }

  const handleRemovingAttorney = async () => {
    const payload = {
      regUser: [selectedAttorney?._id],
    }
    const res = await removeAttorney(payload)
    if (res.success) {
      console.log(res)
      await getAllAttorneys()
    } else {
      console.log("Error : ", res?.msg || "error")
    }
    setModalOpen(false)
  }

  useEffect(() => {
    getAllAttorneys()
  }, [])

  return (
    <React.Fragment>
      <DeleteModal
        show={modalOpen}
        onDeleteClick={handleRemovingAttorney}
        confirmText="Yes,Remove"
        cancelText="Cancel"
        onCloseClick={toggleModal}
      />
      <div className="page-content">
        <Container fluid>
          <Link to="/admin-page">
            <Breadcrumb title="Rain" breadcrumbItem=" Attorneys List" />
          </Link>
          <Card>
            <CardBody>
              <Form>
                <Row>
                  <Col>
                    <div className="table-responsive">
                      <Table className="table table-striped mb-0">
                        <thead>
                          <tr>
                            <th scope="col">S No</th>
                            <th scope="col">Attorney Name</th>
                            <th scope="col">Bar Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allAttorneys.map((attorney, i) => (
                            <tr key={i}>
                              <td>{i + 1} </td>
                              <td>
                                {attorney?.regUser?.firstname}{" "}
                                {attorney?.regUser?.lastname}{" "}
                              </td>
                              <td>{attorney.barNumber} </td>
                              <td> {attorney?.regUser?.email}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setSelectedAttorney(attorney)
                                    setModalOpen(true)
                                  }}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default attorneysList
