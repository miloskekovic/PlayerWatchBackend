import { Field, ObjectType } from 'type-graphql'

import { AverageStatsDto } from '../AverageFields.dto'
import Cones from './Cones.interface'

@ObjectType()
export class ConesAverageDto implements Cones {
    @Field()
    ten_yard_shuttle: AverageStatsDto
    @Field()
    twenty_yard_shuttle: AverageStatsDto
    @Field()
    three_cone_drill: AverageStatsDto
    @Field()
    t_test: AverageStatsDto
    @Field()
    compass_agility: AverageStatsDto
    @Field()
    box_drill: AverageStatsDto
}
