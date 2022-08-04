import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Link } from "react-router-dom"
//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb"
import { allUsersList } from "rainComputing/helpers/backend_helper"
import { removeUser } from "rainComputing/helpers/backend_helper"
import DeleteModal from "rainComputing/components/modals/DeleteModal"
import { useModal } from "rainComputing/helpers/hooks/useModal"

function usersList() {
  const [modalOpen, setModalOpen, toggleModal] = useModal(false)
  const [allUsers, setAllUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [action, setAction] = useState(false)

  const getAllUsers = async () => {
    const res = await allUsersList({})
    // console.log("res" ,res);
    if (res.success) {
      setAllUsers(res.users)
    }
  }
  const handleRemovingUser = async () => {
    const payload = {
      userID: [selectedUser?._id],
    }
    const res = await removeUser(payload)
    if (res.success) {
      console.log(res)
      await getAllUsers()
    } else {
      console.log("Error : ", res?.msg || "error")
    }
    setModalOpen(false)
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <React.Fragment>
      <DeleteModal
        show={modalOpen}
        onDeleteClick={handleRemovingUser}
        confirmText="Yes,Remove"
        cancelText="Cancel"
        onCloseClick={toggleModal}
      />
      <div className="page-content">
        <Container fluid>
          <Link to="/admin-page">
            <Breadcrumb title="Rain" breadcrumbItem=" Users List" />
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
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>

                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allUsers.map((user, j) => (
                            <tr key={j}>
                              <td>{j + 1} </td>
                              <td>{user.firstname} </td>
                              <td> {user.lastname}</td>
                              <td> {user.email}</td>

                              <td>
                                {/* <Dropdown
                                  isOpen={action}
                                  toggle={() => setAction(!action)}
                                  className="d-inline-block"
                                >
                                  <DropdownToggle 
                                    className="btn arrow-down"
                                    id="dropdown"
                                    tag="span"
                                  >
                                    Status
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      onClick={() => {
                                        setSelectedUser(user)
                                        setModalOpen(true)
                                      }}
                                    >
                                      Enable
                                    </DropdownItem>
                                    <DropdownItem >Disable</DropdownItem>
                                  </DropdownMenu> */}

                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setModalOpen(true)
                                  }}
                                >
                                  Remove
                                </button>
                                {/* </Dropdown> */}
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

export default usersList
