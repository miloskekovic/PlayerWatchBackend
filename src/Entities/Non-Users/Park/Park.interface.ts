import { Types } from 'mongoose'

import { UserDto } from '../../Users/dto/User.dto'
import IField from './Field.interface'

export default interface IPark {
    _id: Types.ObjectId
    name: string
    description?: string
    fields: IField[]
    open_time: string
    close_time: string
    water_jug: boolean
    website?: string
    free_wifi: boolean
    pictures: string[]
    sports: string[]
    concessions: boolean
    owner?: Types.ObjectId
    ice_chest: boolean
    smoking: boolean
    city: string
    state: string
    street: string
    zip: string
}
