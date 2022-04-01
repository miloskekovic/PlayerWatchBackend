import { IEvent } from '../Event.interface'
import { ObjectType, Field } from 'type-graphql'
import { Types } from 'mongoose'

@ObjectType()
export default class EventDto implements IEvent {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    date: string
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    time?: string
    @Field({ nullable: true })
    location?: string
    @Field(() => String, { nullable: true })
    tournamentID?: Types.ObjectId
    // Not queryable, but in the dto for TS
    bracketGameID?: Types.ObjectId
    poolGameID?: Types.ObjectId
}
