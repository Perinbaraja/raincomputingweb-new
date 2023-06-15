import {
  eventUpdate,
  getEventById,
} from "rainComputing/helpers/backend_helper"
import { useQuery } from "rainComputing/helpers/hooks/useQuery"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ManageEvents = () => {
  const query = useQuery()
  const [eventsData, setEventsData] = useState([])
  const [showFields, setShowFields] = useState(false)
  const [responseText, setResponseText] = useState([])
  const [description, setDescription] = useState("")
  const [interval, setInterval] = useState()
  const [eventName, setEventName] = useState("")
  const Id = query.get("eid")
  const eventData = eventsData[0]
  const toggleFields = () => {
    setShowFields(!showFields)
  }
  const handleEventUpdate = async () => {
    const updatePlayLoad = {
      eventId: Id,
      responseText: responseText,
      description: description,
      interval: interval,
    }
    const res = await eventUpdate(updatePlayLoad)
    if (res.success) {
      await getEventsById()
    }
  }
  useEffect(() => {
    setEventName(eventData?.eventName)
    setDescription(eventData?.description)
    setInterval(eventData?.interval)
    setResponseText(eventData?.responseText.map(text => text))
  }, [eventData])
  const getEventsById = async () => {
    const payload = {
      Id: Id,
    }
    const allEventsData = await getEventById(payload)
    setEventsData(allEventsData?.event)
  }
  useEffect(() => {
    getEventsById()
  }, [])

  return (
    <div className="py-5 my-5">
      <div className="px-5">
        <Link to="/create_events">
          <p>Create Events /</p>
        </Link>
        <h4>Manage Event</h4>
        <>
          <h5 className="text-primary">{eventName}</h5>

          {showFields && (
            <div className="row">
              <div className="col-6">
                <div className="">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-3 col-lg-2 col-form-label"
                    style={{ minWidth: "100px" }}
                  >
                    Event Name
                  </label>
                  <div className="col-md-11 d">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Event Name"
                      value={eventName}
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-3 col-lg-2 col-form-label"
                    style={{ minWidth: "100px" }}
                  >
                    Intervals
                  </label>
                  <div className="col-md-11 d">
                    <input
                      className="form-control"
                      type="number"
                      min="3"
                      placeholder="Enter Intervals"
                      value={interval}
                      onChange={e => setInterval(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="description"
                    className="col-sm-3 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-md-11" style={{ minWidth: "100px" }}>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-3 col-lg-2 col-form-label"
                    style={{ minWidth: "100px" }}
                  >
                    Response Text
                  </label>

                  {interval && (
                    <div
                      className=""
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      <div className="col-md-11 d">
                        {[...Array(Number(interval))].map((_, index) => (
                          <div key={index} style={{ marginBottom: "10px" }}>
                            <input
                              className="form-control"
                              type="text"
                              placeholder={`Response Text ${index + 1}`}
                              value={responseText[index] || ""}
                              onChange={e => {
                                const updatedResponseText = [...responseText]
                                updatedResponseText[index] = e.target.value
                                setResponseText(updatedResponseText)
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-start pt-1 pb-3 col-md-5">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEventUpdate()}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </>
        <i
          className={`bx ${
            showFields ? "bx-caret-up" : "bx-caret-down"
          } d-flex pointer`}
          onClick={toggleFields}
        >
          {!showFields ? (
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              Click to Update an Event
            </p>
          ) : (
            <p style={{ fontFamily: "Poppins, sans-serif" }}>
              Click to Close the manage Field
            </p>
          )}
        </i>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">Event Name</th>
                <th scope="col">No of Intervels</th>
                <th scope="col">Description</th>
                <th scope="col">Response Text</th>
              </tr>
            </thead>
            <tbody>
              {eventsData?.map((data, key) => (
                <tr key={key}>
                  <td className="col-md-4">{data?.eventName}</td>
                  <td className="col-md-2">{data?.interval}</td>
                  <td className="col-md-2">{data?.description}</td>
                  <td className="col-md-4">
                    <ul>
                      {data?.responseText?.map((text, i) => (
                        <li key={i}>{text}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageEvents
