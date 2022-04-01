import { Types } from 'mongoose'
import { ArgsType, Field, InputType } from 'type-graphql'

import { CreateEntityInput } from '../../../Generic/dto/classes'
import IPark from '../../Park.interface'
import CreateFieldDto from './types/Field.CreateInput'

@ArgsType()
@InputType('CreateParkInput')
export class CreateParkInput implements IPark {
    _id: Types.ObjectId

    @Field()
    name: string

    @Field({ nullable: true })
    description?: string

    @Field(() => [CreateFieldDto])
    fields: CreateFieldDto[]

    @Field()
    open_time: string

    @Field()
    close_time: string

    @Field()
    water_jug: boolean

    @Field({ nullable: true })
    website: string

    @Field(() => String, { nullable: true })
    owner: string

    @Field()
    free_wifi: boolean

    @Field(() => [String], { nullable: true, defaultValue: [] })
    pictures: string[]

    @Field(() => [String], { nullable: true, defaultValue: [] })
    sports: string[]

    @Field()
    concessions: boolean

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
