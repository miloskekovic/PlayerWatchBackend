import { Types } from 'mongoose'
import { ArgsType, Field, InputType } from 'type-graphql'

import { ITournament } from '../../Tournament.interface'
import UpdateAgeGroupDto from './types/UpdateAgeGroup'

@ArgsType()
@InputType('UpdateTournamentInput')
export class UpdateTournamentInput implements ITournament {
    @Field()
    _id: string
    @Field({ nullable: true })
    name: string
    @Field({ nullable: true })
    electronic_payments?: boolean
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    sport: string
    @Field({ nullable: true })
    start_date: string
    @Field({ nullable: true })
    end_date: string
    @Field(() => [UpdateAgeGroupDto], { nullable: true })
    age_groups: UpdateAgeGroupDto[]
    @Field({ nullable: true })
    flyer?: string
    @Field({ nullable: true })
    max_teams?: number
    @Field({ nullable: true })
    pay_at_the_plate?: boolean
    @Field({ nullable: true })
    fee_description?: string
    @Field({ nullable: true })
    hotels?: string
    @Field({ nullable: true })
    allowed_assistants?: number
    @Field({ nullable: true })
    registration_closed: boolean
    @Field(() => [String], { nullable: true })
    parks: string[]
    @Field(() => String, { nullable: true })
    owner?: string
}
