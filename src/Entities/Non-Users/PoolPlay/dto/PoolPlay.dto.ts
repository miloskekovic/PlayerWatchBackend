/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'

import IPoolPlay from '../PoolPlay.interface'
import GameTeamDto from './classes/types/GameTeamDto'

@ObjectType()
@ArgsType()
@InputType('UpdatePoolPlayInput')
export default class PoolPlayDto implements IPoolPlay {
    @Field()
    _id: string

    @Field(() => [GameTeamDto])
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
    time?: string

    @Field(() => [String], { nullable: true })
    referees?: string[]
}
