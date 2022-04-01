import { Types } from 'mongoose'
import { Field, InputType } from 'type-graphql'
import SchoolGameTeamInput from './School.Game.Team.create.input'

@InputType()
export default class CreateSchoolGame {
    @Field()
    home_school_id: string
    @Field()
    date: string
    @Field()
    start: string
    @Field()
    start_iso: string
    @Field()
    end: string
    @Field()
    end_iso: string
    @Field(() => SchoolGameTeamInput)
    away_team: SchoolGameTeamInput
    @Field(() => SchoolGameTeamInput)
    home_team: SchoolGameTeamInput
    @Field()
    sport: string
    @Field()
    level: string
    @Field({ nullable: true })
    cost?: string
    @Field(() => String)
    field_id: string
}
