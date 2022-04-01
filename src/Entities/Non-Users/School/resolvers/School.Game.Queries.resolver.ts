import { Ctx, Field, FieldResolver, ObjectType, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import SchoolFieldDto from '../dto/field/School.Field.dto'
import SchoolGameDto from '../dto/game/School.Game.dto'
import SchoolDto from '../dto/School.dto'

@Resolver(() => SchoolGameDto)
export default class SchoolGameQueries {
    @FieldResolver(() => SchoolDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async full_home_school(@Root() schoolGame: SchoolGameDto, @Ctx() context: Context): Promise<SchoolDto> {
        if (!schoolGame.home_school_id) return null
        return await context.loaders.school.leanDataLoader.load(schoolGame.home_school_id)
    }

    @FieldResolver(() => SchoolFieldDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async full_field(@Root() schoolGame: SchoolGameDto, @Ctx() context: Context): Promise<SchoolFieldDto> {
        if (!schoolGame.home_school_id) return null
        const foundSchool = await context.loaders.school.leanDataLoader.load(schoolGame.home_school_id)
        return foundSchool.fields.find(({ _id }) => _id.toString() == schoolGame.field_id.toString())
    }

    @Query(() => AllowUsers, { nullable: true })
    async getAllowedUsers(): Promise<AllowUsers> {
        return await Promise.resolve({ userId: allowedUsers })
    }
}

export const allowedUsers = [
    '5f94a1050a9983001e9a9ec9',
    '5f96c8ac115aa5001ef553f7',
    '5f9b9c980a03c5001eb4077a',
    '5fa04091c8e9e9001ea45b79',
    '60f78be5aa043424c7887382',
    '60fb230faa043424c78873ae',
    '61afab0cb0bd760f89341969',
]
@ObjectType()
class AllowUsers {
    @Field(() => [String])
    userId: string[]
}
