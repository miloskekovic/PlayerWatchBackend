import { Types } from 'mongoose'
import { Field, InputType } from 'type-graphql'
import CreateCameraDto from './camera/Camera.Create.dto'
import { ISchoolField } from './School.Field.interface'

/* eslint-disable @typescript-eslint/no-explicit-any */
@InputType()
export default class CreateSchoolFieldDto implements ISchoolField {
    _id: Types.ObjectId
    @Field(() => [CreateCameraDto], { defaultValue: [] })
    cameras: CreateCameraDto[]
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field({ defaultValue: false })
    has_seating: boolean
    @Field({ defaultValue: false })
    has_shade: boolean
    @Field({ defaultValue: false })
    is_turf: boolean
    @Field(() => [String], { defaultValue: [] })
    pictures: string[]
    @Field({ defaultValue: false })
    electricity: boolean
    @Field(() => [String], { defaultValue: [] })
    sports: string[]
    @Field({ defaultValue: false })
    is_indoor: boolean
    @Field({ nullable: true })
    size: string
    @Field({ defaultValue: false })
    highschool_compatible: boolean
}
