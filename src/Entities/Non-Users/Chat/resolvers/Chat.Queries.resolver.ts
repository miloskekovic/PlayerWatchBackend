import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import TeamDto from '../../Team/dto/Team.dto'
import { ChatDto } from '../dto/Chat.dto'
import ChatSchema from '../schema/Chat.schema'

@Resolver(() => ChatDto)
export class ChatQueryResolver {
    @FieldResolver(() => [UserDto])
    @UseMiddleware(IsAuth)
    async full_users(@Root() chat: ChatDto, @Ctx() context: Context): Promise<UserDto[]> {
        return (
            await context.loaders.user.leanDataLoader.loadMany(chat.users.map(({ id }) => id.toHexString()))
        ).filter((item) => item)
    }

    @FieldResolver(() => TeamDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async team(@Root() chat: ChatDto, @Ctx() context: Context): Promise<TeamDto> {
        if (!chat.team_id) return null
        return await context.loaders.team.leanDataLoader.load(chat.team_id.toHexString())
    }

    @Query(() => [ChatDto])
    @UseMiddleware(IsAuth)
    async getChats(@Ctx() context: Context): Promise<ChatDto[]> {
        const foundChats = await ChatSchema.find({}).lean()
        for (const chat of foundChats) context.loaders.event.leanDataLoader.prime(chat._id, chat)
        return foundChats
    }

    @Query(() => ChatDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getChatByID(@Arg('id') id: string, @Ctx() context: Context): Promise<ChatDto> {
        return await context.loaders.chat.leanDataLoader.load(id)
    }

    @Query(() => ChatDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async doesChatExist(@Arg('users', () => [String]) users: string[], @Ctx() context: Context): Promise<ChatDto> {
        const [foundChat] = await ChatSchema.find({ users: { $size: users.length }, 'users.id': { $all: users } })
        return foundChat
    }
}
