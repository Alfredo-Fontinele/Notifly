import { Content } from '@application/entities/content/content.entity'
import { Notification } from '@application/entities/notification/notification.entity'
import { Notification as NotificationModel } from '@prisma/client'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.props.category,
      content: notification.props.content.value,
      recipientId: notification.props.recipientId,
      readAt: notification.props.readAt,
      createdAt: notification.props.createdAt,
    }
  }

  static toDomain(raw: NotificationModel): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      raw.id,
    )
  }
}
