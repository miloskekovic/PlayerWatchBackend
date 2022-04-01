import { Field, ObjectType } from 'type-graphql'
import { UserDto } from '../../../../../Users/dto/User.dto'

import BracketParticipantDto from '../../../../Bracket/dto/classes/Bracket.Participants.dto'

@ObjectType()
export default class ChallongeGameDto {
    @Field()
    _id: string

    @Field()
    round: number

    @Field()
    challonge_id: number

    @Field({ nullable: true })
    time?: string

    @Field({ nullable: true })
    date?: string

    @Field({ nullable: true })
    winner?: number

    @Field({ nullable: true })
    park?: string

    @Field({ nullable: true })
    field?: string

    @Field(() => [BracketParticipantDto])
    teams: BracketParticipantDto[]

    @Field(() => [UserDto])
    full_referees: UserDto[]
}
