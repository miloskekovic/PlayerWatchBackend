import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import SchoolGameDto from '../../School/dto/game/School.Game.dto'
import SchoolDto from '../../School/dto/School.dto'
import TeamDto from '../../Team/dto/Team.dto'
import PhotographDto from '../dto/Photograph.dto'
import PhotographSchema from '../Photograph.schema'

@Resolver(() => PhotographDto)
export class PhotographQueryResolver {
    @FieldResolver(() => [TeamDto])
    @UseMiddleware(IsAuth)
    async full_teams(@Root() photo: PhotographDto, @Ctx() context: Context): Promise<TeamDto[]> {
        return (await context.loaders.team.leanDataLoader.loadMany(photo.team_ids)).filter((item) => item)
    }

    @FieldResolver(() => SchoolDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async full_school(@Root() photo: PhotographDto, @Ctx() context: Context): Promise<SchoolDto> {
        if (!photo.school_id) return null
        return await context.loaders.school.leanDataLoader.load(photo.school_id)
    }

    @FieldResolver(() => SchoolGameDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async full_game(@Root() photo: PhotographDto, @Ctx() context: Context): Promise<SchoolGameDto> {
        if (!photo.game_id) return null
        const foundSchool = await context.loaders.school.leanDataLoader.load(photo.school_id)
        const foundGame = foundSchool.games.find((game) => game._id.toHexString() == photo.game_id)
        return foundGame
    }

    @Query(() => [PhotographDto])
    @UseMiddleware(IsAuth)
    async getPhotographs(@Ctx() context: Context): Promise<PhotographDto[]> {
        const foundPhotos = await PhotographSchema.find({}).lean()
        for (const photo of foundPhotos) context.loaders.event.leanDataLoader.prime(photo._id, photo)
        return foundPhotos
    }

    @Query(() => PhotographDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getPhotographByID(@Arg('photoID') photoID: string, @Ctx() context: Context): Promise<PhotographDto> {
        return await context.loaders.photograph.leanDataLoader.load(photoID)
    }
}
