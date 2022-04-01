import { Types } from 'mongoose'

import { UserDto } from '../../Users/dto/User.dto'
import ParkDto from '../Park/dto/Park.dto'
import AgeGroupDto from './dto/classes/types/AgeGroupDto'

export interface ITournament {
    name: string
    electronic_payments: boolean
    description?: string
    sport: string
    start_date: string
    end_date: string
    age_groups: AgeGroupDto[]
    flyer?: string
    pay_at_the_plate: boolean
    fee_description?: string
    hotels?: string
    allowed_assistants?: number
    registration_closed: boolean
    parks: Types.ObjectId[]
    full_parks: ParkDto[]
    owner: Types.ObjectId
    full_owner?: UserDto
    referees?: string[]
    assistants?: Types.ObjectId[]
    full_assistants?: UserDto[]
}
