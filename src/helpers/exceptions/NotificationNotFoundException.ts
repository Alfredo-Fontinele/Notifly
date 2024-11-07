export class NotificationNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Exception | Notification Not Found')
  }
}
