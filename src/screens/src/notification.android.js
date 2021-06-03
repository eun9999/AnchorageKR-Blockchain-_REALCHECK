import PushNotification from 'react-native-push-notification';

const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'watchbot',
      channelName: 'com.temp',
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

const showNotification = (id, title, message) => {
  PushNotification.localNotification({
    channelId: id,
    title: title,
    message: message,
  });
};

const handleScheduleNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000),
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {
  createChannel,
  showNotification,
  handleCancel,
  handleScheduleNotification,
};
