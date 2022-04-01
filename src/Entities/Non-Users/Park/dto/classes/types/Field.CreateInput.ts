/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from 'type-graphql'

import { CreateEntityInput } from '../../../../Generic/dto/classes/Entity.CreateInput'
import IField from '../../../Field.interface'

@InputType('InputFieldDto')
@ArgsType()
export default class CreateFieldDto implements IField {
    @Field()
    name: string

    @Field({ nullable: true })
    description: string

    @Field({ defaultValue: false, nullable: true })
    has_seating: boolean

    @Field({ defaultValue: false, nullable: true })
    has_shade: boolean

    @Field({ defaultValue: false, nullable: true })
    is_turf: boolean

    @Field({ defaultValue: false, nullable: true })
    spikes: boolean

    @Field(() => [String], { defaultValue: [], nullable: true })
    pictures: string[]

    @Field({ defaultValue: false, nullable: true })
    electricity: boolean

    @Field(() => [String], { defaultValue: false, nullable: true })
    sports: string[]

    @Field({ defaultValue: false, nullable: true })
    is_indoor: boolean

    @Field({ nullable: true })
    size: string

    @Field({ defaultValue: false, nullable: true })
    highschool_compatible: boolean
}
