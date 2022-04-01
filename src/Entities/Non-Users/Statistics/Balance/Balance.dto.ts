import { Field, InputType, ObjectType } from 'type-graphql'

import { StatsFields } from '../StatsFields.dto'
import Balance from './Balance.interface'

@ObjectType()
export class BalanceDto implements Balance {
    @Field(() => [StatsFields])
    stork_balance: [StatsFields]

    @Field(() => [StatsFields])
    stork_hands_up_parallel: [StatsFields]

    @Field(() => [StatsFields])
    sit_and_reach: [StatsFields]
}
@InputType()
export class BalanceInputDto implements Balance {
    @Field(() => StatsFields, { nullable: true })
    stork_balance: StatsFields

    @Field(() => StatsFields, { nullable: true })
    stork_hands_up_parallel: StatsFields

    @Field(() => StatsFields, { nullable: true })
    sit_and_reach: StatsFields
}
