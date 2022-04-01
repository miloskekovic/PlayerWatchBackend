import { Types } from 'mongoose'
import { Field, InputType } from 'type-graphql'
import UpdateCameraDto from './camera/Camera.Update.dto'
import { ISchoolField } from './School.Field.interface'

/* eslint-disable @typescript-eslint/no-explicit-any */
@InputType()
export default class UpdateSchoolFieldDto implements ISchoolField {
    @Field(() => String)
    _id: Types.ObjectId
    @Field(() => [UpdateCameraDto], { nullable: true })
    cameras: UpdateCameraDto[]
    @Field({ nullable: true })
    name: string
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    has_seating: boolean
    @Field({ nullable: true })
    has_shade: boolean
    @Field({ nullable: true })
    is_turf: boolean
    @Field(() => [String], { nullable: true })
    pictures: string[]
    @Field({ nullable: true })
    electricity: boolean
    @Field(() => [String], { nullable: true })
    sports: string[]
    @Field({ nullable: true })
    is_indoor: boolean
    @Field({ nullable: true })
    size: string
    @Field({ nullable: true })
    highschool_compatible: boolean
}
