import FBAdmin from '../Firebase/FirebaseAdmin'
import { Notification } from './Notification.interface'

export default async function SendNotification(input: Notification): Promise<boolean> {
    const { body, title, subtitle, tokens, data, imageUrl } = input
    if (tokens.length == 0) return true
    if (data?.params) {
        data.params = JSON.stringify(data.params)
    }
    let apns = {}
    if (subtitle) {
        apns = {
            payload: {
                aps: { alert: { subtitle } },
            },
        }
    }
    const { responses } = await FBAdmin.messaging().sendMulticast({
        tokens: [...new Set(tokens)],
        notification: { title, body, imageUrl },
        apns,
        data,
        contentAvailable: true,
        priority: 'high',
    })

    responses.forEach(({ error }) => {
        if (error) console.log({ error })
    })

    return true
}
