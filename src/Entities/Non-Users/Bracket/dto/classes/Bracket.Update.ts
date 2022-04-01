import { ArgsType, Field, InputType } from 'type-graphql'

import UpdateBracketScores from './Bracket.Update.scores'

@ArgsType()
@InputType('UpdateBracketGameInput')
export default class UpdateBracketGame {
    @Field()
    _id: string

    @Field()
    tournamentID: string

    @Field()
    ageGroupID: string

    @Field()
    challonge_id: number

    @Field({ nullable: true })
    time: string

    @Field({ nullable: true })
    date: string

    @Field({ nullable: true })
    scores: UpdateBracketScores

    @Field({ nullable: true })
    park?: string

    @Field({ nullable: true })
    field?: string

    @Field(() => [String], { nullable: true })
    referees?: string[]
}
