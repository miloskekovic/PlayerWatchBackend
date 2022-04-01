import { Types } from 'mongoose'
import { Arg, Args, Ctx, Mutation, PubSub, PubSubEngine, Resolver, UseMiddleware } from 'type-graphql'

import { Context } from '../../../../utils/Context.interface'
import { ChatDto } from '../dto/Chat.dto'
import { CreateChatInput, UpdateChatInput } from '../dto/classes'
import ChatAddUsers from '../dto/classes/Chat.AddUsers'
import MessageDto from '../dto/classes/Message.dto'
import ChatSchema from '../schema/Chat.schema'
import SendNotification from '../../../../Non-Entities/Notification/SendMessage'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

const { ObjectId } = Types

@Resolver()
export class ChatMutationResolver {
    @Mutation(() => ChatDto)
    @UseMiddleware(IsAuth)
    async createChat(@Arg('chat') chat: CreateChatInput, @Ctx() context: Context): Promise<ChatDto> {
        const foundOwner = await context.loaders.user.dataLoader.load(chat.owner_id)
        const foundUsers = await context.loaders.user.dataLoader.loadMany(chat.users.map(({ id }) => id))
        chat.users.push({ id: new ObjectId(chat.owner_id), admin: true, muted: false })
        const createdChat = await ChatSchema.create(chat)
        for (const user of foundUsers) {
            user.chats.push({
                id: createdChat._id,
                muted: false,
                team_id: new ObjectId(chat.team_id),
            })
            user.save()
        }

        foundOwner.chats.push({
            id: createdChat._id,
            muted: false,
            team_id: new ObjectId(chat.team_id),
        })
        foundOwner.save()
        return createdChat.toObject()
    }

    @Mutation(() => ChatDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async updateChat(
        @Arg('chat') chat: UpdateChatInput,
        @Ctx() context: Context,
        @PubSub() pub: PubSubEngine
    ): Promise<ChatDto> {
        const foundChat = await context.loaders.chat.dataLoader.load(chat._id.toHexString())
        if ('users' in chat) {
            const reformattedNewUsers = new Map()
            chat.users.forEach((user) => reformattedNewUsers.set(user.id, true))
            const removedUsers = []
            foundChat.users.forEach((user) => {
                if (!reformattedNewUsers.has(user.id.toString())) removedUsers.push(user.id.toString())
                reformattedNewUsers.delete(user.id.toString())
            })
            const addedUsers = [...reformattedNewUsers.keys()]
            const foundAddedUsers = await context.loaders.user.dataLoader.loadMany(addedUsers)
            const foundRemovedUsers = await context.loaders.user.dataLoader.loadMany(removedUsers)
            let foundIndex
            foundAddedUsers.forEach((user) => {
                foundIndex = user.chats.findIndex(({ id }) => id == foundChat._id)
                if (foundIndex == -1) {
                    user.chats.push({ id: foundChat._id, muted: false, team_id: foundChat.team_id })
                    user.save()
                }
            })
            foundRemovedUsers.forEach((user) => {
                foundIndex = user.chats.findIndex(({ id }) => id == foundChat._id)
                if (foundIndex > -1) {
                    user.chats.splice(foundIndex, 1)
                    user.save()
                }
            })
        }

        for (const key in chat) foundChat[key] = chat[key]
        foundChat.save()
        await pub.publish('chat', { chat: foundChat.toObject() })
        return foundChat.toObject()
    }

    @Mutation(() => ChatDto)
    @UseMiddleware(IsAuth)
    async addUserToChat(
        @Arg('chatID') chatID: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context,
        @PubSub() pub: PubSubEngine,
        @Arg('admin', { defaultValue: true }) admin?: boolean
    ): Promise<ChatDto> {
        const foundChat = await context.loaders.chat.dataLoader.load(chatID)
        if (!foundChat) throw new Error('Unable to find chat with that ID')

        if (!foundChat.users.some(({ id }) => id.toString() === userID))
            foundChat.users.push({
                id: new ObjectId(userID),
                muted: false,
                admin,
            })
        foundChat.save()
        await pub.publish('chat', { chat: foundChat.toObject() })
        return foundChat.toObject()
    }

    @Mutation(() => ChatDto)
    @UseMiddleware(IsAuth)
    async changeAdminInChat(
        @Arg('admin') admin: boolean,
        @Arg('chatID') chatID: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context,
        @PubSub() pub: PubSubEngine
    ): Promise<ChatDto> {
        const foundChat = await context.loaders.chat.dataLoader.load(chatID)
        const foundUserIndex = foundChat.users.findIndex(({ id }) => id.toString() !== userID)
        if (foundUserIndex > -1) foundChat.users[foundUserIndex].admin = admin
        foundChat.save()
        await pub.publish('chat', { chat: foundChat.toObject() })
        return foundChat.toObject()
    }

    @Mutation(() => ChatDto)
    @UseMiddleware(IsAuth)
    async addUsersToChat(
        @Args() input: ChatAddUsers,
        @Ctx() context: Context,
        @PubSub() pub: PubSubEngine
    ): Promise<ChatDto> {
        const { chatID, userIDs } = input
        const foundChat = await context.loaders.chat.dataLoader.load(chatID)
        if (!foundChat) throw new Error('Unable to find chat with that ID')
        const chatUserIDs = foundChat.users.map(({ id }) => id.toString())
        userIDs.forEach((userID) => {
            if (!chatUserIDs.includes(userID))
                foundChat.users.push({
                    id: new ObjectId(userID),
                    admin: false,
                    muted: false,
                })
        })

        foundChat.save()
        await pub.publish('chat', { chat: foundChat.toObject() })
        return foundChat.toObject()
    }

    @Mutation(() => ChatDto)
    @UseMiddleware(IsAuth)
    async leaveChat(
        @Arg('userID') userID: string,
        @Arg('chatID') chatID: string,
        @Ctx() context: Context,
        @PubSub() pub: PubSubEngine
    ): Promise<ChatDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Cannot find user with that ID')
        const foundChat = await context.loaders.chat.dataLoader.load(chatID)
        if (!foundChat) throw new Error('Cannot find chat with that ID')
        foundUser.chats = foundUser.chats.filter(({ id }) => id.toString() !== chatID)
        foundChat.users = foundChat.users.filter(({ id }) => id.toString() !== userID)
        foundUser.save()
        foundChat.save()
        await pub.publish('chat', { chat: foundChat.toObject() })
        return foundUser.toObject()
    }

