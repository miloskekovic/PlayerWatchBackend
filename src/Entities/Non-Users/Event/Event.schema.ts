import { Document, model, Schema, Types } from 'mongoose'
import { IEvent } from './Event.interface'

const eventSchema = new Schema({
    name: String,
    description: String,
    date: String,
    location: String,
    tournamentID: Types.ObjectId,
    bracketGameID: Types.ObjectId,
    poolGameID: Types.ObjectId,
    time: String,
})

const EventSchema = model<IEvent & Document>('Event', eventSchema)

export default EventSchema
