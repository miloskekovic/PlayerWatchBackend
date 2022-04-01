import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../../../../Users/dto/User.dto'
import ParkDto from '../../../Park/dto/Park.dto'
import AgeGroupDto from '../../../Tournament/dto/classes/types/AgeGroupDto'
import { ITournament } from '../../../Tournament/Tournament.interface'

@ObjectType()
export class FullTeamTournamentDto implements ITournament {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field()
    sport: string
    @Field()
    start_date: string
    @Field()
    end_date: string
    @Field(() => [AgeGroupDto])
    age_groups: AgeGroupDto[]
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
    @Field()
    registration_closed: boolean
    @Field(() => [String])
    parks: Types.ObjectId[]
    @Field(() => [ParkDto], { nullable: true })
    full_parks?: ParkDto[]
    @Field(() => String, { nullable: true })
    owner?: Types.ObjectId
    @Field(() => UserDto, { nullable: true })
    full_owner?: UserDto
    @Field(() => [String], { nullable: true })
    assistants?: string[]
    @Field(() => [UserDto], { nullable: true })
    full_assistants?: UserDto[]
    @Field({ nullable: true })
    new_team_name?: string
}
