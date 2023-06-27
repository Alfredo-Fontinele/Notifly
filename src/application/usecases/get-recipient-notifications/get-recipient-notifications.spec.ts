import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { GetRecipientNotifications } from './get-recipient-notifications'
import { makeNotification } from '@test/factories/notification-factory'

describe('Use Case | Get Recipient Notifications', () => {
  it('Should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const getRecipientNotification = new GetRecipientNotifications(
      notificationRepository,
    )

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    )

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    )

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    )
  })
})
