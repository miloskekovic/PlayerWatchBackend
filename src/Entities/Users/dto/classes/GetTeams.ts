import { Field, ObjectType } from 'type-graphql'

import TeamDto from '../../../Non-Users/Team/dto/Team.dto'

@ObjectType()
export class GetTeamsDto {
    @Field(() => [TeamDto])
    accepted: TeamDto[]

    @Field(() => [TeamDto])
    pending: TeamDto[]
}
