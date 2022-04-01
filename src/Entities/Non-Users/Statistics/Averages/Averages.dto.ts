import { Field, ObjectType } from 'type-graphql'

import { AcademicsAverageDto } from '../Academics/Academics.average.dto'
import { BalanceAverageDto } from '../Balance/Balance.average.dto'
import { ConesAverageDto } from '../Cones/Cones.average.dto'
import { JumpAverageDto } from '../Jump/Jump.average.dto'
import { SpeedAverageDto } from '../Speed/Speed.average.dto'
import Statistics from '../Statistics.interface'
import { StrengthAverageDto } from '../Strength/Strength.average.dto'
import { ThrowsAverageDto } from '../Throws/Throws.average.dto'
import { BaseballAverageDto } from '../Baseball/Baseball.average'

@ObjectType()
export class AveragesDto implements Statistics {
    @Field(() => SpeedAverageDto)
    speed: SpeedAverageDto
    @Field(() => ConesAverageDto)
    cones: ConesAverageDto
    @Field(() => JumpAverageDto)
    jump: JumpAverageDto
    @Field(() => StrengthAverageDto)
    strength: StrengthAverageDto
    @Field(() => ThrowsAverageDto)
    throws: ThrowsAverageDto
    @Field(() => BalanceAverageDto)
    balance: BalanceAverageDto
    @Field(() => AcademicsAverageDto)
    academics: AcademicsAverageDto
    @Field(() => BaseballAverageDto)
    baseball: BaseballAverageDto
}
