import { Notification } from '@application/entities/notification/notification.entity'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

interface GetRecipientNotificationsRequest {
  recipientId: string
}

export interface GetRecipientNotificationsResponse {
  notifications: Notification[]
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId)

    return {
      notifications,
    }
  }
}
