import { Notification } from '@application/entities/notification/notification.entity'
import { NotificationsRepository } from '@application/repositories/notifications-repository'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async findMany(): Promise<Notification[]> {
    return this.notifications
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const findNotificationById = this.notifications.find(
      (notification) => notification.id === notificationId,
    )
    if (!findNotificationById) {
      return null
    }
    return findNotificationById
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    )
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.props.recipientId === recipientId,
    ).length
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.props.recipientId === recipientId,
    )
  }
}
