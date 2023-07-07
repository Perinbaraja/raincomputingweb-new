import { useNotifications } from 'rainComputing/contextProviders/NotificationsProvider';
import React, { useEffect, useState } from 'react';
import notification0 from "../../../assets/sound/1.mp3";
import notification1 from "../../../assets/sound/2.mp3";
import notification2 from "../../../assets/sound/3.mp3";
import notification3 from "../../../assets/sound/4.mp3";
import notification4 from "../../../assets/sound/5.mp3";
import notification5 from "../../../assets/sound/6.mp3";
import notification6 from "../../../assets/sound/7.mp3";
import notification7 from "../../../assets/sound/8.mp3";
import { useUser } from 'rainComputing/contextProviders/UserProvider';

const NotificationSounds = () => {
  const { currentUser } = useUser();
  const { notifications, setNotifications } = useNotifications();
  const notificationSounds = [
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
  ];

  // Define a default notification sound
  const defaultNotificationSound = notification0;
  console.log("defaultNotificationSound:", defaultNotificationSound);

  // Inside your component...
  const [selectedNotificationSound, setSelectedNotificationSound] = useState(defaultNotificationSound);
  console.log("selectedNotificationSound:", selectedNotificationSound);

  useEffect(() => {
    // Check if there are new notifications
    if (currentUser?.isNotifySound) {
      const newNotifications = notifications.filter(
        (notify) => !notify.playedSound
      );

      if (newNotifications.length > 0) {
        // Play the audio notification for each new notification
        newNotifications.forEach((notify) => {
          const audioElement = new Audio(
            notify.sound || selectedNotificationSound
          );
          audioElement.play();

          // Update the notification to mark it as played
          notify.playedSound = true;
        });

        // To trigger re-render and update the notifications array in state
        setNotifications([...notifications]);
      }
    }
  }, [currentUser?.isNotifySound, notifications, selectedNotificationSound]);

  return (
    <select
      value={selectedNotificationSound}
      onChange={(e) => setSelectedNotificationSound(e.target.value)}
    >
      {notificationSounds.map((soundURL) => (
        <option key={soundURL} value={soundURL}>
          {soundURL}
        </option>
      ))}
    </select>
  );
};

export default NotificationSounds;
