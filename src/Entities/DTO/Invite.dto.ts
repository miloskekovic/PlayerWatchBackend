import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class InviteDto {
    @Field(() => String)
    id: Types.ObjectId

    @Field()
    accepted: boolean
}
