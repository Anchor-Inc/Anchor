import firebase from 'react-native-firebase';
import { colors } from '../config';

export const backgroundMessageListener = async (message) => {
  console.log(message);

  // build the notification
  const { data } = message;
  const notification = new firebase.notifications.Notification()
  .setTitle(data.title)
  .setBody(data.body)
  .setSound('default')
  .setData({ senderID: data.senderId, title: data.title, screen: data.screen })
  .android.setSmallIcon('notification')
  .android.setColor(colors.primary.normal)
  .android.setAutoCancel(true)
  .android.setLargeIcon(data.icon)
  .android.setChannelId(data.channel)
  .android.setPriority(firebase.notifications.Android.Priority.Max);

  if (notification.android.channelId === 'chat_channel') {
    // build an action
    const action = new firebase.notifications.Android.Action('reply', 'check-mark', `Reply to ${notification.title}`);
    action.setShowUserInterface(false);

    // build a remote input
    const remoteInput = new firebase.notifications.Android.RemoteInput('input')
    .setLabel('Reply');

    // add the remote input to the action
    action.addRemoteInput(remoteInput);

    // add the action to the notification
    notification.android.addAction(action);
  }

  // display the notification
  firebase.notifications().displayNotification(notification);

  return Promise.resolve();
};

export const backgroundActionHandler = async (notificationOpen) => {
  if (notificationOpen.action === 'reply') {
    console.log(notificationOpen);
  }
  return Promise.resolve();
};
