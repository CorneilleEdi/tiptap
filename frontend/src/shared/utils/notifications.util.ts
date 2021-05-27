import { eventBus } from "@/main";

export interface INotificationEventPayload {
    title: string;
    message?: string
    error: boolean;
}
export class NotificationsUtil {
    static NOTIFICATION_EVENT = "notificationEvent";

    static showNotification(payload: INotificationEventPayload) {
        eventBus.$emit(NotificationsUtil.NOTIFICATION_EVENT, payload);
    }

    static show(payload: Partial<INotificationEventPayload>) {
        this.showNotification(
            { title: payload.title || "", message: payload.message, error: false }
        )
    }

    static showError(payload: Partial<INotificationEventPayload>) {
        this.showNotification(
            { title: payload.title || "", message: payload.message, error: true }
        )
    }
}
