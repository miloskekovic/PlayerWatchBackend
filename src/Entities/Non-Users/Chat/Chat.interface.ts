import { Types } from 'mongoose'
import MessageDto from './dto/classes/Message.dto'
import { ChatUser } from './dto/classes/types'
import TeamDto from '../Team/dto/Team.dto'
import { UserDto } from '../../Users/dto/User.dto'

export default interface IChat {
    _id: Types.ObjectId
    name: string
    description?: string
    users: ChatUser[]
    owner_id: Types.ObjectId
    team_id?: Types.ObjectId
    messages: MessageDto[]
}
