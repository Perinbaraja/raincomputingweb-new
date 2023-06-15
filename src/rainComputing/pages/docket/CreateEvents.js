import { useUser } from "rainComputing/contextProviders/UserProvider"
import { createEvent, getAllEvent } from "rainComputing/helpers/backend_helper"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const CreateEvents = () => {
  const { currentAttorney } = useUser()
  const { currentUser } = useUser()
  const [showFields, setShowFields] = useState(false)
  const [eventName, setEventName] = useState("")
  const [interval, setInterval] = useState("")
  const [description, setDescription] = useState("")
  const [allEventsData, setAllEventsData] = useState([])
  const [responseText, setResponseText] = useState([])
  const handleCreateEvent = async () => {
    const payload = {
      eventName: eventName,
      interval: interval,
      responseText: responseText,
      description: description,
      firmId: currentAttorney?._id,
    }
    const res = await createEvent(payload)
    if (res.success) {
      await handleAllEvents()
      setEventName("")
      setInterval("")
      setDescription("")
      setResponseText([])
    } else {
      console.log("Event Added Error")
    }
  }

  const toggleFields = () => {
    setShowFields(!showFields)
  }
  const handleAllEvents = async () => {
    const payload = {
      id: currentAttorney?._id,
    }
    const allEventsData = await getAllEvent(payload)
    setAllEventsData(allEventsData?.data)
  }
  useEffect(() => {
    handleAllEvents()
  }, [currentAttorney])
  useEffect(() => {
    if (interval) {
      const responseTextArray = []
      for (let i = 0; i < interval; i++) {
        responseTextArray.push("") // Add an empty string for each interval
      }
      setResponseText(responseTextArray)
    }
  }, [interval])
  return (
    <div className=" py-5 my-5">
    <div className="px-3 px-md-5">
      <h4>Create a New Event</h4>
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-primary">
            {currentAttorney?.regUser?.firstname}{" "}
            {currentAttorney?.regUser?.lastname}
          </h3>
        </div>
      </div>
      {showFields && (
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="event-name" className="form-label">
                Event Name
              </label>
              <input
                id="event-name"
                className="form-control"
                type="text"
                placeholder="Enter Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="intervals" className="form-label">
                Intervals
              </label>
              <input
                id="intervals"
                className="form-control"
                type="number"
                min="3"
                placeholder="Enter Intervals"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          {interval.length > 0 && (
  <div className="col-md-6">
    <div className="scrollable-container" style={{ maxHeight: "200px", overflowY: "auto" }}>
      <div className="form-group">
        <label htmlFor="response-text" className="form-label">
          Response Text
        </label>
        {responseText.map((text, index) => (
          <div key={index} className="form-group">
            <input
              id={`responseText${index}`}
              style={{ marginBottom: "10px" }}
              className="form-control"
              type="text"
              placeholder={`Enter Response Text ${index + 1}`}
              value={text}
              onChange={(e) => {
                const newText = e.target.value;
                setResponseText((prevState) =>
                  prevState.map((prevText, i) =>
                    i === index ? newText : prevText
                  )
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)}

          <div className="col-12 mt-3 mb-3">
            <button
              className="btn btn-primary"
              onClick={handleCreateEvent}
            >
              Submit
            </button>
          </div>
        </div>
      )}
  
      <i
        className={`bx ${
          showFields ? "bx-caret-up" : "bx-caret-down"
        } d-flex pointer`}
        onClick={toggleFields}
      >
        {!showFields ? (
          <p style={{ fontFamily: "Poppins, sans-serif" }}>
            Click to Create an Event
          </p>
        ) : (
          <p style={{ fontFamily: "Poppins, sans-serif" }}>
            Click to Close the Field
          </p>
        )}
      </i>
  
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">No of Intervals</th>
              <th scope="col">Description</th>
              <th scope="col">View/Edit</th>
            </tr>
          </thead>
          <tbody>
            {allEventsData?.map((data, key) => (
              <tr key={key}>
                <td>{data?.eventName}</td>
                <td>{data?.interval}</td>
                <td>{data?.description}</td>
                <td>
                  <Link to={`/manage_events?eid=${data._id}`}>
                    <i className="bx bx-show-alt" /> View
                  </Link>{" "}
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

export default CreateEvents
