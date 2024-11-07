import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindManyNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute() {
    return await this.notificationsRepository.findMany()
  }
}
