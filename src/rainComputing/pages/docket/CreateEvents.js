import { useUser } from "rainComputing/contextProviders/UserProvider"
import { createEvent, getAllEvent } from "rainComputing/helpers/backend_helper"
import React, { useEffect, useState } from "react"

const CreateEvents = () => {
  const { currentAttorney } = useUser()
  const { currentUser } = useUser()
  const [showFields, setShowFields] = useState(false)
  const [eventName, setEventName] = useState("")
  const [interval, setInterval] = useState("")
  const [description, setDescription] = useState("")
  const [allEventsData, setAllEventsData] = useState([])
const handleCreateEvent =async ()=>{
    const payload={
        eventName:eventName,
        interval:interval,
        description:description,
        firmId:currentAttorney?._id
    }
    const res = await createEvent(payload)
    if(res.success){
        await handleAllEvents()
        setEventName("")
        setInterval("")
        setDescription("")
    }else{
        console.log("Event Added Error")
    }
}

  const toggleFields = () => {
    setShowFields(!showFields)
  }
  const handleAllEvents = async () => {
    const payload = {
      id:currentAttorney?._id
    }
    const allEventsData = await getAllEvent(payload)
    setAllEventsData(allEventsData?.data)
  }
  useEffect(() => {
   
    handleAllEvents()
  }, [currentAttorney])
  return (
    <div className="py-5 my-5">
      <div className="px-5">
        <h4>Create a New Event</h4>
        <div className="col-md-6">
          <h3 className="text-primary">
            {currentAttorney?.regUser?.firstname}{" "}
            {currentAttorney?.regUser?.lastname}
          </h3>
        </div>
        {showFields && (
          <div>
            <div className="col-md-6">
              <label
                htmlFor="example-text-input"
                className="col-md-3 col-lg-2 col-form-label"
                style={{ minWidth: "100px" }}
              >
                Event Name
              </label>
              <div className="col-md-11 d ">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Event Name"
                  value={eventName}
                  onChange={(e)=>setEventName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label
                htmlFor="example-text-input"
                className="col-md-3 col-lg-2 col-form-label"
                style={{ minWidth: "100px" }}
              >
                Intervels
              </label>
              <div className="col-md-11 d ">
                <input
                  className="form-control"
                  type="number"
                  min="3"
                  placeholder="Enter Intervels"
                  value={interval}
                  onChange={(e)=>setInterval(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="col-sm-3 col-form-label">
                Description
              </label>
              <div className="col-md-11" style={{ minWidth: "100px" }}>
                <textarea
                  className="form-control"
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-center pt-3 col-md-6 ">
              <button className="btn btn-primary" onClick={handleCreateEvent}>Submit</button>
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

        <table className="table table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">No of Intervels</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {allEventsData?.map((data,key)=>(<tr key={key}>
              <td className="col-md-4"> {data?.eventName}</td>
              <td className="col-md-4">{data?.interval}</td>
              <td className="col-md-6">{data?.description}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreateEvents
