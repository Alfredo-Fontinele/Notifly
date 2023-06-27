import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notification-factory'
import { NotificationNotFound } from '../errors/notification-not-found'
import { CancelNotification } from './cancel-notification'

describe('Use Case | Cancel Notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationRepository)

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    )
  })

  it('Should not be able to cancel a non existing notification', () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationRepository)

    expect(
      async () =>
        await cancelNotification.execute({
          notificationId: 'fake-notification-id',
        }),
    ).rejects.toThrow(NotificationNotFound)
  })
})
