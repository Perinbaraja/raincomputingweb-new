import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  createCaseInterval,
  getAllEvent,
  getEventById,
} from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import { Dropdown } from "reactstrap"

const EventMaster = ({ caseId, closeModal }) => {
  const { currentAttorney } = useUser()
  const [docDate, setDocDate] = useState(Array(1).fill(""))
  console.log("docDate", docDate)
  const [selectedEvent, setSelectedEvent] = useState(Array(1).fill(""))
  console.log("selectedEvent", selectedEvent)
  const [eventText, setEventText] = useState(Array(1).fill(""))
  console.log("eventText", eventText)
  const [receivedDate, setReceivedDate] = useState(Array(1).fill(""))
  const [allEventsData, setAllEventsData] = useState([])
  const [responseDates, setResponseDates] = useState([])
  const [responseTextChange, setResponseTextChange] = useState([])
  console.log("responseTextChange", responseTextChange)
  const [eventId, setEventId] = useState()
  const currentCase = caseId?._id
  const [eventsData, setEventsData] = useState([])
  // const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const event = eventsData[0]?.events
  console.log("event:", event)
  const resText = event?.responseText
  const handleRecievedDateChange = (index, value) => {
    setReceivedDate(prevInputs => {
      const newRecievedDate = [...prevInputs]
      newRecievedDate[index] = value
      return newRecievedDate
    })
  }
  const handleEventChange = (index, value, id) => {
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

  const handleDateChange = (k, value) => {
    console.log("value", value)
    const updatedDocDate = [...docDate]
    updatedDocDate[k] = value
    setDocDate(updatedDocDate)
    return updatedDocDate
  }

  const handleAllEvents = async () => {
    const payload = {
      id: currentAttorney?._id,
    }
    const allEventsData = await getAllEvent(payload)
    setAllEventsData(allEventsData?.data)
  }

  const getEvents = async () => {
    const payload = {
      Id: eventId,
    }
    const res = await getEventById(payload)
    if (res.success) {
      setEventsData(res?.event)
    }
  }
  useEffect(() => {
    getEvents()
  }, [eventId])

  useEffect(() => {
    handleAllEvents()
  }, [currentAttorney])
  useEffect(() => {
    const responseTexts = event?.map(event => event.responseText)
    setResponseTextChange(responseTexts)
  }, [event])
  const handleResponseTextChange = (value, index) => {
    const responseTexts = event?.map(event => event.responseText)
    const updatedEvents = [...responseTexts] // Create a copy of the event array
    updatedEvents[index].responseText = value // Update the responseText at the specified index
    setResponseTextChange(updatedEvents) // Update the state with the updated event array
  }
  console.log("responseTextChange", responseTextChange)
  const handleReceivedDateChange = e => {
    setReceivedDate(e.target.value)
  }
  const calculateResponseDates = () => {
    const newResponseDates = event?.map(events => {
      const { interval, scheduledType } = events
      let responseDate = ""

      if (receivedDate) {
        const receivedDateObj = new Date(receivedDate)

        switch (scheduledType) {
          case "days":
            responseDate = new Date(
              receivedDateObj.getTime() + interval * 24 * 60 * 60 * 1000
            )
            break
          case "weeks":
            responseDate = new Date(
              receivedDateObj.getTime() + interval * 7 * 24 * 60 * 60 * 1000
            )
            break
          case "months":
            responseDate = new Date(receivedDateObj)
            responseDate.setMonth(receivedDateObj.getMonth() + interval)
            break
          default:
            break
        }
      }

      return responseDate ? responseDate.toISOString().split("T")[0] : ""
    })

    setResponseDates(newResponseDates)
  }

  useEffect(() => {
    if (event) {
      calculateResponseDates()
    }
  }, [receivedDate])
  // const handleCreateEvent = async () => {
  //   console.log("start");

  //   try {
  //     const intervals = [];
  //     for (let i = 0; i < responseTextChange.length; i++) {
  //       intervals.push({
  //         responseDate: responseDates[i],
  //         responseText: responseTextChange,
  //       });
  //     }

  //     const eventPayload = {
  //       caseId: currentCase,
  //       receivedDate: receivedDate,
  //       events: [
  //         {
  //           eventId: eventId,
  //           intervals: intervals,
  //         },
  //       ],
  //     };

  //     const res = await createCaseInterval(eventPayload);
  //     if (res.success) {
  //       closeModal(true);
  //       setEventId("");
  //       setEventText([]);
  //       setReceivedDate("");
  //     }
  //   } catch (error) {
  //     console.error("Error creating event:", error);
  //   }
  // };

  return (
    <div className="">
      <div className="row">
        <div className="col-md-6">
          {/* Event select */}
          <div className="form-group">
            <label htmlFor="example-text-input" className="col-form-label">
              Event
            </label>
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
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group ">
            <label htmlFor="example-text-input" className="col-form-label">
              Received Date
            </label>
            <input
              id="received-date"
              className="form-control"
              type="date"
              value={receivedDate}
              onChange={handleReceivedDateChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6" style={{ paddingTop: "10px" }}>

          {responseDates.length > 0 &&
            responseDates.map((responseDate, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`response-date-${index}`}>Response Date:</label>
                <input
                  id={`response-date-${index}`}
                  className="form-control"
                  type="date"
                  value={responseDate}
                  readOnly
                />
              </div>
            ))}
        </div>
        <div className="col-md-6">
          {eventId && (
            <label htmlFor="example-text-input" className="col-form-label">
              Response Text
              <sup>TM</sup>
            </label>
          )}
          {event?.map((text, k) => (
            <div key={k} style={{ marginBottom: "10px" }}>
              <div>
                <input
                  className="form-control"
                  type="text"
                  value={text?.responseText}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end pt-2">
        <button
          className="btn btn-primary"
          onClick={handleCreateEvent}
          // disabled={isSaveDisabled}
        >
          save
        </button>
      </div>
    </div>
  )
}

EventMaster.propTypes = {
  caseId: PropTypes.object,
  closeModal: PropTypes.any,
}

export default EventMaster
