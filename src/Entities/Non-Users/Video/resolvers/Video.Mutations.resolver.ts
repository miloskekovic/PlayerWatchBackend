import { Arg, Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import { CreateVideoInput } from '../dto/classes/Video.CreateInput'
import { UpdateVideoInput } from '../dto/classes/Video.UpdateInput'
import VideoDto from '../dto/Video.dto'
import VideoSchema from '../schema/Video.schema'

@Resolver()
export class VideoMutationResolver {
    @Mutation(() => UserDto)
    @UseMiddleware(IsAuth)
    async createVideo(
        @Arg('userID') userID: string,
        @Arg('video') input: CreateVideoInput,
        @Ctx() context: Context
    ): Promise<UserDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        const created = await VideoSchema.create(input)
        foundUser.videos.push({ id: created._id, accepted: input.uploaded_by.id.toString() == userID })
        foundUser.save()
        return foundUser.toObject()
    }

    @Mutation(() => VideoDto)
    @UseMiddleware(IsAuth)
    async updateVideo(@Arg('video') input: UpdateVideoInput): Promise<VideoDto> {
        const { _id, ...rest } = input
        return await VideoSchema.findByIdAndUpdate(_id, { $set: rest }, { new: true }).lean()
    }

    @Mutation(() => UserDto)
    @UseMiddleware(IsAuth)
    async acceptVideo(
        @Arg('videoID') videoID: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context
    ): Promise<UserDto> {
        const foundVideo: any = await context.loaders.video.dataLoader.load(videoID)
        if (!foundVideo) throw new Error('Unable to find a video with that ID')
        const foundUser: any = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Unable to find a player with that ID')
        foundVideo.accepted = true
        const videoToUpdate = foundUser.videos.find(({ id }) => id.toString() == videoID)
        if (!videoToUpdate) foundUser.toObject()
        videoToUpdate.accepted = true
        foundVideo.save()
        foundUser.save()
        return foundUser.toObject()
    }
}
