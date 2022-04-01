import { model, Schema } from 'mongoose'

const guestTeamSchema = new Schema({
    name: String,
    description: String,
    classification: String,
    age_group: String,
    thumbnail: String,
})

const GuestTeamSchema = model('GuestTeam', guestTeamSchema)
export default GuestTeamSchema
