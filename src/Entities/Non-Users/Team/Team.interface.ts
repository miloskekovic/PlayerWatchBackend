import { FolderDto } from './dto/classes/types/FolderDto'
import { Types } from 'mongoose'

import { UserDto } from '../../Users/dto/User.dto'
import { GetTeamUsers } from './dto/classes/GetUsers'
import { FullTeamTournamentDto } from './dto/classes/Team.FullTournaments'
import TeamTournamentDto from './dto/classes/types/Team.Tournament'
import InviteDto from '../../DTO/Invite.dto'
import EventDto from '../Event/Dto/Event.dto'
import { TeamStreamDto } from './dto/classes/types/Team.Streams.dto'

export interface ITeam {
    name: string
    description?: string
    thumbnail?: string
    classification: string
    age_group: string
    sport: string
    events: Types.ObjectId[]
    full_events: EventDto[]
    school_id?: string
    admins: Types.ObjectId[]
    full_admins: UserDto[]
    owner?: Types.ObjectId
    full_owner?: UserDto
    tournaments?: TeamTournamentDto[]
    full_tournaments?: FullTeamTournamentDto[]
    users?: InviteDto[]
    full_users?: GetTeamUsers
    folders: FolderDto[]
    streams: TeamStreamDto[]
}
