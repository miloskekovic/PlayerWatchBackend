import { Document, model, Schema, Types } from 'mongoose'

import IPark from '../Park.interface'
import FieldSchema from './Field.schema'

const parkSchema = new Schema({
    name: String,
    description: String,
    fields: [FieldSchema],
    open_time: String,
    close_time: String,
    website: String,
    water_jug: Boolean,
    free_wifi: Boolean,
    pictures: [String],
    sports: [String],
    concessions: Boolean,
    owner: Types.ObjectId,
    // GPS coords
    ice_chest: Boolean,
    smoking: Boolean,
    city: String,
    state: String,
    street: String,
    zip: Number,
})
const ParkSchema = model<IPark & Document>('Park', parkSchema)
export default ParkSchema
