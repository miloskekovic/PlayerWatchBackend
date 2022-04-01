import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('VideoLikesInput')
export default class VideoLikesDto {
    @Field()
    id: string

    @Field()
    type: string
}
