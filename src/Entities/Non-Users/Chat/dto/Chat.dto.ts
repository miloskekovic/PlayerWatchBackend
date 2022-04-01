import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../../../Users/dto/User.dto'
import EntityDto from '../../Generic/dto/Entity.dto'
import TeamDto from '../../Team/dto/Team.dto'
import IChat from '../Chat.interface'
import MessageDto from './classes/Message.dto'
import { ChatUser } from './classes/types'

@ObjectType()
export class ChatDto implements IChat {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field({ nullable: true })
    description?: string
    @Field(() => String)
    owner_id: Types.ObjectId
    @Field(() => [ChatUser])
    users: ChatUser[]
    @Field(() => TeamDto, { nullable: true })
    team?: TeamDto
    @Field(() => String, { nullable: true })
    team_id?: Types.ObjectId
    @Field(() => [MessageDto])
    messages: MessageDto[]
}
