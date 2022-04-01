import { Types } from 'mongoose'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class ChatUser {
    @Field(() => String)
    id: Types.ObjectId

    @Field({ defaultValue: false })
    admin: boolean

    @Field({ defaultValue: false })
    muted: boolean

    @Field({ nullable: true })
    muted_type?: string
}