    @Mutation(() => ChatDto)
    @UseMiddleware(IsAuth)
    async changeMutedStatusInChat(
        @Arg('chatID') chatID: string,
        @Arg('muted') muted: boolean,
        @Arg('muted_type') muted_type: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context,
        @PubSub() pub: PubSubEngine
    ): Promise<ChatDto> {
        const foundChat = await context.loaders.chat.dataLoader.load(chatID)
        const foundUser = foundChat.users.find(({ id }) => id.toString() !== userID)
        foundUser.muted = muted
        foundUser.muted_type = muted_type
        foundChat.save()
        await pub.publish('chat', { chat: foundChat.toObject() })
        return foundChat.toObject()
    }

    @Mutation(() => ChatDto)
    @UseMiddleware(IsAuth)
    async sendMessage(
        @Arg('message') message: MessageDto,
        @Arg('chatID') chatID: string,
        @PubSub() pub: PubSubEngine,
        @Ctx() context: Context
    ): Promise<ChatDto> {
        const updatedChat = await ChatSchema.findByIdAndUpdate(
            chatID,
            { $addToSet: { messages: message } },
            { new: true }
        )
        await pub.publish('chat', { chat: updatedChat.toObject() })
        const foundUsers = await context.loaders.user.leanDataLoader.loadMany(
            updatedChat.users.map(({ id }) => id.toHexString())
        )
        let tokens = []
        foundUsers.forEach((user) => {
            if (user._id.toHexString() != message.user._id) tokens = [...tokens, ...user.tokens]
        })
        await SendNotification({
            title: message.user.name,
            subtitle: updatedChat.name,
            body: message.text,
            imageUrl: message?.image || message.user.avatar,
            data: {
                screen: 'Chat',
                params: { chatID: updatedChat._id },
            },
            tokens,
        })
        return updatedChat.toObject()
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteChat(
        @Arg('chatID') chatID: string,
        @Ctx() context: Context,
        @PubSub() pub: PubSubEngine
    ): Promise<boolean> {
        const deletedChat = await ChatSchema.findByIdAndDelete(chatID)
        const foundUsers = await context.loaders.user.dataLoader.loadMany(
            deletedChat.users.map(({ id }) => id.toHexString())
        )
        for (const user of foundUsers) {
            const foundChatIndex = user.chats.findIndex(({ id }) => id.toString() == deletedChat._id.toString())
            if (foundChatIndex > -1) {
                user.chats.splice(foundChatIndex, 1)
                user.save()
            }
        }
        await pub.publish('chat', {
            chat: deletedChat.toObject(),
            deleted: true,
        })
        return true
    }
}
