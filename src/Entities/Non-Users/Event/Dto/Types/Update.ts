import { Field, InputType } from 'type-graphql'
import { Types } from 'mongoose'
import { IEvent } from '../../Event.interface'

@InputType()
export default class UpdateEventDto implements IEvent {
    @Field(() => String)
    _id: Types.ObjectId
    @Field({ nullable: true })
    date: string
    @Field({ nullable: true })
    name: string
    @Field({ nullable: true })
    time: string
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    location?: string
}
