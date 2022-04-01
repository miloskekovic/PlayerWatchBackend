import { ObjectType, Field } from 'type-graphql'
import ISchoolGame from './School.Game.interface'
import { Types } from 'mongoose'
import SchoolGameTeamDto from './School.Game.Team.dto'

@ObjectType()
export default class SchoolGameDto implements ISchoolGame {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    home_school_id: string
    @Field()
    date: string
    @Field()
    start: string
    @Field()
    end: string
    @Field(() => SchoolGameTeamDto)
    away_team: SchoolGameTeamDto
    @Field(() => SchoolGameTeamDto)
    home_team: SchoolGameTeamDto
    @Field()
    sport: string
    @Field()
    level: string
    @Field({ nullable: true })
    cost?: string
    @Field(() => String)
    field_id: Types.ObjectId
    @Field(() => [String])
    photograph_ids: string[]
    @Field(() => [String])
    paid: string[]
}
