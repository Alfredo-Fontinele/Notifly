import { Entity } from '@domain/core/Entity'
import { Content } from '../content/content.entity'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  canceledAt?: Date | null
  createdAt?: Date
}

export class Notification extends Entity<NotificationProps> {
  constructor(props: NotificationProps, id?: string) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  cancel() {
    this.props.canceledAt = new Date()
  }

  read() {
    this.props.readAt = new Date()
  }

  unread() {
    this.props.readAt = null
  }
}
