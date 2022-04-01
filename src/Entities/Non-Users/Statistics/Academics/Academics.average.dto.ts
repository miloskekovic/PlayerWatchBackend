import { Field, ObjectType } from 'type-graphql'

import { AverageStatsDto } from '../AverageFields.dto'
import Academics from './Academics.interface'

@ObjectType()
export class AcademicsAverageDto implements Academics {
    @Field()
    act_score: AverageStatsDto

    @Field()
    sat_score: AverageStatsDto

    @Field()
    gpa: AverageStatsDto
}
