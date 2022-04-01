import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import PoolPlayDto from '../dto/PoolPlay.dto'

@Resolver(() => PoolPlayDto)
export class PoolPlayQueryResolver {
    @FieldResolver(() => [UserDto])
    @UseMiddleware(IsAuth)
    async full_referees(@Root() poolPlay: PoolPlayDto, @Ctx() context: Context): Promise<UserDto[]> {
        if (!poolPlay.referees || poolPlay.referees.length == 0) return []
        return await context.loaders.user.leanDataLoader.loadMany(poolPlay.referees)
    }

    @Query(() => PoolPlayDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getPoolPlayByID(@Arg('id') id: string, @Ctx() context: Context): Promise<PoolPlayDto> {
        return await context.loaders.pool_play.leanDataLoader.load(id)
    }
}
