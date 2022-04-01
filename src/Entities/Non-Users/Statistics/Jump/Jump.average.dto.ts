import { Field, ObjectType } from 'type-graphql'

import { AverageStatsDto } from '../AverageFields.dto'
import Jump from './Jump.interface'

@ObjectType()
export class JumpAverageDto implements Jump {
    @Field()
    broad_jump: AverageStatsDto
    @Field()
    triple_jump: AverageStatsDto
    @Field()
    vertical_jump: AverageStatsDto
    @Field()
    one_step_vertical_jump: AverageStatsDto
    @Field()
    quadrant_jump: AverageStatsDto
}
