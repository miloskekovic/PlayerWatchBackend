import { Document, model, Schema, Types } from 'mongoose'
import { IAndroidSubscription } from '../../../Non-Entities/AndroidSubscriptions/AndroidSubscription.interface'
import { iOSSubscriptionInterface } from '../../../Non-Entities/iOSSubscriptions/iOSSubscription.interface'
const subscriptionSchema = new Schema({
    subscription: {},
    ios: Boolean,
    android: Boolean,
})
const SubscriptionSchema = model<Document & (iOSSubscriptionInterface | IAndroidSubscription)>(
    'Subscription',
    subscriptionSchema
)
export default SubscriptionSchema
