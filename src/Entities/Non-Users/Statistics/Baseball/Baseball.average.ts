import { IBaseball } from './Baseball.interface'
import { Field, ObjectType } from 'type-graphql'
import { AverageStatsDto } from '../AverageFields.dto'

@ObjectType()
export class BaseballAverageDto implements IBaseball {
    @Field(() => AverageStatsDto)
    velocity: AverageStatsDto
    @Field(() => AverageStatsDto)
    spin_rate: AverageStatsDto
    @Field(() => AverageStatsDto)
    exit_speed: AverageStatsDto
    @Field(() => AverageStatsDto)
    pop_time: AverageStatsDto
    @Field(() => AverageStatsDto)
    first_to_third: AverageStatsDto
    @Field(() => AverageStatsDto)
    third_to_first: AverageStatsDto
    @Field(() => AverageStatsDto)
    short_to_first: AverageStatsDto
}
