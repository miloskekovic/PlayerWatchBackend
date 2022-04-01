import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Academics from './Academics.interface'

@ObjectType()
@InputType('AcademicsInput')
export class AcademicsInputDto implements Academics {
    @Field(() => StatsFields, { nullable: true })
    act_score: StatsFields
    @Field(() => StatsFields, { nullable: true })
    sat_score: StatsFields
    @Field(() => StatsFields, { nullable: true })
    gpa: StatsFields
}
