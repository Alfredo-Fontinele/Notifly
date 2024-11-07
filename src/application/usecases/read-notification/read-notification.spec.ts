import { NotificationNotFoundException } from '@helpers/exceptions/NotificationNotFoundException'
import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { ReadNotification } from './read-notification'

describe('Use Case | Read Notification', () => {
  it('Should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationRepository)

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].props.readAt).toEqual(
      expect.any(Date),
    )
  })

  it('Should not be able to cancel a non existing notification', () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationRepository)

    expect(
      async () =>
        await readNotification.execute({
          notificationId: 'fake-notification-id',
        }),
    ).rejects.toThrow(NotificationNotFoundException)
  })
})
