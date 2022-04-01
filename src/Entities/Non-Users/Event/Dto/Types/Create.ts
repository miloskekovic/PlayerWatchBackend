import { Field, InputType } from 'type-graphql'
import { Types } from 'mongoose'
import { IEvent } from '../../Event.interface'

@InputType()
export default class CreateEventDto implements IEvent {
    _id: Types.ObjectId
    @Field({ nullable: true })
    date: string
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    time?: string
    @Field({ nullable: true })
    location?: string
    @Field({ nullable: true })
    teamID?: string
    @Field({ nullable: true })
    userID?: string
}
