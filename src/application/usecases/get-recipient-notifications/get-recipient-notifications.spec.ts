import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { GetRecipientNotifications } from './get-recipient-notifications'

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
        expect.objectContaining({
          props: { ...notifications[0].props, recipientId: 'recipient-1' },
        }),
        expect.objectContaining({
          props: { ...notifications[1].props, recipientId: 'recipient-1' },
        }),
      ]),
    )
  })
})
