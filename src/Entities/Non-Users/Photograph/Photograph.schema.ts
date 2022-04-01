import { Document, model, Schema } from 'mongoose'
import { IPhotograph } from './Photograph.interface'

const photographSchema = new Schema({
    team_ids: [String], //teams: [{ _id: String, name: String, thumbnail: String }]
    school_id: String,
    date: String,
    game_id: String,
    date_uploaded: String,
    taken_by: {
        _id: String,
        first_name: String,
        last_name: String,
        thumbnail: String,
    },
    url: String,
    price: Number,
    purchased_by: [String],
})

const PhotographSchema = model<IPhotograph & Document>('Photograph', photographSchema)

export default PhotographSchema
