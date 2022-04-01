import { Document, model, Schema, Types } from 'mongoose'

import { ITeam } from '../Team.interface'

const teamSchema = new Schema({
    name: String,
    description: String,
    thumbnail: String,
    classification: String,
    age_group: String,
    owner: Types.ObjectId,
    admins: [Types.ObjectId],
    sport: String,
    events: [Types.ObjectId],
    users: [{ id: Types.ObjectId, accepted: Boolean, admin: Boolean }],
    tournaments: [{ id: Types.ObjectId, new_team_name: String, paid: Boolean }],
    school_id: String,
    folders: {
        type: [
            {
                name: String,
                thumbnail: String,
                urls: [
                    {
                        url: String,
                        uploaded_by: Types.ObjectId,
                        uploaded_at: String,
                    },
                ],
            },
        ],
        default: [
            {
                name: 'Birth Certificates',
                thumbnail: 'https://playerwatchtest.s3.amazonaws.com/PlayerWatch/BirthCertificate.png',
                urls: [],
            },
        ],
    },
    streams: [
        {
            _id: false,
            school_id: String,
            id: String,
        },
    ],
})

const TeamSchema = model<ITeam & Document>('Team', teamSchema)

export default TeamSchema
