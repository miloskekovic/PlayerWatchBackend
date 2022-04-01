import { ObjectType, Field } from 'type-graphql'
import { Types } from 'mongoose'

@ObjectType()
export class FanDto {
    @Field(() => String)
    id: Types.ObjectId

    @Field()
    accepted: boolean

    @Field({ nullable: true })
    type?: string
}
