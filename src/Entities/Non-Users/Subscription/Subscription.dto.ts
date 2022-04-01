import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class iOSSubscriptionDto {
    @Field()
    _id: string

    @Field()
    product_id: string

    @Field()
    expires: string

    @Field()
    auto_renewing: boolean

    @Field()
    in_grace_period: boolean

    @Field()
    in_trial_period: boolean

    @Field()
    expired: boolean

    @Field()
    revoked: boolean

    @Field()
    purchased_at: string
}

@ObjectType()
export class AndroidSubscriptionDto {
    @Field()
    product_id: string

    @Field()
    expires: string

    @Field()
    auto_renewing: boolean

    @Field()
    on_hold: boolean

    @Field()
    in_grace_period: boolean

    @Field()
    paused: boolean

    @Field()
    expired: boolean

    @Field()
    revoked: boolean

    @Field()
    purchased_at: string
}

@ObjectType()
export class AnySubscriptionDto {
    @Field(() => [AndroidSubscriptionDto])
    android: AndroidSubscriptionDto[]

    @Field(() => [iOSSubscriptionDto])
    ios: iOSSubscriptionDto[]
}

@ObjectType()
export default class GetPurchasesDto {
    @Field()
    subscriptions: AnySubscriptionDto
}
