import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Button, Col, Row } from "reactstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { initialNewCaseValues } from "rainComputing/helpers/initialFormValues"
import {
  createNewCase,
  getAllUsers,
} from "rainComputing/helpers/backend_helper"

const CreateCase = ({
  formValues,
  setFormValues,
  setModalOpen,
  getAllCases,
}) => {
  const { currentUser } = useUser()

  const [loading, setloading] = useState(false)
  const [contacts, setContacts] = useState([])
  const [searchText, setSearchText] = useState("")
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  const handleFormValueChange = e => {
    const { name, value } = e.target
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }

  const handleAddingGroupMembers = member => {
    if (formValues.members.includes(member)) {
      const membersAfterRemove = formValues.members.filter(
        m => m._id !== member?._id
      )

      setFormValues(prevState => ({
        ...prevState,
        members: membersAfterRemove,
      }))
    } else {
      setFormValues(prevState => ({
        ...prevState,
        members: [...prevState.members, member],
      }))
    }
  }

  const isDisabled = () => {
    if (
      !formValues?.caseName ||
      !formValues?.caseId ||
      formValues?.members?.length < 1
    )
      return true
    return false
  }

  const handleCaseCreationCancel = () => {
    setFormValues(initialNewCaseValues)
    setModalOpen(false)
  }

  const handleCreatingCase = async () => {
    setloading(true)
    const filteredMembers = formValues?.members.map(m => m?._id)
    const payLoad = {
      admin: currentUser?.userID,
      caseId: formValues?.caseId,
      caseName: formValues?.caseName,
      members: [currentUser?.userID, ...filteredMembers],
    }
    const caseRes = await createNewCase(payLoad)
    if (caseRes.success) {
      toastr.success(
        `Case ${formValues?.caseId} has been created successfully`,
        "Case creation success"
      )
      await getAllCases({ isSet: false })
      handleCaseCreationCancel()
    } else {
      console.log("Case Creation Erron :", caseRes)
      toastr.error(
        ` ${caseRes?.msg} Failed to create case `,
        "Case creation failed!!!"
      )
    }
    setloading(false)
  }

  useEffect(() => {
    const handleFetchingContacts = async () => {
      const contactRes = await getAllUsers({
        userID: currentUser.userID,
        searchText,
      })
      if (contactRes.success) {
        setContacts(contactRes.users)
      } else {
        toastr.error(
          `Failed to fetch contacts ${contactRes?.msg}`,
          "Failed on fetching contacts"
        )
        setContacts([])
      }
    }
    handleFetchingContacts()
  }, [searchText])

  return (
    <>
      <Row>
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Case name
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="Case Anonymous"
            value={formValues.caseName}
            name="caseName"
            onChange={e => handleFormValueChange(e)}
          />
        </div>
      </Row>
      <Row className="my-md-3">
        <label
          htmlFor="example-text-input"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Case Id
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            placeholder="xxxx-xxxx"
            value={formValues.caseId}
            name="caseId"
            onChange={e => handleFormValueChange(e)}
          />
        </div>
      </Row>
      <Row className="my-3">
        <label
          htmlFor="user-search-text"
          className="col-md-3 col-lg-2 col-form-label"
        >
          Select members
        </label>
        <div className="col-md-8">
          <input
            className="form-control"
            type="text"
            id="user-search-text"
            placeholder="Search by name,email"
            value={searchText}
            name="searchText"
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      </Row>

      <Row>
        <Col xs={6} className="px-3 border-end border-info">
          <span className="text-muted">Members</span>
          <div className="d-flex flex-wrap gap-2 my-2">
            {contacts &&
              contacts
                .filter(f => !formValues.members.some(g => g?._id === f?._id))
                .filter(a => a?._id !== currentUser?.userID)
                .map((contact, c) => (
                  <Button
                    key={c}
                    color={
                      formValues.members.includes(contact._id)
                        ? "success"
                        : "light"
                    }
                    className="btn mx-1 mb-2"
                    onClick={() => handleAddingGroupMembers(contact)}
                  >
                    <div className="d-flex ">
                      {contact.firstname} {contact.lastname}
                    </div>

                    <div className="font-size-0 text-body ">
                      {contact.email}
                    </div>
                  </Button>
                ))}
          </div>
        </Col>
        <Col xs={6} className="px-3">
          <span className="text-muted">Case Members</span>
          <div className="d-flex flex-wrap gap-2 my-2">
            <Button color="success" className="btn mx-1 mb-2">
              <div className="d-flex ">
                {currentUser?.firstname} {currentUser?.lastname}
              </div>

              <div className="font-size-0 text-body ">{currentUser?.email}</div>
            </Button>
            {formValues?.members &&
              formValues?.members.map((member, m) => (
                <Button
                  key={m}
                  color="success"
                  className="btn mx-1 mb-2"
                  onClick={() => handleAddingGroupMembers(member)}
                >
                  <div className="d-flex ">
                    {member?.firstname + " " + member?.lastname}
                  </div>

                  <div className="font-size-0 text-body ">{member?.email}</div>
                </Button>
              ))}
          </div>
        </Col>
      </Row>

      <Row>
        <div className="modal-footer">
          {!loading && (
            <button
              type="button"
              onClick={() => {
                handleCaseCreationCancel()
              }}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Close
            </button>
          )}
          {loading ? (
            <button type="button" className="btn btn-dark ">
              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
              Loading
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleCreatingCase()}
              disabled={isDisabled()}
            >
              Create Case
            </button>
          )}
        </div>
      </Row>
    </>
  )
}

CreateCase.propTypes = {
  formValues: PropTypes.object,
  setFormValues: PropTypes.func,
  setModalOpen: PropTypes.func,
  getAllCases: PropTypes.func,
}

export default CreateCase
