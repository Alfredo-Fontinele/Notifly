import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { SendNotification } from '../send-notification/send-notification'
import { FindManyNotifications } from './find-many-notifications'

describe('Use Case | Find Many Notifications', () => {
  it('should be able to find many notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)
    const findManyNotifications = new FindManyNotifications(
      notificationsRepository,
    )

    const notifications = [
      makeNotification({ category: 'sport' }),
      makeNotification({ category: 'news' }),
      makeNotification({ category: 'action' }),
    ]

    notifications.forEach(
      async (notification) =>
        await sendNotification.execute({
          category: notification.props.category,
          recipientId: notification.props.recipientId,
          content: notification.props.content.value,
        }),
    )

    const response = await findManyNotifications.execute({
      page: 1,
      pageSize: 2,
    })

    expect(response.data.length).toBe(2)
  })
})
