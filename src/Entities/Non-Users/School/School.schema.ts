import { Document, model, Schema, Types } from 'mongoose'
import SchoolGameTeamDto from './dto/game/School.Game.Team.dto'
import { ISchool } from './School.interface'

const StreamTeam = {
    _id: String,
    thumbnail: String,
    name: String,
    in_app: Boolean,
}

const schoolSchema = new Schema({
    name: String,
    state: String,
    city: String,
    zip: String,
    street: String,
    state_district_id: String,
    state_school_id: String,
    type: String,
    level: String,
    employee_ids: [String],
    team_ids: [String],
    fields: [
        {
            cameras: [
                {
                    name: String,
                    url: String,
                    is_radar: Boolean,
                    quality: String,
                    thumbnail: String,
                    owner: String,
                    channelId: String,
                },
            ],
            name: String,
            description: String,
            has_seating: Boolean,
            has_shade: Boolean,
            is_turf: Boolean,
            pictures: [String],
            electricity: Boolean,
            sports: [String],
            is_indoor: Boolean,
            size: String,
            highschool_compatible: Boolean,
        },
    ],
    games: [
        {
            home_school_id: String,
            date: String,
            start: String,
            end: String,
            start_iso: String,
            end_iso: String,
            away_team: StreamTeam,
            home_team: StreamTeam,
            sport: String,
            level: String,
            cost: String,
            field_id: Types.ObjectId,
            photograph_ids: [String],
            paid: [String],
        },
    ],
})

const SchoolSchema = model<ISchool & Document>('School', schoolSchema)

export default SchoolSchema
