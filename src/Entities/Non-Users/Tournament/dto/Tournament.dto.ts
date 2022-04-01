import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../../../Users/dto/User.dto'
import ParkDto from '../../Park/dto/Park.dto'
import { ITournament } from '../Tournament.interface'
import AgeGroupDto from './classes/types/AgeGroupDto'

@ObjectType()
export default class TournamentDto implements ITournament {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field(() => Boolean)
    electronic_payments: boolean
    @Field({ nullable: true })
    description?: string
    @Field()
    start_date: string
    @Field()
    sport: string
    @Field()
    end_date: string
    @Field({ nullable: true })
    fee_description?: string
    @Field(() => [AgeGroupDto])
    age_groups: AgeGroupDto[]
    @Field({ nullable: true })
    flyer?: string
    @Field(() => Boolean)
    pay_at_the_plate: boolean
    @Field({ nullable: true })
    hotels?: string
    @Field(() => Number, { nullable: true })
    allowed_assistants?: number
    @Field({ nullable: true })
    registration_closed: boolean
    @Field(() => [String])
    parks: Types.ObjectId[]
    @Field(() => [ParkDto])
    full_parks: ParkDto[]
    @Field(() => String, { nullable: true })
    owner: Types.ObjectId
    @Field(() => UserDto, { nullable: true })
    full_owner?: UserDto
    @Field(() => [String], { nullable: true })
    referees?: string[]
    @Field(() => [String], { nullable: true })
    assistants?: Types.ObjectId[]
    @Field(() => [UserDto], { nullable: true })
    full_assistants?: UserDto[]
}
