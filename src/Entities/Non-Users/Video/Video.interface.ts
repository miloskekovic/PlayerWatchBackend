import { Types } from 'mongoose'
import { UserDto } from '../../Users/dto/User.dto'
import { CreateUploadedBy } from './dto/classes/types'

export default interface IVideo {
    title: string
    description?: string
    url: string
    thumbnail?: string
    type: string
    jersey_color?: string
    jersey_number?: string
    date: string
    likes: string[]
    accepted: boolean
    skill?: string
    tags: string[]
    uploaded_by: CreateUploadedBy
    distance?: string
    broken_tackles?: string
    pancake?: boolean
    tackles?: string
    touchdown?: boolean
    pop_fly?: boolean
    line_drive?: boolean
    velocity?: string
    spin_rate?: string
    exit_speed?: string
}
