import { Types } from 'mongoose'
import { Field, InputType } from 'type-graphql'
import CreateSchoolFieldDto from './field/School.Field.Create'

@InputType()
export default class CreateSchoolDto {
    _id: Types.ObjectId
    @Field()
    name: string
    @Field()
    state: string
    @Field()
    city: string
    @Field()
    zip: string
    @Field()
    street: string
    @Field()
    state_district_id: string
    @Field()
    state_school_id: string
    @Field()
    type: string
    @Field()
    level: string
    employee_ids = []
    @Field(() => [CreateSchoolFieldDto])
    fields: CreateSchoolFieldDto[]
    games = []
}
