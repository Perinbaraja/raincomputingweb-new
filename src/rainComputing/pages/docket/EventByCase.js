import PropTypes from "prop-types"
import { getEventsByCaseId } from "rainComputing/helpers/backend_helper"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const EventByCase = ({ location }) => {
  const caseData = location.state.caseData
  const tab = new URLSearchParams(location.search).get("tab")
  const [getAllEvents, setGetAllEvents] = useState([])

  useEffect(() => {
    if (caseData) {
      const getCaseEvents = async () => {
        const payload = {
          caseId: caseData?._id,
        }
        const res = await getEventsByCaseId(payload)
        if (res.success) {
          setGetAllEvents(res?.caseEvents)
        }
      }
      getCaseEvents()
    }
  }, [caseData])

  return (
    <div>
      <div className="py-5 my-5">
        <div>
          <div>
            <Link to="/chat-rc">
              <p>Chat /</p>
            </Link>
            <h6>Event Details</h6>
            <h5 className="text-primary">{caseData?.caseName}</h5>
          </div>
          <table className="table table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Received Date</th>
                <th scope="col">Response Date</th>
                <th scope="col">Response Text</th>
              </tr>
            </thead>
            <tbody>
              <React.Fragment>
                {getAllEvents?.map((data, index) =>
                  data?.events?.map((eve, i) => (
                    <tr key={i}>
                      <td className="col-md-3">{eve?.eventName}</td>
                      <td className="col-md-3">
                        {eve?.receivedDate.substring(0, 10) || ""}
                      </td>

                      <td className="col-md-3">
                        <ul>
                          {eve?.intervals?.map((int, inx) => (
                            <li key={inx}>
                              {int?.responseDate.substring(0, 10) || ""}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="col-md-3">
                        <ul>
                          {eve?.intervals?.map((int, inx) => (
                            <li key={inx}>{int?.responseText}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

EventByCase.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EventByCase
