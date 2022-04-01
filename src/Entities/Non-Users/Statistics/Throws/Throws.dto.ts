import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Throws from './Throws.interface'

@ObjectType()
export class ThrowsDto implements Throws {
    @Field(() => [StatsFields])
    overhead_throw: [StatsFields]

    @Field(() => [StatsFields])
    backwards_overhead_throw: [StatsFields]

    @Field(() => [StatsFields])
    behind_the_head_throw: [StatsFields]
}

@InputType()
export class ThrowsInputDto implements Throws {
    @Field(() => StatsFields, { nullable: true })
    overhead_throw: StatsFields

    @Field(() => StatsFields, { nullable: true })
    backwards_overhead_throw: StatsFields

    @Field(() => StatsFields, { nullable: true })
    behind_the_head_throw: StatsFields
}
