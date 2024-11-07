import { Notification } from '@application/entities/notification/notification.entity'

export class NotificationMapper {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.props.content.value,
      category: notification.props.category,
      recipientId: notification.props.recipientId,
    }
  }
}
