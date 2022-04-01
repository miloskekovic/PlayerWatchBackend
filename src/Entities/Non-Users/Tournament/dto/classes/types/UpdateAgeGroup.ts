import { Field, InputType } from 'type-graphql'
import { Types } from 'mongoose'

import { UpdateGuestTeamInputDto } from '../../../../Team/dto/Team.guest.dto'

@InputType()
export default class UpdateAgeGroupDto {
    @Field(() => String, { nullable: true })
    _id: Types.ObjectId

    @Field(() => [String], { nullable: true })
    team_ids: string[]

    @Field(() => [UpdateGuestTeamInputDto], { nullable: true })
    guest_teams: UpdateGuestTeamInputDto[]

    @Field({ nullable: true })
    has_pools: boolean

    @Field({ nullable: true })
    has_brackets: boolean

    @Field({ nullable: true })
    has_pools_finished: boolean

    @Field({ nullable: true })
    has_brackets_finished: boolean

    @Field({ nullable: true })
    registration_closed: boolean

    @Field()
    price: string

    @Field()
    hours: string

    @Field()
    minutes: string

    @Field({ nullable: true })
    pools: number

    @Field({ nullable: true })
    age_group: string

    @Field({ nullable: true })
    max_teams?: number

    @Field({ nullable: true })
    type: string

    @Field({ nullable: true })
    classification?: string

    pool_play_ids: string[]
}
