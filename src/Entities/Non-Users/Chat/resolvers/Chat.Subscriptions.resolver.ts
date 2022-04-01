import { Arg, Resolver, Root, Subscription, ObjectType, Field } from 'type-graphql'

import { ChatDto } from '../dto/Chat.dto'

@ObjectType()
class SubscribedChatDto {
    @Field(() => ChatDto)
    chat: ChatDto
    @Field({ defaultValue: false })
    deleted: boolean
}

@Resolver()
export default class ChatSubscriptionResolver {
    @Subscription(() => SubscribedChatDto, {
        nullable: true,
        topics: 'chat',
        filter: ({ payload, args }) => args.chatID === payload.chat._id.toString(),
    })
    chatUpdated(@Root() updatedChat: SubscribedChatDto, @Arg('chatID') chatID: string): SubscribedChatDto {
        return updatedChat
    }
}
