import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class SmallChatDto {
    @Field()
    id: string

    @Field(() => String)
    team_id: Types.ObjectId

    @Field()
    muted: boolean
}
