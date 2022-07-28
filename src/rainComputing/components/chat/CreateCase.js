import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Button, Row } from "reactstrap"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { initialNewCaseValues } from "rainComputing/helpers/initialFormValues"
import { createNewCase } from "rainComputing/helpers/backend_helper"

const CreateCase = ({
  formValues,
  setFormValues,
  contacts,
  setModalOpen,
  getAllCases,
}) => {
  const { currentUser } = useUser()

  const [loading, setloading] = useState(false)
  toastr.options = {
    progressBar: true,
    closeButton: true,
  }

  const handleFormValueChange = e => {
    const { name, value } = e.target
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }

  const handleAddingGroupMembers = id => {
    if (formValues.members.includes(id)) {
      const membersAfterRemove = formValues.members.filter(m => m !== id)

      setFormValues(prevState => ({
        ...prevState,
        members: membersAfterRemove,
      }))
    } else {
      setFormValues(prevState => ({
        ...prevState,
        members: [...prevState.members, id],
      }))
    }
  }

  const handleCaseCreationCancel = () => {
    setFormValues(initialNewCaseValues)
    setModalOpen(false)
  }

  const handleCreatingCase = async () => {
    const caseRes = await createNewCase(formValues)
    if (caseRes.success) {
      toastr.success(
        `Case ${formValues?.caseId} has been created successfully`,
        "Case creation success"
      )
      await getAllCases()
      handleCaseCreationCancel()
    } else {
      console.log("Case Creation Erron :", caseRes)
      toastr.error(`Failed to create case`, "Case creation failed!!!")
    }
  }

  useEffect(() => {
    setFormValues(prevState => ({
      ...prevState,
      admin: currentUser?.userID,
      members: [currentUser?.userID],
    }))
    return () => {}
  }, [])
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
        <p className="fw-medium">Select Members</p>
        <div
          className="px-1 d-flex overflow-auto"
          style={{ height: "max-content" }}
        >
          {contacts.map((contact, c) => (
            <Button
              key={c}
              color={
                formValues.members.includes(contact._id) ? "success" : "light"
              }
              className="btn mx-1 mb-2"
              onClick={() => handleAddingGroupMembers(contact._id)}
            >
              <div className="d-flex ">
                {contact.firstname} {contact.lastname}
              </div>

              <div className="font-size-0 text-body ">{contact.email}</div>
            </Button>
          ))}
        </div>
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
  contacts: PropTypes.array,
  setModalOpen: PropTypes.func,
  getAllCases: PropTypes.func,
}

export default CreateCase
