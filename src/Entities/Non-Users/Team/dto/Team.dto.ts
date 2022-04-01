import { FolderDto } from './classes/types/FolderDto'
import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../../../Users/dto/User.dto'
import { ITeam } from '../Team.interface'
import { GetTeamUsers } from './classes/GetUsers'
import { FullTeamTournamentDto } from './classes/Team.FullTournaments'
import TeamTournamentDto from './classes/types/Team.Tournament'
import InviteDto from '../../../DTO/Invite.dto'
import EventDto from '../../Event/Dto/Event.dto'
import { TeamStreamDto } from './classes/types/Team.Streams.dto'

@ObjectType()
export default class TeamDto implements ITeam {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    classification: string
    @Field()
    age_group: string
    @Field()
    sport: string
    @Field({ nullable: true })
    thumbnail?: string
    @Field(() => [FolderDto])
    folders: FolderDto[]
    @Field({ nullable: true })
    school_id?: string
    @Field(() => [TeamStreamDto])
    streams: TeamStreamDto[]

    @Field(() => [String])
    events: Types.ObjectId[]
    @Field(() => [EventDto])
    full_events: EventDto[]

    @Field(() => [String])
    admins: Types.ObjectId[]
    @Field(() => [UserDto])
    full_admins: UserDto[]

    @Field(() => String, { nullable: true })
    owner?: Types.ObjectId
    @Field(() => UserDto, { nullable: true })
    full_owner?: UserDto

    @Field(() => [InviteDto])
    users?: InviteDto[]
    @Field(() => GetTeamUsers)
    full_users?: GetTeamUsers

    @Field(() => [TeamTournamentDto])
    tournaments?: TeamTournamentDto[]
    @Field(() => [FullTeamTournamentDto])
    full_tournaments?: FullTeamTournamentDto[]
}
