import { BaseballInputDto } from './../../../Non-Users/Statistics/Baseball/Baseball.input'

import { ThrowsInputDto } from './../../../Non-Users/Statistics/Throws/Throws.dto'
import { StrengthInputDto } from './../../../Non-Users/Statistics/Strength/Strength.dto'
import { SpeedInputDto } from './../../../Non-Users/Statistics/Speed/Speed.dto'
import { JumpInputDto } from './../../../Non-Users/Statistics/Jump/Jump.dto'
import { ConesInputDto } from './../../../Non-Users/Statistics/Cones/Cones.dto'
import { BalanceInputDto } from './../../../Non-Users/Statistics/Balance/Balance.dto'
import { AcademicsInputDto } from './../../../Non-Users/Statistics/Academics/Academics.Update'
import { Field, InputType } from 'type-graphql'

@InputType('PatchStatisticsInput')
export class PatchStatistics {
    @Field(() => AcademicsInputDto, { nullable: true })
    academics?: AcademicsInputDto

    @Field(() => BalanceInputDto, { nullable: true })
    balance?: BalanceInputDto

    @Field(() => ConesInputDto, { nullable: true })
    cones?: ConesInputDto

    @Field(() => JumpInputDto, { nullable: true })
    jump?: JumpInputDto

    @Field(() => SpeedInputDto, { nullable: true })
    speed?: SpeedInputDto

    @Field(() => StrengthInputDto, { nullable: true })
    strength?: StrengthInputDto

    @Field(() => ThrowsInputDto, { nullable: true })
    throws?: ThrowsInputDto

    @Field(() => BaseballInputDto, { nullable: true })
    baseball?: BaseballInputDto
}
