import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import { getChallongeTournamentGames } from '../../Bracket/HelpFunctions'
import ParkDto from '../../Park/dto/Park.dto'
import ChallongeTournamentDto from '../dto/classes/Tournament.GetChallonge'
import TournamentDto from '../dto/Tournament.dto'
import TournamentSchema from '../schema/Tournament.schema'
import { generatePartialUrl, GetChallongeTournament } from '../service/Challonge'

export interface IndexedParticipants {
    [key: string]: ChallongeTeam
}
export interface ChallongeTeam {
    name: string
    mongoID: string
    thumbnail?: string
    challonge_id?: number
}
@Resolver(() => TournamentDto)
export class TournamentQueryResolver {
    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_parks(@Root() tournament: TournamentDto, @Ctx() context: Context): Promise<ParkDto[]> {
        return (
            await context.loaders.park.leanDataLoader.loadMany(tournament.parks.map((park) => park.toHexString()))
        ).filter((item) => item)
    }

    @FieldResolver(() => [UserDto])
    @UseMiddleware(IsAuth)
    async full_referees(@Root() tournament: TournamentDto, @Ctx() context: Context): Promise<UserDto[]> {
        if (!tournament.referees || tournament.referees.length == 0) return []
        return await context.loaders.user.leanDataLoader.loadMany(tournament.referees)
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_owner(@Root() tournament: TournamentDto, @Ctx() context: Context): Promise<UserDto> {
        if (!tournament.owner) return null
        return await context.loaders.user.leanDataLoader.load(tournament.owner.toHexString())
    }

    @FieldResolver()
    async full_assistants(@Root() tournament: TournamentDto, @Ctx() context: Context): Promise<UserDto[]> {
        return (
            await context.loaders.user.leanDataLoader.loadMany(
                tournament.assistants.map((assistant) => assistant.toHexString())
            )
        ).filter((item) => item)
    }

    @Query(() => [TournamentDto])
    // @UseMiddleware(IsAuth)
    async getTournaments(@Ctx() context: Context): Promise<TournamentDto[]> {
        const foundTournaments = await TournamentSchema.find({}).lean()
        for (const tournament of foundTournaments)
            context.loaders.event.leanDataLoader.prime(tournament._id, tournament)
        return foundTournaments
    }

    @Query(() => TournamentDto, { nullable: true })
    // @UseMiddleware(IsAuth)
    async getTournamentByID(@Arg('id') id: string, @Ctx() context: Context): Promise<TournamentDto> {
        return await context.loaders.tournament.leanDataLoader.load(id)
    }

    @Query(() => ChallongeTournamentDto)
    @UseMiddleware(IsAuth)
    async getChallongeTournament(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Ctx() context: Context
    ): Promise<ChallongeTournamentDto> {
        const foundTournament = await context.loaders.tournament.leanDataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Unable to find tournament with that ID')
        const partialUrl = generatePartialUrl(foundTournament, ageGroupID)
        const guestTeamMap = new Map()
        foundTournament.age_groups.forEach((ageGroup) => {
            ageGroup.guest_teams.forEach((guestTeam) => {
                guestTeamMap.set(guestTeam._id.toString(), guestTeam)
            })
        })

        const { filtered, totalMatches, participants } = await GetChallongeTournament(partialUrl)
        return await getChallongeTournamentGames(
            partialUrl,
            totalMatches,
            filtered,
            participants,
            context,
            guestTeamMap
        )
    }
}
