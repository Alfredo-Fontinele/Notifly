import { NotificationNotFoundException } from '@helpers/exceptions/NotificationNotFoundException'
import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { UnreadNotification } from './unread-notification'

describe('Use Case | Unread Notification', () => {
  it('Should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationRepository)

    const notification = makeNotification({
      readAt: new Date(),
    })

    await notificationRepository.create(notification)

    await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationRepository.notifications[0].props.readAt).toBeNull()
  })

  it('Should not be able to cancel a non existing notification', () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationRepository)

    expect(
      async () =>
        await unreadNotification.execute({
          notificationId: 'fake-notification-id',
        }),
    ).rejects.toThrow(NotificationNotFoundException)
  })
})
