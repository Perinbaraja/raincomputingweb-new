import React, { useEffect, useState } from "react"
import "toastr/build/toastr.min.css"
import toastr from "toastr"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import {
  createDomains,
  updateDomains,
  deleteDomains,
} from "rainComputing/helpers/backend_helper"
const ManageDomains = () => {
  const user = localStorage.getItem("authUser")
  const { currentUser, setCurrentUser } = useUser(user)
  console.log("currentUser",currentUser)
  // const alldomains = currentUser?.domains
  const [domainsname, setDomainsName] = useState([])
  const [alldomains, setAlldomains] = useState([])
  useEffect(() => {
    setAlldomains(currentUser?.domains)
  }, [currentUser])
  const handleIconClick = () => {
    setDomainsName(prevInputs => [...prevInputs, ""])
  }
  const handleEventTextChange = (index, value) => {
    setDomainsName(prevInputs => {
      const newEventsTexts = [...prevInputs]
      newEventsTexts[index] = value
      return newEventsTexts
    })
  }
  const handleRemoveField = index => {
    // if (setDomainsName.length === 1) {
    //   return // Do not remove the input when there is only one input
    // }
    setDomainsName(prevInputs => {
      const newInputs = [...prevInputs]
      newInputs.splice(index, 1)
      return newInputs
    })
  }
  const handleSubmit = async () => {
    const payload = {
      email: currentUser?.email,
      domains: domainsname,
    }
    const res = await createDomains(payload)
    if (res.success) {
      setDomainsName([])
      localStorage.setItem("authUser", JSON.stringify(res))
      setCurrentUser(res)
      toastr.success("Domains has been Created successfully", "Success!!!")
    }
  }
  const handleChange = (index, value) => {
    const updatedDomains = [...alldomains]
    updatedDomains[index].name = value
    setAlldomains(updatedDomains)
  }
  const handleUpdate = async () => {
    const payload = {
      email: currentUser?.email,
      domains: alldomains,
    }
    const res = await updateDomains(payload)
    if (res.success) {
      localStorage.setItem("authUser", JSON.stringify(res))
      setCurrentUser(res)
      toastr.success("Domains has been updated successfully", "Success!!!")
    }
  }
  const handleRemoveDomains = async (domainId, index) => {
    const deldomain = alldomains.filter(domain => domain._id === domainId)
    try {
      // Prepare the payload for the server
      const payload = {
        email: currentUser?.email,
        domains: deldomain,
      }
      // Make the API call to update the domains on the server
      const response = await deleteDomains(payload)
      if (response.success) {
        // Update the local user state only after a successful API call
        setAlldomains(alldomains.filter(domain => domain._id !== domainId))
        // Update the local user state
        localStorage.setItem("authUser", JSON.stringify(response))
        setCurrentUser(response)
        // Show a success message
        toastr.success("Domain has been removed successfully", "Success!!!")
      } else {
        // Handle failure, show an error message or take appropriate action
        console.error("Domain removal failed:", response.msg)
      }
    } catch (error) {
      // Handle API call error
      console.error("Error during domain removal:", error.message)
    }
  }
  return (
    <div className="mt-5">
      <h4 className="card-title mb-4">Add Invited Domain </h4>
      <div className="d-flex justify-content-center">
        <i
          className="bx bx-plus-circle pt-4 pointer text-primary"
          style={{ fontSize: "18px" }}
          onClick={e => {
            e.preventDefault()
            handleIconClick()
          }}
        ></i>
      </div>
      {domainsname &&<div className="col-md-5 col-sm-12 mb-3">
        <label htmlFor="example-text-input" className="form-label">
          Add Invited Domain
        </label>
        {domainsname.map((text, index) => (
          <div key={index} className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              value={text}
              onChange={e => handleEventTextChange(index, e.target.value)}
            />
            <span className="input-group-text">
              {domainsname.length === 1 ? (
                <i
                  className="bx bx-minus-circle text-danger pointer"
                  title="Minimum one Event is required"
                  style={{ cursor: "not-allowed" }}
                />
              ) : (
                <i
                  className="bx bx-minus-circle text-danger pointer"
                  title="Remove this Event"
                  onClick={() => handleRemoveField(index)}
                />
              )}
            </span>
          </div>
        ))}
      </div>}
      <div className="d-flex justify-content-start">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleSubmit()
          }}
        >
          Add domains
        </button>
      </div>
      {alldomains && 
      <div className="col-md-5 col-sm-12 mb-3">
        <label htmlFor="example-text-input" className="form-label">
          Manage Domains
        </label>
        {alldomains.map((domain, index) => (
          <div key={index} className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              value={domain.name}
              onChange={e => handleChange(index, e.target.value)}
            />
            <span className="input-group-text">
              {alldomains.length === 1 ? (
                <i
                  className="bx bx-minus-circle text-danger pointer"
                  title="Minimum one Event is required"
                  style={{ cursor: "not-allowed" }}
                />
              ) : (
                <i
                  className="bx bx-minus-circle text-danger pointer"
                  title="Remove this Domain"
                  onClick={() => handleRemoveDomains(domain._id, index)}
                />
              )}
            </span>
          </div>
        ))}
      </div>}
      <div className="d-flex justify-content-start">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleUpdate()
          }}
        >
          update
        </button>
      </div>
    </div>
  )
}
export default ManageDomains
