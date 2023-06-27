import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { SendNotification } from './send-notification'

describe('Use Case | Send Notification', () => {
  it('Should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationRepository)
    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'this is a notification',
      recipientId: 'example-recipient-id',
    })
    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications[0]).toEqual(notification)
  })
})
