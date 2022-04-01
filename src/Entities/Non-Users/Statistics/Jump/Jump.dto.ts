import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Jump from './Jump.interface'

@ObjectType()
export class JumpDto implements Jump {
    @Field(() => [StatsFields])
    broad_jump: [StatsFields]

    @Field(() => [StatsFields])
    triple_jump: [StatsFields]

    @Field(() => [StatsFields])
    vertical_jump: [StatsFields]

    @Field(() => [StatsFields])
    one_step_vertical_jump: [StatsFields]

    @Field(() => [StatsFields])
    quadrant_jump: [StatsFields]
}

@InputType()
export class JumpInputDto implements Jump {
    @Field(() => StatsFields, { nullable: true })
    broad_jump: StatsFields

    @Field(() => StatsFields, { nullable: true })
    triple_jump: StatsFields

    @Field(() => StatsFields, { nullable: true })
    vertical_jump: StatsFields

    @Field(() => StatsFields, { nullable: true })
    one_step_vertical_jump: StatsFields

    @Field(() => StatsFields, { nullable: true })
    quadrant_jump: StatsFields
}
