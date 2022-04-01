import { Types } from 'mongoose'
import { ArgsType, Field, InputType } from 'type-graphql'

import AgeGroupObject from './types/AgeGroupInput'

@ArgsType()
@InputType('CreateTournamentInput')
export class CreateTournamentInput {
    @Field()
    name: string

    @Field(() => Boolean)
    electronic_payments: boolean

    @Field({ nullable: true })
    description?: string

    @Field()
    start_date: string

    @Field()
    sport: string

    @Field()
    end_date: string

    @Field({ nullable: true })
    fee_description: string

    @Field(() => [AgeGroupObject], { defaultValue: [] })
    age_groups: AgeGroupObject[]

    @Field({ nullable: true })
    flyer?: string

    @Field(() => Boolean)
    pay_at_the_plate: boolean

    @Field({ nullable: true, defaultValue: false })
    registration_closed: boolean

    @Field({ nullable: true })
    hotels?: string

    @Field(() => Number, { nullable: true })
    allowed_assistants?: number

    @Field(() => [String])
    parks: string[]

    @Field(() => String)
    owner: string
}
