import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from 'type-graphql'

import { Context } from '../../../../utils/Context.interface'
import { GetTeamUsers } from '../dto/classes/GetUsers'
import { FullTeamTournamentDto } from '../dto/classes/Team.FullTournaments'
import TeamDto from '../dto/Team.dto'
import TeamSchema from '../schema/Team.schema'
import { UserDto } from '../../../Users/dto/User.dto'
import EventDto from '../../Event/Dto/Event.dto'
import moment = require('moment')
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import SchoolDto from '../../School/dto/School.dto'
import SchoolGameDto from '../../School/dto/game/School.Game.dto'
@Resolver(() => TeamDto)
export class TeamQueryResolver {
    @FieldResolver(() => [SchoolGameDto])
    @UseMiddleware(IsAuth)
    async full_streams(@Root() team: TeamDto, @Ctx() context: Context): Promise<SchoolGameDto[]> {
        if (team.streams?.length == 0) return []
        const returnGames = []
        await Promise.all(
            team.streams.map(async ({ id: stream_id, school_id }) => {
                const foundSchool = await context.loaders.school.leanDataLoader.load(school_id)
                const foundGame = foundSchool.games.find((game) => stream_id == game._id.toHexString())
                if (foundGame) returnGames.push(foundGame)
            })
        )
        return returnGames
    }

    @FieldResolver(() => SchoolDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async full_school(@Root() team: TeamDto, @Ctx() context: Context): Promise<SchoolDto> {
        if (!team.school_id) return null
        return await context.loaders.school.leanDataLoader.load(team.school_id)
    }

    @FieldResolver({ nullable: true })
    @UseMiddleware(IsAuth)
    async full_owner(@Root() team: TeamDto, @Ctx() context: Context): Promise<UserDto> {
        if (!team.owner) return null
        return await context.loaders.user.leanDataLoader.load(team.owner.toHexString())
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_tournaments(@Root() team: TeamDto, @Ctx() context: Context): Promise<FullTeamTournamentDto[]> {
        const tournamentIDMap = new Map()
        const foundTournaments = await context.loaders.tournament.leanDataLoader.loadMany(
            team.tournaments.map(({ id, new_team_name }) => {
                tournamentIDMap.set(id, new_team_name)
                return id.toString()
            })
        )
        const myReturn = []
        foundTournaments.forEach((tournament) => {
            if (tournament) myReturn.push({ ...tournament, new_team_name: tournamentIDMap.get(tournament._id) })
        })
        return myReturn
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_users(@Root() team: TeamDto, @Ctx() context: Context): Promise<GetTeamUsers> {
        const acceptedUsers = []
        const pendingUsers = []
        team.users.forEach(({ id, accepted }) => {
            if (accepted) acceptedUsers.push(id)
            else pendingUsers.push(id)
        })
        return {
            accepted: (await context.loaders.user.leanDataLoader.loadMany(acceptedUsers)).filter((item) => item),
            pending: (await context.loaders.user.leanDataLoader.loadMany(pendingUsers)).filter((item) => item),
        }
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_admins(@Root() team: TeamDto, @Ctx() context: Context): Promise<UserDto[]> {
        return (
            await context.loaders.user.leanDataLoader.loadMany(team.admins.map((admin) => admin.toHexString()))
        ).filter((item) => item)
    }

    @FieldResolver()
    @UseMiddleware(IsAuth)
    async full_events(@Root() team: TeamDto, @Ctx() context: Context): Promise<EventDto[]> {
        let foundEvents = await context.loaders.event.leanDataLoader.loadMany(
            team.events.map((event) => event.toHexString())
        )
        foundEvents = foundEvents.filter((event) => event)
        return foundEvents.sort((a, b) => {
            const firstDateTime = a.date + ' ' + a.time
            const secondDateTime = b.date + ' ' + b.time
            return moment(firstDateTime).diff(moment(secondDateTime))
        })
    }

    @Query(() => [TeamDto])
    @UseMiddleware(IsAuth)
    async getTeams(@Ctx() context: Context): Promise<TeamDto[]> {
        const teams = await TeamSchema.find({}).lean()
        for (const team of teams) context.loaders.team.leanDataLoader.prime(team._id, team)
        return teams
    }

    @Query(() => TeamDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async getTeamByID(@Arg('teamID') teamID: string, @Ctx() context: Context): Promise<TeamDto> {
        return await context.loaders.team.leanDataLoader.load(teamID)
    }
}
