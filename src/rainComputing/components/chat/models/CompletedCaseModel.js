import React, { useState } from "react"
import { Modal } from "reactstrap"
import PropTypes from "prop-types"

const CompletedCaseModel = ({ setModalOpen }) => {
  function tog_scroll() {
    setModalOpen(false)
  }
  return (
    <>
      <div className="">
        <ul className="list-unstyled chat-list ">
          <li className="border-bottom">
            <p>1</p>
          </li>
          <li className="border-bottom">
            <p>2</p>
          </li>
          <li className="border-bottom">
            <p>3</p>
          </li>
          <li className="border-bottom">
            <p>4</p>
          </li>
          <li className="border-bottom">
            <p>5</p>
          </li>
          <li className="border-bottom">
            <p>6</p>
          </li>
          <li className="border-bottom">
            <p>7</p>
          </li>
          <li className="border-bottom">
            <p>8</p>
          </li>
          <li className="border-bottom">
            <p>9</p>
          </li>
          <li className="border-bottom">
            <p>10</p>
          </li>
        </ul>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => tog_scroll()}
        >
          Close
        </button>
        <button type="button" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </>
  )
}
CompletedCaseModel.propTypes = {
  setModalOpen: PropTypes.func,
}
export default CompletedCaseModel
