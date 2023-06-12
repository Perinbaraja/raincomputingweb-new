import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  createCaseEvent,
  createCaseInterval,
  createEvent,
  getAllEvent,
  getAllStatus,
} from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"

const EventMaster = ({ caseId, closeModal }) => {
  const { currentAttorney } = useUser()
  const [docDate, setDocDate] = useState(Array(1).fill(""))
  const [selectedEvent, setSelectedEvent] = useState(Array(1).fill(""))
  const [eventText, setEventText] = useState(Array(1).fill(""))
  const [receivedDate, setReceivedDate] = useState(Array(1).fill(""))
  const [allEventsData, setAllEventsData] = useState([])
  const [eventId, setEventId] = useState()
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
    // Create a copy of the event text array
    const updatedEventText = [...eventText]

    // Update the event text at the specified index
    updatedEventText[index] = value

    // Set the updated event text
    setEventText(updatedEventText)
  }

  const handleRecievedDateChange = (index, value) => {
    setReceivedDate(prevInputs => {
      const newRecievedDate = [...prevInputs]
      newRecievedDate[index] = value
      return newRecievedDate
    })
  }
  // const handleEventChange = (index, value,id) => {
  //   const updatedSelectedEvent = [...selectedEvent]
  //   updatedSelectedEvent[index] = value
  //   console.log("value",value,id)
  //   setSelectedEvent(updatedSelectedEvent)

  //   // Set the event text based on the selected event
  //   const selectedEventText =
  //     allEventsData.find(event => event.interval === value)?.eventName || ""
  //   setEventText(selectedEventText)

  // }
  const handleEventChange = (index, value, id) => {
    // Update the selectedEvent array with the new value and ID
    const updatedSelectedEvent = [...selectedEvent]
    updatedSelectedEvent[index] = value

    setEventId(id) // Set the ID of the selected option

    setSelectedEvent(updatedSelectedEvent)

    const [interval, eventName] = value.split(", ")
    const selectedEventText =
      allEventsData.find(
        event => event.interval === interval && event.eventName === eventName
      )?.eventText || ""
    setEventText(selectedEventText)
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
          eventId: eventId,
          events: selectedEvent.map((event, i) => {
            const [interval, eventName] = event.split(", ")

            return {
              eventName: eventName,
              intervals: eventText.map((text, j) => ({
                responseText: text,
                responseDate: docDate[j],
              })),
              receivedDate: receivedDate[i],
            }
          }),
        }

        const res = await createCaseInterval(eventPayload)
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
  const handleChange = event => {
    setEventId(event)
  }
  return (
    <div>
      <div className="d-flex justify-content-end">
        {/* <i
          className="bx bx-plus-circle pt-4 pointer  text-primary"
          style={{ fontSize: "18px" }}
          // isClose={false}
          onClick={e => {
            e.preventDefault()
            // handleCreateEvent()
            handleIconClick()
            handleEventIconClick()
            handleEventTextIconClick()
            handleReceivedDateIconClick()
            // handleIconsaveClick()
          }}
        ></i> */}
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
                onChange={e =>
                  handleEventChange(
                    index,
                    e.target.value,
                    e.target.selectedOptions[0].id
                  )
                }
              >
                <option value="">Select Event</option>
                {allEventsData.map((option, i) => (
                  <option
                    value={`${option.interval}, ${option?.eventName}`}
                    key={i}
                    id={option._id} // Assuming each option has an "eventId"
                  >
                    {option.eventName}
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
            {selectedEvent.map((event, index) => {
              const [interval, eventName] = event.split(", ")
              const intervalNumber = interval ? Number(interval) : 1
              const inputs = []

              for (let j = 0; j < intervalNumber; j++) {
                inputs.push(
                  <input
                    key={j}
                    className="form-control"
                    type="date"
                    value={docDate[j]}
                    onChange={e => {
                      handleDateChange(j, e.target.value) // Update the event text value
                    }}
                  />
                )
              }

              return inputs
            })}
            <i
              className="bx bx-plus-circle pt-2 pointer pr-5 d-flex justify-content-end"
              onClick={() => 
                handleIconClick()
              }
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
            {selectedEvent.map((option, i) => {
              const [interval, eventName] = option.split(", ")
              const intervalNumber = option ? Number(interval) : 1
              const inputs = []

              for (let j = 0; j < intervalNumber; j++) {
                inputs.push(
                  <input
                    key={j}
                    className="form-control"
                    type="text"
                    value={eventText[j]||""}
                    onChange={e => {
                      handleEventTextChange(j, e.target.value) // Update the event text value
                    }}
                  />
                )
              }

              return inputs
            })}

            <i
              className="bx bx-plus-circle pt-2 pointer pr-5 d-flex justify-content-end"
              onClick={()=>handleEventTextIconClick()} // Update the onClick event handler
            ></i>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
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
