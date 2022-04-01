import { Field, ObjectType } from 'type-graphql'

import VideoDto from '../../../Non-Users/Video/dto/Video.dto'

@ObjectType()
export class GetVideosDto {
    @Field(() => [VideoDto])
    accepted: VideoDto[]

    @Field(() => [VideoDto])
    pending: VideoDto[]
}
