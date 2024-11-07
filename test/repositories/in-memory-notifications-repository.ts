import { Notification } from '@application/entities/notification/notification.entity'
import {
  FindManyNotificationsRequest,
  NotificationsRepository,
} from '@application/repositories/notifications-repository'
import { variables } from '@config/env/env-validation'
import { FindManyResponse } from 'src/@types/find-many-response'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async findMany(
    payload: FindManyNotificationsRequest,
  ): Promise<FindManyResponse<Notification[]>> {
    const { page, pageSize } = payload

    const paginatedItems = this.notifications.slice(
      (page - 1) * pageSize,
      page * pageSize,
    )

    const totalPages = Math.ceil(this.notifications.length / pageSize)

    const nextUrl =
      page < totalPages
        ? `${variables.APPLICATION_URL}?page=${page + 1}&pageSize=${pageSize}`
        : null

    const prevUrl =
      page > 1
        ? `${variables.APPLICATION_URL}?page=${page - 1}&pageSize=${pageSize}`
        : null

    return {
      currentPage: page,
      nextUrl,
      prevUrl,
      data: paginatedItems,
    }
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
