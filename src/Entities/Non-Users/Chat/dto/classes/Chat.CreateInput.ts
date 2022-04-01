import { Types } from 'mongoose'
import { Field, InputType } from 'type-graphql'
import { ChatUser } from './types'
import { ChatUserInput } from './types/ChatUser.input'

@InputType()
export class CreateChatInput {
    @Field({ nullable: true })
    description?: string
    @Field(() => String)
    owner_id: string
    @Field()
    name: string
    @Field(() => [ChatUserInput], { nullable: true })
    users: ChatUserInput[]
    @Field(() => String, { nullable: true })
    team_id?: string
    messages: []
}
