import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Academics from './Academics.interface'
import { Types } from 'mongoose'

@ObjectType()
export class AcademicsDto implements Academics {
    @Field(() => [StatsFields])
    act_score: [StatsFields]
    @Field(() => [StatsFields])
    sat_score: [StatsFields]
    @Field(() => [StatsFields])
    gpa: [StatsFields]
}
