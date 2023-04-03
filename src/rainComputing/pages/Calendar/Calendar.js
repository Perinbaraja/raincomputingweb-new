import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import "@fullcalendar/bootstrap/main.css"
import { useToggle } from "rainComputing/helpers/hooks/useToggle"
import DynamicModel from "rainComputing/components/modals/DynamicModal"
import ChatRemainder from "rainComputing/components/chat/ChatRemainder"
import DynamicSuspense from "rainComputing/components/loader/DynamicSuspense"
import PropTypes from "prop-types"
import { getAllReminders } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import EditReminder from "./EditReminder"

const Calender = ({ setcalendarModalOpen }) => {
  const [selectedday, setSelectedDay] = useState(0)
  const [getReminders, setGetReminders] = useState([])
  const [selectedEvent, setSelectedEvent] = useState([])
  const { currentUser } = useUser()

  const {
    toggleOpen: remainderModelOpen,
    setToggleOpen: setRemainderModelOpen,
    toggleIt: toggleremainderModelOpen,
  } = useToggle(false)
  const {
    toggleOpen: editremainderModelOpen,
    setToggleOpen: setEditRemainderModelOpen,
    toggleIt: toggleeditremainderModelOpen,
  } = useToggle(false)
  const handleDateClick = arg => {
    const date = arg["date"]
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const currectDate = new Date()
    const currentHour = currectDate.getHours()
    const currentMin = currectDate.getMinutes()
    const currentSec = currectDate.getSeconds()
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    )
    const modifiedData = { ...arg, date: modifiedDate }

    setSelectedDay(modifiedData)
    toggleremainderModelOpen()
  }
  const handleCalendarCancel = () => {
    setcalendarModalOpen(false)
  }

  const getAllReminderById = async () => {
    const res = await getAllReminders({
      currentUserID: currentUser?.userID,
    })
    if (res.success) {
      setGetReminders(res?.reminders)
    }
  }

  useEffect(() => {
    if (currentUser) {
      getAllReminderById()
    }
  }, [currentUser])

  const calendarEvents = getReminders.map(reminder => {
    const startTime = new Date(reminder.scheduledTime)
    startTime.setHours(startTime.getHours() - 5)
    startTime.setMinutes(startTime.getMinutes() - 30)
    return {
      id: reminder._id,
      title: reminder.title,
      start: startTime,
      allDay: false,
    }
  })

  const handleEventClick = e => {
    const event = e.event
    const reminder = getReminders.find(r => r?._id === event?.id)
    setSelectedEvent(reminder)
    setEditRemainderModelOpen(true)
  }

  return (
    <React.Fragment>
      <button
        type="button"
        className="close py-3"
        data-dismiss="modal"
        aria-label="Close"
        style={{ width: "25px" }}
        onClick={() => handleCalendarCancel()}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <DynamicModel
        open={remainderModelOpen}
        toggle={toggleremainderModelOpen}
        size="md"
        modalTitle="NEW REMINDER"
        footer={false}
      >
        <DynamicSuspense>
          <ChatRemainder
            setModalOpen={setRemainderModelOpen}
            selectdate={selectedday?.dateStr}
            getAllReminderById={getAllReminderById}
          />
        </DynamicSuspense>
      </DynamicModel>
      <DynamicModel
        open={editremainderModelOpen}
        toggle={toggleeditremainderModelOpen}
        size="md"
        modalTitle="EDIT REMINDER"
        footer={false}
      >
        <DynamicSuspense>
          <EditReminder
            setEditModalOpen={setEditRemainderModelOpen}
            reminder={selectedEvent}
            setGetReminders={setGetReminders}
            getReminders={getReminders}
          />
        </DynamicSuspense>
      </DynamicModel>
      <Container fluid={true}>
        {/* Render Breadcrumb */}

        <Row>
          <Col className="col-12 pt-4">
            <Card>
              <CardBody>
                <Row>
                  {/* fullcalendar control */}
                  <FullCalendar
                    plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                    slotDuration={"00:15:00"}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek,dayGridDay",
                    }}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    events={calendarEvents}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}
Calender.propTypes = {
  setcalendarModalOpen: PropTypes.func,
}
export default Calender
