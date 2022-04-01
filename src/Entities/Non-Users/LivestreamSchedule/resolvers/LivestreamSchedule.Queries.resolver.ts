import { Arg, Ctx, Query, Resolver, FieldResolver, Root, UseMiddleware } from 'type-graphql'
import { Context } from '../../../../utils/Context.interface'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import SchoolSchema from '../../School/School.schema'
import SchoolDto from '../../School/dto/School.dto'

@Resolver(() => SchoolDto)
export default class SchoolQueries {
    @Query(() => [SchoolDto])
    @UseMiddleware(IsAuth)
    async getSchools(@Ctx() context: Context): Promise<SchoolDto[]> {
        const foundSchools = await SchoolSchema.find({}).lean()
        for (const school of foundSchools) context.loaders.school.leanDataLoader.prime(school._id, school)
        return foundSchools
    }
}
