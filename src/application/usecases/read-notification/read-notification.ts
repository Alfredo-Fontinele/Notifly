import { NotificationsRepository } from '@application/repositories/notifications-repository'

import { Injectable, NotFoundException } from '@nestjs/common'

interface ReadNotificationRequest {
  notificationId: string
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(
      notificationId,
    )

    if (!notification) {
      throw new NotFoundException()
    }

    notification.read()

    await this.notificationsRepository.save(notification)
  }
}
