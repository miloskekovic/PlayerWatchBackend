import { Document, model, Schema, Types } from 'mongoose'

import { ITournament } from '../Tournament.interface'

//User Schema
const tournamentSchema = new Schema({
    name: String,
    electronic_payments: Boolean,
    description: String,
    sport: String,
    start_date: String,
    end_date: String,
    age_groups: [
        {
            team_ids: Array,
            registration_closed: Boolean,
            has_pools: Boolean,
            has_brackets: Boolean,
            has_pools_finished: Boolean,
            has_brackets_finished: Boolean,
            max_teams: Number,
            guest_teams: Array,
            snapshot_teams: [
                {
                    name: String,
                    description: String,
                    thumbnail: String,
                    snapshotted_at: String,
                    classification: String,
                    age_group: String,
                    sport: String,
                    owner: Types.ObjectId,
                    users: [
                        {
                            first_name: String,
                            last_name: String,
                            thumbnail: String,
                            dob: String,
                        },
                    ],
                    folders: [
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
                    paid: Boolean,
                },
            ],
            pool_play_ids: Array,
            price: String,
            hours: String,
            type: { type: String },
            minutes: String,
            pools: Number,
            age_group: String,
            classification: String,
        },
    ],
    flyer: String,
    pay_at_the_plate: Boolean,
    fee_description: String,
    hotels: String,
    allowed_assistants: Number,
    registration_closed: Boolean,
    referees: [String],
    parks: [Types.ObjectId],
    owner: Types.ObjectId,
    assistants: [Types.ObjectId],
})
const TournamentSchema = model<ITournament & Document>('Tournament', tournamentSchema)
export default TournamentSchema
