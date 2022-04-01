import { Field, InputType } from 'type-graphql'

@InputType()
export class LivestreamScheduleParams {
    @Field()
    startTime: string

    @Field()
    endTime: string

    @Field()
    channelId: string

    @Field()
    schoolId: string

    @Field()
    fieldId: string

    @Field()
    cameraId: string
}
