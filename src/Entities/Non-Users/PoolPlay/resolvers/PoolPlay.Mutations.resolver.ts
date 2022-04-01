import { Arg, Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { Context } from '../../../../utils/Context.interface'
import { CreatePoolPlayInput } from '../dto/classes'
import PoolPlayDto from '../dto/PoolPlay.dto'
import PoolPlaySchema from '../schema/PoolPlay.schema'
import EventSchema from '../../Event/Event.schema'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

@Resolver()
export class PoolPlayMutationResolver {
    @Mutation(() => PoolPlayDto)
    @UseMiddleware(IsAuth)
    async createPoolPlay(@Args() input: CreatePoolPlayInput, @Ctx() context: Context): Promise<PoolPlayDto> {
        const { tournamentID, ageGroupID, ...rest } = input
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        const foundAgeGroup = foundTournament.age_groups.find((ageGroup) => ageGroup._id.toString() == ageGroupID)
        const createdGame = await PoolPlaySchema.create(rest)
        const location = rest.park || rest.field ? `${rest.park} ${rest.field}` : null
        const [{ name: team1Name, id: team1ID }, { name: team2Name, id: team2ID }] = rest.teams
        const createdEvent = await EventSchema.create({
            date: rest.date,
            time: rest.time,
            name: `${foundTournament.name}`,
            description: `${team1Name} vs ${team2Name}`,
            tournamentID: foundTournament._id,
            poolGameID: createdGame._id,
            location,
        })
        const foundTeams = (await context.loaders.team.dataLoader.loadMany([team1ID, team2ID])).filter((item) => item)
        for (const team of foundTeams) {
            team.events.push(createdEvent._id)
            team.save()
        }
        const foundRefs = (await context.loaders.user.dataLoader.loadMany(input.referees)).filter((item) => item)
        for (const ref of foundRefs) {
            ref.events.push(createdEvent._id)
            ref.save()
        }
        foundAgeGroup.pool_play_ids.push(createdGame._id)
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return createdGame
    }

    @Mutation(() => PoolPlayDto)
    @UseMiddleware(IsAuth)
    async updatePoolPlay(@Args() input: PoolPlayDto, @Ctx() context: Context): Promise<PoolPlayDto> {
        const { _id, ...rest } = input
        const foundPoolPlay = await context.loaders.pool_play.dataLoader.load(_id)
        const foundEvent = await context.loaders.event_from_pool_game.leanDataLoader.load(foundPoolPlay._id)
        const prevTeamIDs = foundPoolPlay.teams.map(({ id }) => id)
        Object.keys(rest).forEach((key) => (foundPoolPlay[key] = rest[key]))
        await foundPoolPlay.save()
        if (!foundEvent) return foundPoolPlay
        foundEvent.date = foundPoolPlay.date
        foundEvent.time = foundPoolPlay.time
        const nextTeamIDs = rest.teams.map(({ id }) => id)
        prevTeamIDs.sort()
        nextTeamIDs.sort()
        const removedTeamIDs = prevTeamIDs.filter((id) => !nextTeamIDs.includes(id))
        const addedTeamIDs = nextTeamIDs.filter((id) => !prevTeamIDs.includes(id))
        if (removedTeamIDs.length == 0 && addedTeamIDs.length == 0) return foundPoolPlay
        const foundRemovedTeams = (await context.loaders.team.dataLoader.loadMany(removedTeamIDs)).filter(
            (item) => item
        )
        const foundAddedTeams = (await context.loaders.team.dataLoader.loadMany(addedTeamIDs)).filter((item) => item)
        foundRemovedTeams.forEach((removedTeam) => {
            removedTeam.events = removedTeam.events.filter((event) => event == foundEvent._id)
            removedTeam.save()
        })
        foundAddedTeams.forEach((addedTeam) => {
            addedTeam.events.push(foundEvent._id)
            addedTeam.save()
        })

        const addedRefs = []
        const removedRefs = []
        input.referees.forEach((refID) => {
            if (!foundPoolPlay.referees.includes(refID)) {
                addedRefs.push(refID)
            }
        })
        foundPoolPlay.referees.forEach((refID) => {
            if (!input.referees.includes(refID)) {
                removedRefs.push(refID)
            }
        })
        if (addedRefs.length != 0) {
            const foundAddedRefs = await context.loaders.user.dataLoader.loadMany(addedRefs)
            for (const ref of foundAddedRefs) {
                const foundEventIndex = ref.events.findIndex((eventID) => eventID == foundEvent._id)
                if (foundEventIndex == -1) {
                    ref.events.push(foundEvent._id)
                    ref.save()
                }
            }
        }
        if (removedRefs.length != 0) {
            const foundRemovedRefs = await context.loaders.user.dataLoader.loadMany(removedRefs)
            for (const ref of foundRemovedRefs) {
                const foundEventIndex = ref.events.findIndex((eventID) => eventID == foundEvent._id)
                if (foundEventIndex > -1) {
                    ref.events.splice(foundEventIndex, 1)
                    ref.save()
                }
            }
        }

        return foundPoolPlay.toObject()
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async finishPoolPlay(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => _id.toString() == ageGroupID)
        foundAgeGroup.has_pools_finished = true
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return true
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deletePoolPlay(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Arg('poolPlayID') poolPlayID: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundPoolPlay = await context.loaders.pool_play.dataLoader.load(poolPlayID)
        if (!foundPoolPlay) throw new Error('Cannot pool play with that ID')
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Cannot find tournament with that ID')
        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => ageGroupID === _id.toString())
        if (!foundAgeGroup) throw new Error('Cannot find age group with that ID')
        foundAgeGroup.pool_play_ids = foundAgeGroup.pool_play_ids.filter((id) => id.toString() !== poolPlayID)
        const foundEvent = await context.loaders.event_from_pool_game.dataLoader.load(foundPoolPlay._id)
        if (foundEvent) foundEvent.remove()
        const foundTeams = (await context.loaders.team.dataLoader.loadMany(foundAgeGroup.team_ids)).filter(
            (item) => item
        )
        foundTeams.forEach((team) => {
            team.events = team.events.filter((event) => foundEvent._id !== event)
            team.save()
        })
        foundPoolPlay.remove()
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return true
    }
}
