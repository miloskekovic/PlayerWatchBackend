import { InputType, Field } from 'type-graphql'
import ISchoolGame from './School.Game.interface'
import { Types } from 'mongoose'
import SchoolGameTeamInput from './School.Game.Team.create.input'

@InputType()
export default class UpdateSchoolGameDto implements ISchoolGame {
    @Field(() => String)
    _id: Types.ObjectId
    @Field({ nullable: true })
    home_school_id: string
    @Field({ nullable: true })
    date: string
    @Field({ nullable: true })
    start: string
    @Field({ nullable: true })
    end: string
    @Field({ nullable: true })
    start_iso: string
    @Field({ nullable: true })
    end_iso: string
    @Field(() => SchoolGameTeamInput, { nullable: true })
    away_team: SchoolGameTeamInput
    @Field({ nullable: true })
    sport: string
    @Field({ nullable: true })
    level: string
    @Field({ nullable: true })
    cost?: string
    @Field(() => String, { nullable: true })
    field_id: string
}
