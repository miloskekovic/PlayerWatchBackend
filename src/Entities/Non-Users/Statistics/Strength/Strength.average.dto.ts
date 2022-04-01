import { Field, ObjectType } from 'type-graphql'

import { AverageStatsDto } from '../AverageFields.dto'
import Strength from './Strength.interface'

@ObjectType()
export class StrengthAverageDto implements Strength {
    @Field()
    bench_press: AverageStatsDto
    @Field()
    squat: AverageStatsDto
    @Field()
    deadlift: AverageStatsDto
    @Field()
    push_up: AverageStatsDto
    @Field()
    chin_up: AverageStatsDto
    @Field()
    sit_up: AverageStatsDto
    @Field()
    plank: AverageStatsDto
    @Field()
    grip: AverageStatsDto
}
