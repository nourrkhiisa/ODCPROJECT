const Notification = require("../models/Notification");

async function createNotification(type, userId, message) {
  const notification = {
    type,
    userId,
    message,
  };

  try {
    const createdNotification = await Notification.create(notification);
    return createdNotification;
  } catch (error) {
    console.error(`Error creating notification: ${error}`);
  }
}

async function getUserNotifications(userId) {
  const notifications = await Notification.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
  return notifications;
}

async function markNotificationAsRead(notificationId) {
  try {
    await Notification.update(
      { isRead: true },
      { where: { id: notificationId } }
    );
  } catch (error) {
    console.error(`Error marking notification as read: ${error}`);
  }
}

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
};
