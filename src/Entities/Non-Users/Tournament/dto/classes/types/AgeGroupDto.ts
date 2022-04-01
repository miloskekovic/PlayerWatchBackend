import { Field, ObjectType } from 'type-graphql'
import { GuestTeamDto } from '../../../../Team/dto/Team.guest.dto'
import { Types } from 'mongoose'
import { SnapshotTeamDto } from './SnapshotTeamDto'

@ObjectType()
export default class AgeGroupDto {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => [String], { defaultValue: [] })
    team_ids: string[]

    @Field(() => [SnapshotTeamDto], { defaultValue: [] })
    snapshot_teams: SnapshotTeamDto[]

    @Field({ nullable: true })
    registration_closed: boolean

    @Field({ nullable: true })
    has_pools: boolean

    @Field({ nullable: true })
    has_brackets: boolean

    @Field({ nullable: true })
    has_pools_finished: boolean

    @Field({ nullable: true })
    has_brackets_finished: boolean

    @Field({ defaultValue: 'single elimination' })
    type: string

    @Field(() => Number, { nullable: true })
    max_teams?: number

    @Field(() => [GuestTeamDto], { nullable: true, defaultValue: [] })
    guest_teams: GuestTeamDto[]

    @Field(() => [String], { nullable: true })
    pool_play_ids: string[]

    @Field()
    price: string

    @Field()
    hours: string

    @Field()
    minutes: string

    @Field({ defaultValue: 0 })
    pools: number

    @Field()
    age_group: string

    @Field({ nullable: true })
    classification?: string
}
