import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { NotificationNotFoundException } from '@helpers/exceptions/NotificationNotFoundException'
import { Injectable } from '@nestjs/common'

interface CancelNotificationRequest {
  notificationId: string
}

type CancelNotificationResponse = void

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(
      notificationId,
    )

    if (!notification) {
      throw new NotificationNotFoundException()
    }

    notification.cancel()

    await this.notificationsRepository.save(notification)
  }
}
