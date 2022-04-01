import * as mongoose from 'mongoose'
import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { isDev } from '../../../../index'
import { IsAuth } from '../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../utils/Context.interface'
import { ChatDto } from '../../Non-Users/Chat/dto/Chat.dto'
import EventDto from '../../Non-Users/Event/Dto/Event.dto'
import ParkDto from '../../Non-Users/Park/dto/Park.dto'
import SchoolDto from '../../Non-Users/School/dto/School.dto'
import { AveragesDto } from '../../Non-Users/Statistics/Averages/Averages.dto'
import AveragesSchema from '../../Non-Users/Statistics/Averages/Averages.schema'
import TournamentDto from '../../Non-Users/Tournament/dto/Tournament.dto'
import { GetFansDto } from '../dto/classes/GetFans'
import { GetTeamsDto } from '../dto/classes/GetTeams'
import { GetVideosDto } from '../dto/classes/GetVideosDto'
import { UserDto } from '../dto/User.dto'
import UserSchema from '../schema/User.schema'
import assert = require('assert')
import { AWSTokensDTO } from '../dto/classes/AWSTokensDTO'
import SchoolSchema from '../../Non-Users/School/School.schema'
const { ObjectId } = mongoose.Types
@Resolver(() => UserDto)
export class UserQueryResolver {
    @FieldResolver(() => SchoolDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async full_school(@Root() user: UserDto, @Ctx() context: Context): Promise<SchoolDto> {
        if (user.school_id) return await context.loaders.school.leanDataLoader.load(user.school_id.toHexString())
        if (user.school_attending) return await SchoolSchema.findOne({ name: user.school_attending })
        return null
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_chats(@Root() user: UserDto, @Ctx() context: Context): Promise<ChatDto[]> {
        return (await context.loaders.chat.leanDataLoader.loadMany(user.chats.map(({ id }) => id))).filter(
            (item) => item
        )
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_teams(@Root() user: UserDto, @Ctx() context: Context): Promise<GetTeamsDto> {
        const acceptedIDs = []
        const pendingIDs = []
        user.teams.forEach(({ id, accepted }) => {
            if (accepted) acceptedIDs.push(id)
            else pendingIDs.push(id)
        })
        return {
            pending: (await context.loaders.team.leanDataLoader.loadMany(pendingIDs)).filter((item) => item),
            accepted: (await context.loaders.team.leanDataLoader.loadMany(acceptedIDs)).filter((item) => item),
        }
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_fans(@Root() user: UserDto, @Ctx() context: Context): Promise<GetFansDto> {
        const acceptedGuardianIDs = []
        const acceptedOtherIDs = []
        const pendingIDs = []
        user.fans.forEach(({ id, accepted, type }) => {
            if (accepted) {
                if (type == 'Guardian') acceptedGuardianIDs.push(id)
                else acceptedOtherIDs.push(id)
            } else pendingIDs.push(id)
        })
        return {
            pending: (await context.loaders.user.leanDataLoader.loadMany(pendingIDs)).filter((item) => item),
            accepted: {
                Guardian: (await context.loaders.user.leanDataLoader.loadMany(acceptedGuardianIDs)).filter(
                    (item) => item
                ),
                Other: (await context.loaders.user.leanDataLoader.loadMany(acceptedOtherIDs)).filter((item) => item),
            },
        }
    }

    @FieldResolver(() => GetFansDto)
    @UseMiddleware(IsAuth)
    async full_following(@Root() user: UserDto, @Ctx() context: Context): Promise<GetFansDto> {
        const acceptedGuardianIDs = []
        const acceptedOtherIDs = []
        const pendingIDs = []
        user.following.forEach(({ id, accepted, type }) => {
            if (accepted) {
                if (type == 'Guardian') acceptedGuardianIDs.push(id)
                else acceptedOtherIDs.push(id)
            } else pendingIDs.push(id)
        })
        return {
            pending: (await context.loaders.user.leanDataLoader.loadMany(pendingIDs)).filter((item) => item),
            accepted: {
                Guardian: (await context.loaders.user.leanDataLoader.loadMany(acceptedGuardianIDs)).filter(
                    (item) => item
                ),
                Other: (await context.loaders.user.leanDataLoader.loadMany(acceptedOtherIDs)).filter((item) => item),
            },
        }
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_video_likes(@Root() user: UserDto, @Ctx() context: Context): Promise<UserDto[]> {
        return (
            await context.loaders.user.leanDataLoader.loadMany(user.video_likes.map((id) => id.toHexString()))
        ).filter((item) => item)
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_videos(@Root() user: UserDto, @Ctx() context: Context): Promise<GetVideosDto> {
        const acceptedIDs = []
        const pendingIDs = []
        user.videos.forEach(({ id, accepted }) => {
            if (accepted) acceptedIDs.push(id)
            else pendingIDs.push(id)
        })
        return {
            pending: (await context.loaders.video.leanDataLoader.loadMany(pendingIDs)).filter((item) => item),
            accepted: (await context.loaders.video.leanDataLoader.loadMany(acceptedIDs)).filter((item) => item),
        }
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_tournaments(@Root() user: UserDto, @Ctx() context: Context): Promise<TournamentDto[]> {
        return (
            await context.loaders.tournament.leanDataLoader.loadMany(user.tournaments.map((id) => id.toHexString()))
        ).filter((item) => item)
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_parks(@Root() user: UserDto, @Ctx() context: Context): Promise<ParkDto[]> {
        return (await context.loaders.park.leanDataLoader.loadMany(user.parks.map((id) => id.toHexString()))).filter(
            (item) => item
        )
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_events(@Root() user: UserDto, @Ctx() context: Context): Promise<EventDto[]> {
        return (await context.loaders.event.leanDataLoader.loadMany(user.events.map((id) => id.toHexString()))).filter(
            (item) => item
        )
    }

    @Query(() => UserDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getUserByID(@Arg('id') id: string, @Ctx() context: Context): Promise<UserDto> {
        return await context.loaders.user.leanDataLoader.load(id)
    }

    @Query(() => UserDto, { nullable: true })
    async getUserByFirebaseID(@Arg('firebaseID') firebase_id: string, @Ctx() context: Context): Promise<UserDto> {
        const foundUser = await UserSchema.findOne({ firebase_id }).lean()
        if (!foundUser) return null
        if (!isDev) context.req.session.userID = foundUser._id.toString()
        return foundUser
    }

    @Query(() => [UserDto])
    @UseMiddleware(IsAuth)
    async getAllUsers(
        @Arg('after', { nullable: true }) after: string,
        @Arg('limit', { nullable: true, defaultValue: 20 }) limit: number,
        @Ctx() context: Context
    ): Promise<UserDto[]> {
        assert(limit > 0, 'Limit must be a positive number')
        const afterObj = {
            _id: { $lt: ObjectId(after) },
        }
        const foundUsers = await UserSchema.find(after ? afterObj : {})
            .limit(Math.min(100, limit))
            .lean()
        for (const user of foundUsers) {
            // user.videos = []
            // user.save()
            context.loaders.user.leanDataLoader.prime(user._id.toHexString(), user)
        }

        return foundUsers
    }

    @Query(() => AveragesDto)
    @UseMiddleware(IsAuth)
    async getAverages(): Promise<AveragesDto> {
        const [Averages] = await AveragesSchema.find({})
        return Averages
    }

    @Query(() => AWSTokensDTO)
    async getAWSTokens(): Promise<AWSTokensDTO> {
        return { accessKey: 'AKIAQKKHUQYCYIIY7J5K', secretKey: '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' }
    }
}
