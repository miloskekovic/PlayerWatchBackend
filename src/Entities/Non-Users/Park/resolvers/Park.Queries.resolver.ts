import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import ParkDto from '../dto/Park.dto'
import ParkSchema from '../schema/Park.schema'

@Resolver(() => ParkDto)
export class ParkQueryResolver {
    @FieldResolver({ nullable: true })
    @UseMiddleware(IsAuth)
    async full_owner(@Root() park: ParkDto, @Ctx() context: Context): Promise<UserDto> {
        if (!park.owner) return null
        return await context.loaders.user.leanDataLoader.load(park.owner.toHexString())
    }

    @Query(() => [ParkDto])
    @UseMiddleware(IsAuth)
    async getParks(@Ctx() context: Context): Promise<ParkDto[]> {
        const foundParks = await ParkSchema.find({}).lean()
        for (const park of foundParks) context.loaders.event.leanDataLoader.prime(park._id, park)
        return foundParks
    }

    @Query(() => ParkDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getParkByID(@Arg('parkID') parkID: string, @Ctx() context: Context): Promise<ParkDto> {
        return await context.loaders.park.leanDataLoader.load(parkID)
    }
}
