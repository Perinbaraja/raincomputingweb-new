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
  const [selectedEvent, setSelectedEvent] = useState(Array(1).fill(""))
  const [eventText, setEventText] = useState(Array(1).fill(""))
  const [receivedDate, setReceivedDate] = useState(Array(1).fill(""))
  const [allEventsData, setAllEventsData] = useState([])
  const [eventId, setEventId] = useState()
  const currentCase = caseId?._id
  const [responsetexts, setResponseTexts] = useState([])
  const [eventsData, setEventsData] = useState([])
  const event = eventsData[0]
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

  const handleDateChange = (index, value) => {
    const updatedDocDate = [...docDate]
    updatedDocDate[index] = value
    setDocDate(updatedDocDate)
    return updatedDocDate
  }

  const handleCreateEvent = async () => {
    // Check if selectedEvent, docDate, and eventText are arrays and have non-empty values
    if (resText) {
      try {
        const eventPayload = {
          caseId: currentCase,
          eventId: eventId,
          events: selectedEvent.map((event, i) => {
            const [interval, eventName] = event.split(", ")

            return {
              eventId: eventId,
              eventName: eventName,
              intervals: resText.map((text, j) => ({
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
    handleCreateEvent()
  }, [])

  useEffect(() => {
    handleAllEvents()
  }, [currentAttorney])

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
          {/* Received Date */}
          <div className="form-group">
            <label htmlFor="example-text-input" className="col-form-label">
              Received Date
            </label>
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
      </div>

      <div className="row " style={{ paddingTop: "10px" }}>
        <div className="col-md-6">
          {selectedEvent.map((event, index) => {
            const [interval, eventName] = event.split(", ")
            const intervalNumber = interval ? Number(interval) : 1
            const inputs = []

            if (eventName) {
              inputs.push(
                <div key={index}>
                  <label
                    htmlFor="example-text-input"
                    className="col-form-label"
                  >
                    Response Date
                  </label>
                  {Array.from({ length: intervalNumber }).map((_, j) => (
                    <div key={j} style={{ marginBottom: "10px" }}>
                      <input
                        className="form-control"
                        type="date"
                        value={docDate[j] || ""}
                        onChange={e => {
                          handleDateChange(j, e.target.value)
                        }}
                      />
                    </div>
                  ))}
                </div>
              )
            }

            return inputs
          })}
        </div>
        <div className="col-md-6">
          <div>
            {eventId && (
              <label htmlFor="example-text-input" className="col-form-label">
                Response Text
              </label>
            )}

            {event?.responseText.map((text, k) => (
              <div key={k} style={{ marginBottom: "10px" }}>
                <div>
                  <input className="form-control" type="text" value={text} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end pt-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            handleCreateEvent()
          }}
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
