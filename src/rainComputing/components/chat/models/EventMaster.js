import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { createEvent, getAllStatus } from "rainComputing/helpers/backend_helper"

const EventMaster = ({ caseId, closeModal }) => {
  const [docDate, setDocDate] = useState(Array(1).fill(""))
  const [selectedEvent, setSelectedEvent] = useState(Array(1).fill(""))
  const [eventText, setEventText] = useState(Array(1).fill(""))
  const [receivedDate, setReceivedDate] = useState(Array(1).fill(""))
  const [getEvents, setGetEvents] = useState([])
  const selecteEvent = [
    { value: "", text: "Select Event " },
    { value: "Pulished to Opposition", text: "Pulished to Opposition " },
    { value: "Office Action", text: "Office Action " },
    { value: "Allow to Refuse", text: "Allow to Refuse " },
    { value: "Check Application Status", text: "Check Application Status" },
    { value: "Client Transfer", text: "Client Transfer" },
    { value: "Declration to Actual Use", text: "Declration to Actual Use" },
  ]
  const currentCase = caseId?._id
  const handleIconClick = () => {
    setDocDate(prevInputs => [...prevInputs, ""])
  }
  const handleEventIconClick = () => {
    setSelectedEvent(prevInputs => [...prevInputs, ""])
  }
  const handleEventTextIconClick = () => {
    setEventText(prevInputs => [...prevInputs, ""])
  }
  const handleReceivedDateIconClick = () => {
    setReceivedDate(prevInputs => [...prevInputs, ""])
  }
  const handleEventTextChange = (index, value) => {
    setEventText(prevInputs => {
      const newEventsTexts = [...prevInputs]
      newEventsTexts[index] = value
      return newEventsTexts
    })
  }
  const handleRecievedDateChange = (index, value) => {
    setReceivedDate(prevInputs => {
      const newRecievedDate = [...prevInputs]
      newRecievedDate[index] = value
      return newRecievedDate
    })
  }
  const handleEventChange = (index, value) => {
    setSelectedEvent(prevInputs => {
      const newEvents = [...prevInputs]
      newEvents[index] = value
      return newEvents
    })
  }
  const handleDateChange = (index, value) => {
    setDocDate(prevInputs => {
      const newInputs = [...prevInputs]
      newInputs[index] = value
      return newInputs
    })
  }
  const handleCreateEvent = async () => {
    if (
      Array.isArray(selectedEvent) &&
      Array.isArray(docDate) &&
      Array.isArray(eventText) &&
      selectedEvent.length > 0 &&
      docDate.length > 0 &&
      eventText.length > 0 &&
      selectedEvent.every(s => Boolean(s)) &&
      docDate.every(date => Boolean(date)) &&
      eventText.every(text => Boolean(text))
    ) {
      try {
        const eventPayload = {
          caseId: currentCase,
          events: selectedEvent.map((event, i) => ({
            docEvent: event,
            eventText: eventText.map((text, j) => ({
              text,
              docDate: docDate[j],
            })),
            receivedDate: receivedDate[i],
          })),
        }
        const res = await createEvent(eventPayload)
        if (res.success) {
          closeModal(true)
        }
      } catch (error) {
        console.error("Error creating event:", error)
      }
    }
  }

  const handleSaveButtonClick = () => {
    if (
      selectedEvent.length === 0 ||
      docDate.length === 0 ||
      eventText.length === 0 ||
      !selectedEvent.every(s => Boolean(s)) ||
      !docDate.every(date => Boolean(date)) ||
      !eventText.every(text => Boolean(text))
    ) {
      window.alert("Please,Create a Event")
    }
  }
  const handleIconsaveClick = () => {
    if (
      selectedEvent.length === 0 ||
      docDate.length === 0 ||
      eventText.length === 0 ||
      !selectedEvent.every(s => Boolean(s)) ||
      !docDate.every(date => Boolean(date)) ||
      !eventText.every(text => Boolean(text))
    ) {
      window.alert("Please,Create a Event")
    } else {
      closeModal(false)
      handleIconClick()
      handleEventIconClick()
      handleEventTextIconClick()
      handleReceivedDateIconClick()
    }
  }
  useEffect(() => {
    handleCreateEvent()
  }, [])

  useEffect(() => {
    const handleEventStatus = async () => {
      const allStatus = await getAllStatus()
      if (allStatus.success) {
        setGetEvents(allStatus.data)
      } else {
        setGetEvents([])
      }
    }
    handleEventStatus()
  }, [])
  return (
    <div>
      <div className="d-flex justify-content-end">
        <i
          className="bx bx-plus-circle pt-4 pointer  text-primary"
          style={{ fontSize: "18px" }}
          // isClose={false}
          onClick={e => {
            e.preventDefault()
            handleCreateEvent()
            handleIconClick()
            handleEventIconClick()
            handleEventTextIconClick()
            handleReceivedDateIconClick()
            // handleIconsaveClick()
          }}
        ></i>
      </div>
      <div className="d-flex">
        <div className="col-md-3">
          <label
            htmlFor="example-text-input"
            className="col-md-3 col-lg-2 col-form-label"
          >
            Event
          </label>
          <div className="col-md-8 d ">
            {selectedEvent.map((event, index) => (
              <select
                key={index}
                className="form-control"
                value={event}
                onChange={e => handleEventChange(index, e.target.value)}
              >
                <option value="">Select Events </option>{" "}
                {/* Add an empty option */}
                {getEvents.map((option, i) => (
                  <option value={option?.value} key={i}>
                    {option?.name}
                  </option>
                ))}
              </select>
            ))}
            {/* <i
            className="bx bx-plus-circle pt-2 pointer"
            onClick={handleEventIconClick}
          ></i> */}
          </div>
        </div>
        <div className="col-md-3">
          <label
            htmlFor="example-text-input"
            className="col-md-3 col-lg-2 col-form-label"
            style={{ minWidth: "100px" }}
          >
            Received Date
          </label>
          <div className="col-md-8">
            {receivedDate.map((rdate, index) => (
              <input
                key={index}
                className="form-control"
                type="date"
                value={rdate} // Extract only the date part from the ISO 8601 string
                onChange={e => handleRecievedDateChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-3">
          <label
            htmlFor="example-text-input"
            className="col-md-3 col-lg-2 col-form-label"
            style={{ minWidth: "100px" }}
          >
            Response Date
          </label>
          <div className="col-md-8">
            {docDate.map((date, index) => (
              <input
                key={index}
                className="form-control "
                type="date"
                value={date.substring(0, 10)} // Extract only the date part from the ISO 8601 string
                onChange={e => handleDateChange(index, e.target.value)}
              />
            ))}
            <i
              className="bx bx-plus-circle pt-2 pointer pr-5 d-flex justify-content-end"
              onClick={() => {
                handleIconClick()
              }}
            ></i>
          </div>
        </div>
        <div className="col-md-3">
          <label
            htmlFor="example-text-input"
            className="col-md-3 col-lg-2 col-form-label"
            style={{ minWidth: "100px" }}
          >
            Response Text
          </label>
          <div className="col-md-8">
            {eventText.map((text, index) => (
              <input
                key={index}
                className="form-control"
                type="text"
                value={text}
                onChange={e => handleEventTextChange(index, e.target.value)}
              />
            ))}
            <i
              className="bx bx-plus-circle pt-2 pointer pr-5 d-flex justify-content-end"
              onClick={() => {
                handleEventTextIconClick()
              }}
            ></i>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end ">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleCreateEvent()
            handleSaveButtonClick()
          }}
        >
          save
        </button>
      </div>
      {/* <div>
        status
      </div> */}
    </div>
  )
}

EventMaster.propTypes = {
  caseId: PropTypes.object,
  closeModal: PropTypes.any,
}

export default EventMaster
