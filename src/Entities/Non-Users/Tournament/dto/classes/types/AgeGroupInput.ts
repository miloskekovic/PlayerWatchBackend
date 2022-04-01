import { Field, InputType } from 'type-graphql'

import { GuestTeamInputDto } from '../../../../Team/dto/Team.guest.dto'

@InputType()
export default class CreateAgeGroupDto {
    @Field(() => [String], { defaultValue: [] })
    team_ids: string[]

    @Field(() => [GuestTeamInputDto], { defaultValue: [] })
    guest_teams: GuestTeamInputDto[]

    @Field({ defaultValue: false })
    has_pools: boolean

    @Field({ defaultValue: false })
    has_brackets: boolean

    @Field({ defaultValue: false })
    has_pools_finished: boolean

    @Field({ defaultValue: false })
    has_brackets_finished: boolean

    @Field({ defaultValue: false })
    registration_closed: boolean

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
    max_teams?: number

    @Field({ nullable: true })
    type: string

    @Field({ nullable: true })
    classification?: string

    pool_play_ids: string[]
}
