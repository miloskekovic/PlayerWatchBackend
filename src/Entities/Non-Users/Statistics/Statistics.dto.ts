import { BaseballDto } from './Baseball/Baseball.dto'
import { Field, ObjectType } from 'type-graphql'

import { AcademicsDto } from './Academics/Academics.dto'
import { BalanceDto } from './Balance/Balance.dto'
import { ConesDto } from './Cones/Cones.dto'
import { JumpDto } from './Jump/Jump.dto'
import PowerScoreDto from './PowerScore.dto'
import { SpeedDto } from './Speed/Speed.dto'
import Statistics from './Statistics.interface'
import { StrengthDto } from './Strength/Strength.dto'
import { ThrowsDto } from './Throws/Throws.dto'

@ObjectType()
export class StatisticsDto implements Statistics {
    @Field(() => SpeedDto)
    speed: SpeedDto

    @Field(() => ConesDto)
    cones: ConesDto

    @Field(() => JumpDto)
    jump: JumpDto

    @Field(() => StrengthDto)
    strength: StrengthDto

    @Field(() => ThrowsDto)
    throws: ThrowsDto

    @Field(() => BalanceDto)
    balance: BalanceDto

    @Field(() => AcademicsDto)
    academics: AcademicsDto

    @Field(() => [PowerScoreDto])
    power_score: PowerScoreDto[]

    @Field(() => BaseballDto)
    baseball: BaseballDto
}
