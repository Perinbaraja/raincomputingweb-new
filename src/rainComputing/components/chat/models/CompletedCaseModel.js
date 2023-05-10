import React, { useEffect, useState } from "react"
import { Modal } from "reactstrap"
import PropTypes from "prop-types"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { allCompletedCases } from "rainComputing/helpers/backend_helper"

const CompletedCaseModel = ({ setModalOpen }) => {
  const [allCompletedCase, setAllCompletedCases] = useState([]);
  const {currentUser} = useUser()
  function tog_scroll() {
    setModalOpen(false)
  }


  useEffect(() => {
    const getAllCompletedCases = async () => {
      try {
        const res = await allCompletedCases({userId: currentUser?.userID});
        if (res.success) {
          setAllCompletedCases(res.allcompletedCases);
        } else {
          console.log("Failed to get completed cases");
        }
      } catch (err) {
        console.error(err);
        console.log("Internal server error");
      }
    };
    getAllCompletedCases();
  }, [currentUser?.userID]);
  

  return (
    <>
    <ol>
    {allCompletedCase.map((c, i) => (
      <li key={i} className="border-bottom">
        <div className="pt-2">
          <h6>CaseName :{c.caseName}</h6>
          <p>CaseId : {c.caseId}</p>
        </div>
      </li>
    ))}
  </ol>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => tog_scroll()}
        >
          Close
        </button>
      </div>
    </>
  )
}
CompletedCaseModel.propTypes = {
  setModalOpen: PropTypes.func,
}
export default CompletedCaseModel