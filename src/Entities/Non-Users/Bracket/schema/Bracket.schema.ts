import { Document, model, Schema } from 'mongoose'

import { IBracket } from '../Bracket.interface'

const BracketSchema = new Schema({
    time: String,
    date: String,
    park: String,
    field: String,
    challonge_id: Number,
    referees: [String],
})

export default model<IBracket & Document>('Bracket', BracketSchema)
