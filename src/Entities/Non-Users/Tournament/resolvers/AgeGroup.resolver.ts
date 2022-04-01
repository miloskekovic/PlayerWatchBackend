import { Ctx, FieldResolver, Resolver, Root, UseMiddleware } from 'type-graphql'

import { Context } from '../../../../utils/Context.interface'
import TeamDto from '../../Team/dto/Team.dto'
import AgeGroupDto from '../dto/classes/types/AgeGroupDto'
import PoolPlayDto from '../../PoolPlay/dto/PoolPlay.dto'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Resolver(() => AgeGroupDto)
export class AgeGroupResolver {
    @FieldResolver(() => [PoolPlayDto])
    @UseMiddleware(IsAuth)
    async pool_play_games(@Root() age_group: AgeGroupDto, @Ctx() context: Context): Promise<PoolPlayDto[]> {
        return (await context.loaders.pool_play.leanDataLoader.loadMany(age_group.pool_play_ids)).filter((item) => item)
    }

    @FieldResolver(() => [TeamDto])
    @UseMiddleware(IsAuth)
    async teams(@Root() age_group: AgeGroupDto, @Ctx() context: Context): Promise<TeamDto[]> {
        return (await context.loaders.team.leanDataLoader.loadMany(age_group.team_ids)).filter((item) => item)
    }
}
