import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../../../Users/dto/User.dto'
import IField from '../Field.interface'
import IPark from '../Park.interface'
import FieldDto from './classes/types/Field.dto'

/* eslint-disable @typescript-eslint/no-explicit-any */
@ObjectType()
export default class ParkDto implements IPark {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field(() => [FieldDto])
    fields: IField[]

    @Field()
    open_time: string

    @Field()
    close_time: string

    @Field({ nullable: true })
    website?: string

    @Field(() => UserDto, { nullable: true })
    full_owner?: UserDto

    @Field(() => String, { nullable: true })
    owner?: Types.ObjectId

    @Field()
    free_wifi: boolean

    @Field(() => [String], { nullable: true })
    pictures: string[]

    @Field(() => [String], { nullable: true })
    sports: string[]

    @Field()
    concessions: boolean

    @Field()
    water_jug: boolean

    @Field()
    ice_chest: boolean

    @Field()
    smoking: boolean

    @Field()
    city: string

    @Field()
    state: string

    @Field()
    street: string

    @Field()
    zip: string
}
