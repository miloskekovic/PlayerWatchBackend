import { Field, InputType } from 'type-graphql'
import { ChatUser } from './types'
import MessageDto from './Message.dto'
import IChat from '../../Chat.interface'
import { Types } from 'mongoose'
import { ChatUserInput } from './types/ChatUser.input'
@InputType()
export class UpdateChatInput {
    @Field(() => String)
    _id: string

    @Field({ nullable: true })
    description: string

    @Field({ nullable: true })
    name: string

    @Field(() => [ChatUserInput], { nullable: true })
    users: ChatUserInput[]
}
