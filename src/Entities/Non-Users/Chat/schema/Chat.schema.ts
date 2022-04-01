import { Document, model, Schema, Types } from 'mongoose'
import IChat from '../Chat.interface'

const ChatUserSchema = {
    _id: false,
    id: Types.ObjectId,
    admin: Boolean,
    muted: Boolean,
    muted_type: String,
}

//User Schema
const chatSchema = new Schema({
    name: String,
    description: String,
    users: [{ ...ChatUserSchema }],
    team_id: Types.ObjectId,
    messages: {
        type: [
            {
                _id: String,
                text: String,
                image: String,
                video: String,
                user: {
                    _id: String,
                    avatar: String,
                    name: String,
                },
                createdAt: String,
            },
        ],
        default: [],
    },
    owner_id: Types.ObjectId,
})

const ChatSchema = model<IChat & Document>('Chat', chatSchema)
export default ChatSchema
