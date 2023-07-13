import { useNotifications } from "rainComputing/contextProviders/NotificationsProvider"
import React, { useEffect, useState } from "react"
import notification0 from "../../../assets/sound/1.mp3"
import notification1 from "../../../assets/sound/2.mp3"
import notification2 from "../../../assets/sound/3.mp3"
import notification3 from "../../../assets/sound/4.mp3"
import notification4 from "../../../assets/sound/5.mp3"
import notification5 from "../../../assets/sound/6.mp3"
import notification6 from "../../../assets/sound/7.mp3"
import notification7 from "../../../assets/sound/8.mp3"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import {
  notificationSound,
  notifySound,
} from "rainComputing/helpers/backend_helper"
import PropTypes from "prop-types"

const NotificationSettings = ({ setModalOpen }) => {
  const { currentUser, setCurrentUser } = useUser()
  const { notifications, setNotifications } = useNotifications()
  const [isNotifySound, setIsNotifySound] = useState(false)
  const selectSounds = [
    "Select",
    notification0,
    notification1,
    notification2,
    notification3,
    notification4,
    notification5,
    notification6,
    notification7,
    // Add more sound URLs as needed
  ]
  const defaultNotificationSound = notification5
  const [selectedNotificationSound, setSelectedNotificationSound] = useState(
    currentUser?.notificationSound || defaultNotificationSound
  );


  const handleSetNotifySound = async selectedSound => {
    const payload = {
      _id: currentUser?.userID,
      notificationSound: selectedSound,
    }

    const res = await notificationSound(payload)
    if (res.success) {
      localStorage.setItem("authUser", JSON.stringify(res))
      setCurrentUser(res)
    } else {
      console.log("audio is undefined")
    }
  }

  useEffect(() => {
    const handleInitialSetNotifySound = async () => {
      if (selectedNotificationSound) {
        await handleSetNotifySound(selectedNotificationSound)
      }
    }

    handleInitialSetNotifySound()
  }, [])

  const handleCheckboxChange = async event => {
    const isChecked = event.target.checked
    setIsNotifySound(isChecked)
    try {
      const response = await notifySound({
        _id: currentUser?.userID,
        isNotifySound: isChecked,
      })
      localStorage.setItem("authUser", JSON.stringify(response))
      setCurrentUser(response)
    } catch (error) {
      console.error("API error:", error)
    }
  }
  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <div>
      <p className="px-2">Enable/Disable </p>
      <div className="form-switch" style={{ paddingLeft: "55px" }}>
        <input
          className="form-check-input"
          type="checkbox"
          checked={currentUser?.isNotifySound}
          onClick={handleCheckboxChange}
        />
        <label className="px-2">Notification Sound</label>
      </div>
      <div className="px-2">
        <p>Select the Sound</p>
        <div className="px-3">
        <select
          title="Select Notification sound"
          value={selectedNotificationSound}
          onChange={e => {
            setSelectedNotificationSound(e.target.value)
            handleSetNotifySound(e.target.value)
          }}
        >
          {selectSounds.map(soundURL => (
            <option key={soundURL} value={soundURL}>
              {soundURL}
            </option>
          ))}
        </select>
        </div>
      </div>
      <div className="px-2  d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={handleClose}>
          close
        </button>
      </div>
    </div>
  )
}
NotificationSettings.propTypes = {
  setModalOpen: PropTypes.func,
}
export default NotificationSettings
