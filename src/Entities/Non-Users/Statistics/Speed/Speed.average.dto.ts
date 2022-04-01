import { Field, ObjectType } from 'type-graphql'

import { AverageStatsDto } from '../AverageFields.dto'
import Speed from './Speed.interface'

@ObjectType()
export class SpeedAverageDto implements Speed {
    @Field(() => AverageStatsDto)
    ten_yard_dash: AverageStatsDto
    @Field(() => AverageStatsDto)
    twenty_yard_dash: AverageStatsDto
    @Field(() => AverageStatsDto)
    thirty_yard_dash: AverageStatsDto
    @Field(() => AverageStatsDto)
    forty_yard_dash: AverageStatsDto
    @Field(() => AverageStatsDto)
    fifty_yard_dash: AverageStatsDto
    @Field(() => AverageStatsDto)
    sixty_yard_dash: AverageStatsDto
    @Field(() => AverageStatsDto)
    ladder_drill: AverageStatsDto
}
