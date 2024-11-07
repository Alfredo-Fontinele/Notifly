import { Notification } from '@application/entities/notification/notification.entity'
import {
  FindManyNotificationsRequest,
  NotificationsRepository,
} from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'
import { FindManyResponse } from 'src/@types/find-many-response'
@Injectable()
export class FindManyNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: FindManyNotificationsRequest,
  ): Promise<FindManyResponse<Notification[]>> {
    const { currentPage, data, nextUrl, prevUrl } =
      await this.notificationsRepository.findMany(request)

    return {
      currentPage,
      data,
      nextUrl,
      prevUrl,
    }
  }
}
