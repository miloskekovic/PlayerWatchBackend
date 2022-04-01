import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('VideoTeamsInput')
export default class VideoTeamsDto {
    @Field()
    score: string

    @Field()
    name: string
}
