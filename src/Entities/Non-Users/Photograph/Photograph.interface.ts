import { Types } from 'mongoose'
import PhotographOwnerDto from './dto/classes/PhotographOwner.dto'

export interface IPhotograph {
    _id: Types.ObjectId
    team_ids: string[] //teams: [{ _id: String, name: String, thumbnail: String }]
    school_id?: string
    date: string
    game_id?: string
    date_uploaded: string
    owner: PhotographOwnerDto
    url: string
    price: number
    purchased_by: string[]
}
