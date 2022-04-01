import { Ctx, FieldResolver, Resolver, Root, UseMiddleware } from 'type-graphql'

import { Context } from '../../../../utils/Context.interface'
import { SnapshotTeamDto } from '../dto/classes/types/SnapshotTeamDto'
import { UserDto } from '../../../Users/dto/User.dto'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Resolver(() => SnapshotTeamDto)
export class SnapshotTeamResolver {
    @FieldResolver(() => UserDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async full_owner(@Root() team: SnapshotTeamDto, @Ctx() context: Context): Promise<UserDto> {
        return await context.loaders.user.leanDataLoader.load(team.owner.toHexString())
    }
}
