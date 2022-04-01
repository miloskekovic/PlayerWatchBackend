import { Field, ObjectType } from 'type-graphql'

import { AverageStatsDto } from '../AverageFields.dto'
import Throws from './Throws.interface'

@ObjectType()
export class ThrowsAverageDto implements Throws {
    @Field()
    overhead_throw: AverageStatsDto
    @Field()
    backwards_overhead_throw: AverageStatsDto
    @Field()
    behind_the_head_throw: AverageStatsDto
}
