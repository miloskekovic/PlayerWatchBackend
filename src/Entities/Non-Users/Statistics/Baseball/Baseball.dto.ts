import { IBaseball } from './Baseball.interface'
import { Field, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'

@ObjectType()
export class BaseballDto implements IBaseball {
    @Field(() => [StatsFields])
    velocity: StatsFields[]
    @Field(() => [StatsFields])
    spin_rate: StatsFields[]
    @Field(() => [StatsFields])
    exit_speed: StatsFields[]
    @Field(() => [StatsFields])
    pop_time: StatsFields[]
    @Field(() => [StatsFields])
    first_to_third: StatsFields[]
    @Field(() => [StatsFields])
    third_to_first: StatsFields[]
    @Field(() => [StatsFields])
    short_to_first: StatsFields[]
}
