/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from 'type-graphql'

import CreateFieldDto from './types/Field.CreateInput'
import IPark from '../../Park.interface'
import { Types } from 'mongoose'

@ArgsType()
@InputType('UpdateParkInput')
export class UpdateParkInput implements IPark {
    @Field(() => String)
    _id: Types.ObjectId

    @Field({ nullable: true })
    name: string

    @Field({ nullable: true })
    description: string

    @Field(() => [CreateFieldDto], { nullable: true })
    fields: CreateFieldDto[]

    @Field({ nullable: true })
    open_time: string

    @Field({ nullable: true })
    close_time: string

    @Field({ nullable: true })
    website: string

    @Field(() => String, { nullable: true })
    owner: string

    @Field({ nullable: true })
    free_wifi: boolean

    @Field({ nullable: true })
    water_jug: boolean

    @Field(() => [String], { nullable: true })
    pictures: string[]

    @Field(() => [String], { nullable: true })
    sports: string[]

    @Field({ nullable: true })
    concessions: boolean

    @Field({ nullable: true })
    ice_chest: boolean

    @Field({ nullable: true })
    smoking: boolean

    @Field({ nullable: true })
    city: string

    @Field({ nullable: true })
    state: string

    @Field({ nullable: true })
    street: string

    @Field({ nullable: true })
    zip: string
}
