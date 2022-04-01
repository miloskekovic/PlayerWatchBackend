import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import VideoDto from '../dto/Video.dto'
import VideoSchema from '../schema/Video.schema'

@Resolver(() => VideoDto)
export class VideoQueryResolver {
    @FieldResolver(() => UserDto)
    @UseMiddleware(IsAuth)
    async full_likes(@Root() video: VideoDto, @Ctx() context: Context): Promise<UserDto[]> {
        return (await context.loaders.user.leanDataLoader.loadMany(video.likes)).filter((item) => item)
    }

    @Query(() => [VideoDto])
    @UseMiddleware(IsAuth)
    async getVideos(@Ctx() context: Context): Promise<VideoDto[]> {
        const foundVideos = await VideoSchema.find({}).lean()
        for (const video of foundVideos) context.loaders.event.leanDataLoader.prime(video._id, video)
        return foundVideos
    }

    @Query(() => VideoDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getVideoByID(@Arg('vidID') vidID: string, @Ctx() context: Context): Promise<VideoDto> {
        return await context.loaders.video.leanDataLoader.load(vidID)
    }
}
