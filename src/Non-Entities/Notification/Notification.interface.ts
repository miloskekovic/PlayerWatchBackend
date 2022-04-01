interface NotificationData {
    screen: string
    params?: any
    index?: number
}
export interface Notification {
    title: string
    subtitle?: string
    body: string
    tokens: string[]
    data: NotificationData
    imageUrl?: string
}
