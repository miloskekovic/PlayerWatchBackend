/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ObjectType } from 'type-graphql'
import UpdateBracketScores from './classes/Bracket.Update.scores'

@ObjectType()
export default class BracketWithChallongeGameDto {
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
