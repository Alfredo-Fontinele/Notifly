import { CancelNotification } from '@application/usecases/cancel-notification/cancel-notification'
import { CountRecipientNotifications } from '@application/usecases/count-notifications/count-recipient-notifications'
import { FindManyNotifications } from '@application/usecases/find-many-notifications/find-many-notifications'
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications/get-recipient-notifications'
import { ReadNotification } from '@application/usecases/read-notification/read-notification'
import { SendNotification } from '@application/usecases/send-notification/send-notification'
import { UnreadNotification } from '@application/usecases/unread-notification/unread-notification'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'

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
    FindManyNotifications,
  ],
})
export class HttpModule {}
