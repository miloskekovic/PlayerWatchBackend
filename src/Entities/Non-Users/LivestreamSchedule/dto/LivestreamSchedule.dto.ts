import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export default class LiveStreamScheduleDTO {
    @Field(() => String)
    _id: string

    @Field(() => String)
    channelId: string

    @Field(() => String)
    startTime: string

    @Field(() => String)
    endTime: string

    @Field(() => String)
    startRuleName: string

    @Field(() => String)
    endRuleName: string
}
