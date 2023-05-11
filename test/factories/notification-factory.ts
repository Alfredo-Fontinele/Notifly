import {
  Notification,
  NotificationProps,
} from '@application/entities/notification/notification.entity';
import { Content } from '@application/entities/content/content.entity';

type PartialNotificationType = Partial<NotificationProps>;

export const makeNotification = (
  notificationProps: PartialNotificationType = {},
) => {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade'),
    recipientId: 'fake-recipient-id',
    ...notificationProps,
  });
};
