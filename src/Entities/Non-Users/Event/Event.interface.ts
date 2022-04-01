import { Types } from 'mongoose'

export interface IEvent {
    _id: Types.ObjectId
    date: string
    name: string
    description?: string
    time?: string
    location?: string
    tournamentID?: Types.ObjectId
    bracketGameID?: Types.ObjectId
    poolGameID?: Types.ObjectId
}
