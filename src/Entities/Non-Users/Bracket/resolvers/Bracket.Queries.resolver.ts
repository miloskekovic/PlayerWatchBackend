import { Ctx, FieldResolver, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import BracketGameDto from '../dto/Bracket.dto'

@Resolver(() => BracketGameDto)
export class BracketQueryResolver {
    @FieldResolver(() => [UserDto])
    @UseMiddleware(IsAuth)
    async full_referees(@Root() bracket: BracketGameDto, @Ctx() context: Context): Promise<UserDto[]> {
        if (!bracket.referees || bracket.referees.length == 0) return []
        return await context.loaders.user.leanDataLoader.loadMany(bracket.referees)
    }
}
