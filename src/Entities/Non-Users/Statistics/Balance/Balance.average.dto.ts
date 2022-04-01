import { Field, ObjectType } from 'type-graphql'

import { AverageStatsDto } from '../AverageFields.dto'
import Balance from './Balance.interface'

@ObjectType()
export class BalanceAverageDto implements Balance {
    @Field()
    stork_balance: AverageStatsDto
    @Field()
    stork_hands_up_parallel: AverageStatsDto
    @Field()
    sit_and_reach: AverageStatsDto
}
