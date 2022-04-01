import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class TeamTournamentDto {
    @Field(() => String)
    id: Types.ObjectId

    @Field({ nullable: true, defaultValue: null })
    new_team_name?: string

    @Field({ nullable: true, defaultValue: null })
    paid?: boolean
}
