import { Arg, Ctx, Query, Resolver, FieldResolver, Root, UseMiddleware } from 'type-graphql'
import { Context } from '../../../../utils/Context.interface'
import SchoolDto from '../dto/School.dto'
import SchoolSchema from '../School.schema'
import { UserDto } from '../../../Users/dto/User.dto'
import SchoolGameDto from '../dto/game/School.Game.dto'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import TeamDto from '../../Team/dto/Team.dto'

@Resolver(() => SchoolDto)
export default class SchoolQueries {
    @FieldResolver(() => [TeamDto])
    @UseMiddleware(IsAuth)
    async full_teams(@Root() school: SchoolDto, @Ctx() context: Context): Promise<TeamDto[]> {
        return (await context.loaders.team.leanDataLoader.loadMany(school.team_ids)).filter((user) => user)
    }

    @FieldResolver(() => [UserDto])
    @UseMiddleware(IsAuth)
    async full_employees(@Root() school: SchoolDto, @Ctx() context: Context): Promise<UserDto[]> {
        return (await context.loaders.user.leanDataLoader.loadMany(school.employee_ids)).filter((user) => user)
    }

    @Query(() => [SchoolDto])
    @UseMiddleware(IsAuth)
    async getSchools(@Ctx() context: Context): Promise<SchoolDto[]> {
        const foundSchools = await SchoolSchema.find({}).lean()
        for (const school of foundSchools) context.loaders.school.leanDataLoader.prime(school._id, school)
        return foundSchools
    }

    @Query(() => [SchoolGameDto])
    @UseMiddleware(IsAuth)
    async getAllSchoolGames(@Ctx() context: Context): Promise<SchoolGameDto[]> {
        const foundSchools = await SchoolSchema.find({}).lean()
        for (const school of foundSchools) context.loaders.school.leanDataLoader.prime(school._id.toString(), school)
        let allGames = []
        foundSchools.forEach(({ games }) => (allGames = [...allGames, ...games]))
        return allGames
    }

    @Query(() => SchoolDto)
    @UseMiddleware(IsAuth)
    async getSchoolByID(@Arg('id') id: string, @Ctx() context: Context): Promise<SchoolDto> {
        return await context.loaders.school.leanDataLoader.load(id)
    }

    @Query(() => SchoolGameDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getGameByID(
        @Arg('schoolID') schoolID: string,
        @Arg('gameID') gameID: string,
        @Ctx() context: Context
    ): Promise<SchoolGameDto> {
        const foundSchool = await context.loaders.school.leanDataLoader.load(schoolID)
        return foundSchool.games.find(({ _id }) => _id.toString() == gameID)
    }
}
