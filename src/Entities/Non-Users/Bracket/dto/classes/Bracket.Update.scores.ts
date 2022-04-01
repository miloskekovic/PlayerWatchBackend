import { ObjectType } from 'type-graphql'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArgsType, Field, InputType } from 'type-graphql'

@ArgsType()
@InputType('UpdateBracketScoresInput')
@ObjectType()
export default class UpdateBracketScores {
    @Field()
    player1_score: number

    @Field()
    player2_score: number

    @Field({ nullable: true })
    winner_id: number
}
