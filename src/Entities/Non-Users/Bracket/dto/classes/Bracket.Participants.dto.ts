/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class BracketParticipantDto {
    @Field({ nullable: true })
    _id: string

    @Field()
    isPlayer1: boolean

    @Field()
    score: number

    @Field()
    name: string

    @Field({ nullable: true })
    thumbnail: string

    @Field()
    challonge_id: number
}
