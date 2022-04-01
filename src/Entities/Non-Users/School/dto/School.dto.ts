import { ObjectType, Field } from 'type-graphql'
import { ISchool } from '../School.interface'
import { Types } from 'mongoose'
import SchoolFieldDto from './field/School.Field.dto'
import SchoolGameDto from './game/School.Game.dto'

@ObjectType()
export default class SchoolDto implements ISchool {
    @Field(() => String)
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
    @Field(() => [SchoolFieldDto])
    fields: SchoolFieldDto[]
    @Field(() => [String])
    employee_ids: string[]
    @Field(() => [String])
    team_ids: string[]
    @Field(() => [SchoolGameDto])
    games: SchoolGameDto[]
}
