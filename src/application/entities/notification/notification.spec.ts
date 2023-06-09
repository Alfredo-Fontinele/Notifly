import { Notification } from './notification.entity'
import { Content } from '../content/content.entity'
import { randomUUID } from 'node:crypto'

describe('Entity Case | Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: randomUUID(),
    })
    expect(notification).toBeTruthy()
  })
})
