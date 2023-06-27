import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications/get-recipient-notifications'
import { CountRecipientNotifications } from '@application/usecases/count-notifications/count-recipient-notifications'
import { CancelNotification } from '@application/usecases/cancel-notification/cancel-notification'
import { UnreadNotification } from '@application/usecases/unread-notification/unread-notification'
import { ReadNotification } from '@application/usecases/read-notification/read-notification'
import { SendNotification } from '@application/usecases/send-notification/send-notification'
import { NotificationsController } from './controllers/notifications.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    UnreadNotification,
    ReadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
