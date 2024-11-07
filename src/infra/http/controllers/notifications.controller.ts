import { Notification } from '@application/entities/notification/notification.entity'
import { CancelNotification } from '@application/usecases/cancel-notification/cancel-notification'
import { CountRecipientNotifications } from '@application/usecases/count-notifications/count-recipient-notifications'
import { FindManyNotifications } from '@application/usecases/find-many-notifications/find-many-notifications'
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications/get-recipient-notifications'
import { ReadNotification } from '@application/usecases/read-notification/read-notification'
import { SendNotification } from '@application/usecases/send-notification/send-notification'
import { UnreadNotification } from '@application/usecases/unread-notification/unread-notification'
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import { FindManyResponse } from 'src/@types/find-many-response'
import { TYMES } from 'src/constants/times'
import { CreateNotificationDTO } from '../dtos/create-notification.dto'
import { NotificationMapper } from '../mappers/notification-mapper'

@Controller('notifications')
@UseInterceptors(CacheInterceptor)
export class NotificationsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientsNotification: CountRecipientNotifications,
    private getRecipientsNotification: GetRecipientNotifications,
    private findManyNotifications: FindManyNotifications,
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

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    if (!Number(page) || !Number(pageSize))
      return {
        currentPage: 0,
        nextUrl: null,
        prevUrl: null,
        data: [],
      }

    const payloadCached = await this.cacheManager.get<{
      page: string
      pageSize: string
    }>('payload-notifications')

    if (payloadCached) {
      const notificationsCached = await this.cacheManager.get<
        FindManyResponse<Notification[]>
      >('notifications')

      const isSamePageAndPageSize =
        Number(payloadCached.page) === page &&
        Number(payloadCached.pageSize) === pageSize

      if (notificationsCached && isSamePageAndPageSize) {
        return notificationsCached
      }
    }

    const response = await this.findManyNotifications.execute({
      page: Number(page),
      pageSize: Number(pageSize),
    })

    await this.cacheManager.set(
      'payload-notifications',
      {
        page: Number(page),
        pageSize: Number(pageSize),
      },
      TYMES._10min,
    )
    await this.cacheManager.set('notifications', response, TYMES._10min)

    return {
      currentPage: response.currentPage,
      nextUrl: response.nextUrl,
      prevUrl: response.prevUrl,
      data: response.data.map(NotificationMapper.toHTTP),
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
