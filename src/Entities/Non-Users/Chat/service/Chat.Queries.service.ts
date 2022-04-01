import * as mongoose from 'mongoose'
import ChatDto from '../dto/Chat.dto'
import ChatSchema from '../schema/Chat.schema'

/* eslint-disable @typescript-eslint/no-explicit-any */
const {
    Types: { ObjectId },
} = mongoose
export class ChatQueryService {
    async doesChatExist(users: string[]): Promise<ChatDto> {
        const foundChats = await ChatSchema.find({ 'users.id': { $all: users } }).lean()
        const found = foundChats.find((chat) => {
            return chat.users.length == users.length && chat.users.every((user) => users.includes(user.id.toString()))
        })
        return found
    }
}
