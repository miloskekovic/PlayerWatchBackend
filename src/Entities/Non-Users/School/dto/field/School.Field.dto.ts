import { Field, ObjectType } from 'type-graphql'

import { ISchoolField } from './School.Field.interface'
import CameraDto from './camera/Camera.dto'
import { Types } from 'mongoose'
/* eslint-disable @typescript-eslint/no-explicit-any */
@ObjectType()
export default class SchoolFieldDto implements ISchoolField {
    @Field(() => String)
    _id: Types.ObjectId
    @Field(() => [CameraDto])
    cameras: CameraDto[]
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field()
    has_seating: boolean
    @Field()
    has_shade: boolean
    @Field()
    is_turf: boolean
    @Field(() => [String])
    pictures: string[]
    @Field()
    electricity: boolean
    @Field(() => [String])
    sports: string[]
    @Field()
    is_indoor: boolean
    @Field()
    size: string
    @Field()
    highschool_compatible: boolean
}
