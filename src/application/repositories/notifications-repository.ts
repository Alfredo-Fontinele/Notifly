import { Notification } from '@application/entities/notification/notification.entity'
import { FindManyResponse } from 'src/@types/find-many-response'

export type FindManyNotificationsRequest = {
  page: number
  pageSize: number
}

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract save(notification: Notification): Promise<void>
  abstract countManyByRecipientId(recipientId: string): Promise<number>
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>
  abstract findMany(
    payload: FindManyNotificationsRequest,
  ): Promise<FindManyResponse<Notification[]>>
}
