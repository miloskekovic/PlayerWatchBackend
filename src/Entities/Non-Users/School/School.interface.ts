import { Types } from 'mongoose'
import SchoolFieldDto from './dto/field/School.Field.dto'
import SchoolGameDto from './dto/game/School.Game.dto'

export interface ISchool {
    _id: Types.ObjectId
    name: string
    state: string
    city: string
    zip: string
    street: string
    state_district_id: string
    state_school_id: string
    type: string
    level: string
    team_ids: string[]
    employee_ids: string[]
    games: SchoolGameDto[]
    fields: SchoolFieldDto[]
}
