import { StatsFields } from './../StatsFields.dto'
import { IBaseball } from './Baseball.interface'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('BaseballUpdateDto')
export class BaseballInputDto implements IBaseball {
    @Field(() => StatsFields, { nullable: true })
    velocity: StatsFields
    @Field(() => StatsFields, { nullable: true })
    spin_rate: StatsFields
    @Field(() => StatsFields, { nullable: true })
    exit_speed: StatsFields
    @Field(() => StatsFields, { nullable: true })
    pop_time: StatsFields
    @Field(() => StatsFields, { nullable: true })
    first_to_third: StatsFields
    @Field(() => StatsFields, { nullable: true })
    third_to_first: StatsFields
    @Field(() => StatsFields, { nullable: true })
    short_to_first: StatsFields
}
