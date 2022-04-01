import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class StripeAccountLinkDTO {
    @Field()
    object: string

    @Field()
    created: number

    @Field()
    expires_at: string

    @Field()
    url: string
}
