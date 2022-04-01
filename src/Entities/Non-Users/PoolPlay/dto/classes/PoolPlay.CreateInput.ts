import { ArgsType, Field, InputType } from 'type-graphql'

import GameTeamDto from './types/GameTeamDto'

@ArgsType()
@InputType('CreatePoolPlayInput')
export class CreatePoolPlayInput {
    @Field()
    tournamentID: string

    @Field()
    ageGroupID: string

    @Field(() => [GameTeamDto], { nullable: true })
    teams: GameTeamDto[]

    @Field()
    pool: string

    @Field()
    date: string

    @Field({ nullable: true })
    park?: string

    @Field({ nullable: true })
    field?: string

    @Field({ nullable: true })
    time: string

    @Field(() => [String], { nullable: true })
    referees?: string[]
}
