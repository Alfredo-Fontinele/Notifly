import { NotificationsRepository } from '@application/repositories/notifications-repository'

import { Injectable, NotFoundException } from '@nestjs/common'

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
      throw new NotFoundException()
    }

    notification.cancel()

    await this.notificationsRepository.save(notification)
  }
}
