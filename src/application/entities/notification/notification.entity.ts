import { StrictNullCheck } from '@helpers/strict-null-check'
import { Content } from '../content/content.entity'
import { Replace } from '@helpers/replace'
import { randomUUID } from 'node:crypto'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  canceledAt?: Date | null
  createdAt: Date
}

export class Notification {
  private _id: string
  private props: NotificationProps

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  get id() {
    return this._id
  }

  set content(content: Content) {
    this.props.content = content
  }

  get content(): Content {
    return this.props.content
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  get recipientId(): string {
    return this.props.recipientId
  }

  set category(category: string) {
    this.props.category = category
  }

  get category(): string {
    return this.props.category
  }

  get readAt(): StrictNullCheck<Date> {
    return this.props.readAt
  }

  get canceledAt(): StrictNullCheck<Date> {
    return this.props.canceledAt
  }

  get createdAt(): Date {
    return this.props.createdAt
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
