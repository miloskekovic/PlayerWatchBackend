/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ObjectType } from 'type-graphql'

import IField from '../../../Field.interface'

@ObjectType()
export default class FieldDto implements IField {
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

    @Field(() => [String], { defaultValue: [], nullable: true })
    sports: string[]

    @Field({ defaultValue: false, nullable: true })
    is_indoor: boolean

    @Field({ nullable: true })
    size: string

    @Field({ defaultValue: false, nullable: true })
    highschool_compatible: boolean
}
