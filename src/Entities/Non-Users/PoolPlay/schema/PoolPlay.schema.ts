import { Document, model, Schema } from 'mongoose'

import IPoolPlay from '../PoolPlay.interface'

const poolPlaySchema = new Schema({
    teams: [
        {
            _id: false,
            id: String,
            score: Number,
            name: String,
            thumbnail: String,
        },
    ],
    pool: String,
    date: String,
    time: String,
    park: String,
    field: String,
    referees: [String],
})
const PoolPlaySchema = model<IPoolPlay & Document>('PoolPlay', poolPlaySchema)
export default PoolPlaySchema
