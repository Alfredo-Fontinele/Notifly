import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

interface CountRecipientNotificationRequest {
  recipientId: string
}

export interface CountRecipientNotificationResponse {
  count: number
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    )

    return {
      count,
    }
  }
}
