import { Types } from 'mongoose'
import SchoolGameTeamDto from './School.Game.Team.dto'
export default interface ISchoolGame {
    _id: Types.ObjectId
    home_school_id: string
    date: string
    start: string
    end: string
    away_team: SchoolGameTeamDto
    home_team: SchoolGameTeamDto
    sport: string
    level: string
    cost?: string
    field_id: Types.ObjectId
    photograph_ids: string[]
    paid: string[]
}
