import { Types } from 'mongoose'
import { Field, InputType } from 'type-graphql'
import UpdateSchoolFieldDto from './field/School.Field.Update'
import UpdateSchoolGameDto from './game/School.Game.Update'

@InputType()
export default class UpdateSchoolDto {
    @Field(() => String)
    _id: Types.ObjectId
    @Field({ nullable: true })
    name: string
    @Field({ nullable: true })
    state: string
    @Field({ nullable: true })
    city: string
    @Field({ nullable: true })
    zip: string
    @Field({ nullable: true })
    street: string
    @Field({ nullable: true })
    state_district_id: string
    @Field({ nullable: true })
    state_school_id: string
    @Field({ nullable: true })
    type: string
    @Field({ nullable: true })
    level: string
    @Field(() => [String], { nullable: true })
    employee_ids: string[]
    @Field(() => [String], { nullable: true })
    team_ids: string[]
    @Field(() => [UpdateSchoolFieldDto], { nullable: true })
    fields: UpdateSchoolFieldDto[]
    @Field(() => [UpdateSchoolGameDto], { nullable: true })
    games: UpdateSchoolGameDto[]
}
