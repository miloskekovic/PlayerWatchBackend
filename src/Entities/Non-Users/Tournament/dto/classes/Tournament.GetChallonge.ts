import { Field, ObjectType } from 'type-graphql'

import ChallongeGameDto from './types/Game.Challonge'

@ObjectType()
export default class ChallongeTournamentDto {
    @Field()
    url: string

    @Field(() => [ChallongeGameDto])
    currentGames: ChallongeGameDto[]

    @Field(() => [ChallongeGameDto])
    pastGames: ChallongeGameDto[]

    @Field()
    totalGames: number
}
