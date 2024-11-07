import { Notification } from '@application/entities/notification/notification.entity'
import {
  FindManyNotificationsRequest,
  NotificationsRepository,
} from '@application/repositories/notifications-repository'
import { variables } from '@config/env/env-validation'
import { Injectable } from '@nestjs/common'
import { FindManyResponse } from 'src/@types/find-many-response'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prismaService.notification.create({
      data: raw,
    })
  }

  async findMany(
    payload: FindManyNotificationsRequest,
  ): Promise<FindManyResponse<Notification[]>> {
    const { page, pageSize } = payload
    const totalItems = await this.prismaService.notification.count()
    const totalPages = Math.ceil(totalItems / pageSize)

    const response = await this.prismaService.notification.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    const nextUrl =
      page < totalPages
        ? `${variables.APPLICATION_URL}?page=${page + 1}&pageSize=${pageSize}`
        : null

    const prevUrl =
      page > 1
        ? `${variables.APPLICATION_URL}?page=${page - 1}&pageSize=${pageSize}`
        : null

    return {
      currentPage: page,
      nextUrl,
      prevUrl,
      data: response.map(PrismaNotificationMapper.toDomain),
    }
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findFirst({
      where: {
        id: notificationId,
      },
    })
    if (!notification) {
      throw new Error('notfication not found')
    }
    return PrismaNotificationMapper.toDomain(notification)
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    })
    return notifications.map(PrismaNotificationMapper.toDomain)
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prismaService.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    })
  }
}
