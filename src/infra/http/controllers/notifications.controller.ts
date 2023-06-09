import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications/get-recipient-notifications'
import { CountRecipientNotifications } from '@application/usecases/count-notifications/count-recipient-notifications'
import { CancelNotification } from './../../../application/usecases/cancel-notification/cancel-notification'
import { UnreadNotification } from '@application/usecases/unread-notification/unread-notification'
import { ReadNotification } from '@application/usecases/read-notification/read-notification'
import { SendNotification } from '@application/usecases/send-notification/send-notification'
import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common'
import { CreateNotificationDTO } from '../dtos/create-notification.dto'
import { NotificationMapper } from '../mappers/notification-mapper'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientsNotification: CountRecipientNotifications,
    private getRecipientsNotification: GetRecipientNotifications,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { recipientId, category, content } = body
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    })
    return {
      notification: NotificationMapper.toHTTP(notification),
    }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientsNotification.execute({
      recipientId,
    })
    return {
      count,
    }
  }

  @Get('get/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientsNotification.execute({
      recipientId,
    })
    return {
      notifications: notifications.map(NotificationMapper.toHTTP),
    }
  }
}
