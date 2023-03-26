import { v4 as uuidv4 } from "uuid";

const notificationService = {
  createNotification: (type, message) => {
    return {
      id: uuidv4(),
      type,
      message,
    };
  },

  addNotification: (notifications, notification) => {
    return [...notifications, notification];
  },

  removeNotification: (notifications, notificationId) => {
    return notifications.filter(
      (notification) => notification.id !== notificationId
    );
  },
};

export default notificationService;
