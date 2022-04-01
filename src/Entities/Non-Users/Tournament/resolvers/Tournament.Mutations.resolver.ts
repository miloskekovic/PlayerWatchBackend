import { ObjectId } from 'mongodb'
import { Arg, Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import isSameAsContext from '../../../../Non-Entities/Authentication/isSameAsContext'
import { Context } from '../../../../utils/Context.interface'
import EventSchema from '../../Event/Event.schema'
import PoolPlaySchema from '../../PoolPlay/schema/PoolPlay.schema'
import GuestTeamSchema from '../../Team/schema/Team.guest.schema'
import TeamSchema from '../../Team/schema/Team.schema'
import { CreateTournamentInput, UpdateTournamentInput } from '../dto/classes'
import { GenerateBracketFromPoolInput } from '../dto/classes/Tournament.GenerateBracketFromPoolInput'
import TournamentDto from '../dto/Tournament.dto'
import TournamentSchema from '../schema/Tournament.schema'
import {
    AddChallongeParticipants,
    CreateChallongeParticipants,
    CreateChallongeTournament,
    DeleteChallongeTournament,
    generatePartialUrl,
} from '../service/Challonge'

import assert = require('assert')
import { isDev } from '../../../../..'
@Resolver()
export class TournamentMutationResolver {
    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async createTournament(
        @Arg('tournament') input: CreateTournamentInput,
        @Arg('userID') userID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        assert(isSameAsContext(context, userID))
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Unable to find a user with that ID')
        // const foundConsumableIndex = foundUser.consumables.findIndex(
        //     ({ sku, count }) => sku == 'test_tournament_1' && count >= 1
        // )
        // if (!isDev) assert(foundConsumableIndex > -1, 'Insufficient funds.')
        const createdTournament = await TournamentSchema.create(input)
        foundUser.tournaments.push(createdTournament._id)
        // if (!isDev) foundUser.consumables[foundConsumableIndex].count--
        foundUser.save()
        return createdTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async updateTournament(
        @Arg('tournament') input: UpdateTournamentInput,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        assert(isSameAsContext(context, input.owner))
        return (await TournamentSchema.findByIdAndUpdate(input._id, { $set: input }, { new: true })).toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async addTeamToTournament(
        @Arg('teamID') teamID: string,
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        if (!foundTeam) throw new Error('No team found with that ID')
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('No tournament found with that ID')

        assert(isSameAsContext(context, foundTeam.owner.toHexString()))

        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => _id.toString() === ageGroupID)
        if (!foundAgeGroup) throw new Error("Age group can't be found in this tournament")
        const teamAlreadyInAgeGroup = foundAgeGroup.team_ids.includes(teamID)
        if (!teamAlreadyInAgeGroup) foundAgeGroup.team_ids.push(teamID)

        if (!foundTeam.tournaments.some(({ id }) => id.toString() === tournamentID))
            foundTeam.tournaments.push({ id: new ObjectId(tournamentID), new_team_name: 'test' })

        foundTeam.save()
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async addAssistantToTournament(
        @Arg('assistantID') assistantID: string,
        @Arg('tournamentID') tournamentID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('No tournament found with that ID')
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        const foundAssistant = await context.loaders.user.dataLoader.load(assistantID)
        if (!foundAssistant) throw new Error('No assistant found with that ID')
        const tournamentIDAsObjectID = new ObjectId(tournamentID)
        const assistantIDAsObjectID = new ObjectId(assistantID)
        const assistantAlreadyInTournament = foundTournament.assistants.includes(tournamentIDAsObjectID)
        if (!assistantAlreadyInTournament) foundTournament.assistants.push(tournamentIDAsObjectID)
        const tournamentAlreadyInAssistant = foundAssistant.tournaments.includes(assistantIDAsObjectID)
        if (!tournamentAlreadyInAssistant) foundAssistant.tournaments.push(assistantIDAsObjectID)
        foundTournament.save()
        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async removeAssistantFromTournament(
        @Arg('assistantID') assistantID: string,
        @Arg('tournamentID') tournamentID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('No tournament found with that ID')
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        const foundAssistant = await context.loaders.user.dataLoader.load(assistantID)
        if (!foundAssistant) throw new Error('No assistant found with that ID')
        foundTournament.assistants = foundTournament.assistants.filter((id) => id.toString() !== assistantID)
        foundAssistant.tournaments = foundAssistant.tournaments.filter((id) => id.toString() !== tournamentID)
        foundTournament.save()
        foundAssistant.save()
        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async closeRegistration(
        @Arg('tournamentID') tournamentID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Cannot find tournament with that ID')
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        foundTournament.age_groups = foundTournament.age_groups.filter(
            ({ team_ids, guest_teams }) => team_ids.length + guest_teams.length >= 3
        )
        if (foundTournament.age_groups.length == 0) {
            foundTournament.remove()
            return null
        }

        let foundTeams = []
        let userIDs = []
        let foundUsers = []
        foundTournament.age_groups = await Promise.all(
            foundTournament.age_groups.map(async (ageGroup) => {
                foundTeams = await context.loaders.team.leanDataLoader.loadMany(ageGroup.team_ids)
                ageGroup.snapshot_teams = await Promise.all(
                    foundTeams.map(async (team) => {
                        if (team.users.length == 0) return { ...team, snapshotted_at: new Date().toISOString() }
                        userIDs = []
                        team.users.forEach((user) => {
                            if (user.accepted) userIDs.push(user.id)
                        })
                        foundUsers = await context.loaders.user.leanDataLoader.loadMany(userIDs)
                        return { ...team, users: foundUsers, snapshotted_at: new Date().toISOString() }
                    })
                )
                return ageGroup
            })
        )

        // TODO Send Push Notification
        foundTournament.registration_closed = true
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async removeTeamFromTournament(
        @Arg('teamID') teamID: string,
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        if (!foundTeam) throw new Error('No team found with that ID')
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('No tournament found with that ID')
        // assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => _id.toString() === ageGroupID)
        if (!foundAgeGroup) throw new Error("Age group can't be found in this tournament")
        const teamIndex = foundAgeGroup.team_ids.indexOf(teamID)
        if (teamIndex > -1) foundAgeGroup.team_ids.splice(teamIndex, 1)
        foundTeam.tournaments = foundTeam.tournaments.filter(({ id }) => id.toString() === tournamentID)

        foundTeam.save()
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async removeTeamsFromAgeGroupInTournament(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const tournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!tournament) throw new Error('Unable to find tournament with that ID')
        assert(isSameAsContext(context, tournament.owner.toHexString()))
        const foundAgeGroup = tournament.age_groups.find(({ _id }) => _id.toString() === ageGroupID)
        if (!foundAgeGroup) throw new Error('Unable to find age group with that ID')
        const teamsToRemove = foundAgeGroup.team_ids
        foundAgeGroup.team_ids = []
        await TeamSchema.update({ _id: { $in: teamsToRemove } }, { $pull: { 'tournaments.id': tournamentID } })
        tournament.markModified('age_groups')
        tournament.save()
        return tournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async generateBracket(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID', { nullable: true }) ageGroupID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Cannot find tournament with that ID')
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        if (!ageGroupID) {
            const invalidAgeGroups = []
            await Promise.all(
                foundTournament.age_groups.map(async (ageGroup, index) => {
                    ageGroup.registration_closed = true
                    const { team_ids: teamIDs = [], guest_teams: guestTeams = [] } = ageGroup
                    if (teamIDs.length + guestTeams.length > 2) {
                        if (!ageGroup.pools && ageGroup.has_brackets) {
                            const full_challonge_url = await CreateChallongeTournament(
                                foundTournament.toObject(),
                                ageGroup.toObject()
                            )
                            console.log(guestTeams)
                            const participants = await CreateChallongeParticipants({ teamIDs, guestTeams, context })
                            if (participants.length == 0) {
                                invalidAgeGroups.push(index)
                                return null
                            }
                            console.log('participants', participants)
                            await AddChallongeParticipants(
                                foundTournament.toObject(),
                                generatePartialUrl(foundTournament.toObject(), ageGroup._id.toString()),
                                participants
                            )
                            return full_challonge_url
                        }
                    } else invalidAgeGroups.push(index)
                    return null
                })
            )
            invalidAgeGroups.forEach((index) => foundTournament.age_groups.splice(index, 1))
            if (foundTournament.age_groups.length == 0) {
                foundTournament.remove()
                // TODO return tournament to client even if deleted?
                return foundTournament.toObject()
            }
        } else {
            const ageGroup = foundTournament.age_groups.find((ageGroup) => ageGroup._id.toString() == ageGroupID)
            ageGroup.has_pools_finished = true
            const { team_ids: teamIDs = [], guest_teams: guestTeams = [] } = ageGroup
            if (ageGroup.has_brackets) {
                await CreateChallongeTournament(foundTournament.toObject(), ageGroup.toObject())
                const participants = await CreateChallongeParticipants({ teamIDs, guestTeams, context })
                if (participants.length == 0) {
                    foundTournament.age_groups = foundTournament.age_groups.filter(
                        (ageGroup) => ageGroup._id.toString() != ageGroupID
                    )
                    foundTournament.markModified('age_groups')
                    // foundTournament.registration_closed = true
                    foundTournament.save()
                    return foundTournament.toObject()
                }
                await AddChallongeParticipants(
                    foundTournament.toObject(),
                    generatePartialUrl(foundTournament.toObject(), ageGroup._id.toString()),
                    participants
                )
            }
        }
        foundTournament.markModified('age_groups')
        foundTournament.registration_closed = true
        foundTournament.save()
        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async generateBracketFromPool(
        @Args() input: GenerateBracketFromPoolInput,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const { ageGroupID, tournamentID, participants } = input
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Cannot find tournament with that ID')
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => _id.toString() === ageGroupID)
        if (!foundAgeGroup) throw new Error('Cannot find Age group with that ID')
        const full_challonge_url = await CreateChallongeTournament(foundTournament.toObject(), foundAgeGroup.toObject())
        const formattedParticipants = participants.map((participant) => {
            const { name, id, poolPlayIndex } = participant
            return { name, misc: id, seed: poolPlayIndex + 1 }
        })
        if (formattedParticipants.length == 0) {
            foundTournament.age_groups.splice(
                foundTournament.age_groups.findIndex(({ _id }) => _id.toString() === ageGroupID),
                1
            )
            foundTournament.markModified('age_groups')
            foundTournament.save()
            return foundTournament.toObject()
        }
        await AddChallongeParticipants(
            foundTournament.toObject(),
            generatePartialUrl(foundTournament.toObject(), ageGroupID),
            formattedParticipants
        )
        foundAgeGroup.has_pools_finished = true
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return foundTournament.toObject()
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteChallongeTournament(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Ctx() context: Context,
        @Arg('ageGroup', { nullable: true }) ageGroup?: string,
        @Arg('classification', { nullable: true }) classification?: string,
        @Arg('url', { nullable: true }) url?: string
    ): Promise<boolean> {
        if (tournamentID && ageGroupID) {
            const foundTournament = await context.loaders.tournament.leanDataLoader.load(tournamentID)
            assert(isSameAsContext(context, foundTournament.owner.toHexString()))
            return await DeleteChallongeTournament(generatePartialUrl(foundTournament, ageGroupID))
        }
        if (url) return await DeleteChallongeTournament(url)
        return await DeleteChallongeTournament(`${tournamentID}_${ageGroup}_${classification}`)
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async finishBracketForTournament(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => _id.toString() === ageGroupID)
        if (!foundAgeGroup) throw new Error('Cannot find Age group with that ID')
        foundAgeGroup.has_brackets_finished = true
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return foundTournament.toObject()
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteTournament(@Arg('tournamentID') tournamentID: string, @Ctx() context: Context): Promise<boolean> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) return true
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        foundTournament.remove()
        const foundOwner = await context.loaders.user.dataLoader.load(foundTournament.owner.toHexString())
        foundOwner.tournaments = foundOwner.tournaments.filter((id) => id.toString() !== foundTournament._id.toString())
        foundOwner.save()
        let teamIDs = []
        let poolPlayIDs = []
        let guestTeamIDs = []
        await Promise.all(
            foundTournament.age_groups.map(async (ageGroup) => {
                const { _id, team_ids, pool_play_ids, guest_teams } = ageGroup
                teamIDs = teamIDs.concat(team_ids)
                poolPlayIDs = poolPlayIDs.concat(pool_play_ids)
                guestTeamIDs = guestTeamIDs.concat(guest_teams.map(({ _id }) => _id))
                await DeleteChallongeTournament(generatePartialUrl(foundTournament, _id.toString()))
            })
        )
        await TeamSchema.updateMany({ _id: { $in: teamIDs } }, { $pull: { tournaments: { id: foundTournament._id } } })
        await PoolPlaySchema.deleteMany({ _id: { $in: poolPlayIDs } })
        await EventSchema.deleteMany({ tournamentID: foundTournament._id })
        await GuestTeamSchema.deleteMany({ _id: { $in: guestTeamIDs } })
        return true
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async snapshotTeamForTournament(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Arg('teamID') teamID: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) return true
        assert(isSameAsContext(context, foundTournament.owner.toHexString()))
        const foundAgeGroupIndex = foundTournament.age_groups.findIndex(({ _id }) => _id.toString() == ageGroupID)
        if (foundAgeGroupIndex == -1) return false
        const foundTeamIndex = foundTournament.age_groups[foundAgeGroupIndex].snapshot_teams.findIndex(
            ({ _id }) => _id.toString() == teamID
        )
        if (foundTeamIndex == -1) return false
        const foundTeam = await context.loaders.team.leanDataLoader.load(teamID)
        if (!foundTeam) return false
        const userIDs = []
        foundTeam.users.forEach((user) => {
            if (user.accepted) userIDs.push(user.id)
        })
        const foundUsers = await context.loaders.user.leanDataLoader.loadMany(userIDs)
        const teamToAdd = { ...foundTeam, users: foundUsers, snapshotted_at: new Date().toISOString() }
        foundTournament.age_groups[foundAgeGroupIndex].snapshot_teams[foundTeamIndex] = teamToAdd
        foundTournament.markModified('age_groups')
        foundTournament.save()
        return true
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async registerRefToTournament(
        @Arg('refID') refID: string,
        @Arg('tournamentID') tournamentID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('No tournament found with that ID')
        const foundRef = await context.loaders.user.dataLoader.load(refID)
        if (!foundRef) throw new Error('No ref found with that ID')
        const refAlreadyInTournament = foundTournament.referees.includes(refID)
        if (!refAlreadyInTournament) foundTournament.referees.push(refID)
        const tournamentAlreadyInRef = foundRef.tournaments.includes(new ObjectId(tournamentID))
        if (!tournamentAlreadyInRef) foundRef.tournaments.push(new ObjectId(tournamentID))
        foundTournament.save()
        foundRef.save()
        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async unregisterRefFromTournament(
        @Arg('refID') refID: string,
        @Arg('tournamentID') tournamentID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('No tournament found with that ID')
        const foundRef = await context.loaders.user.dataLoader.load(refID)
        if (!foundRef) throw new Error('No ref found with that ID')
        assert(!foundTournament.registration_closed, 'Unable to remove ref after registration is closed.')
        const refIndex = foundTournament.referees.indexOf(refID)
        if (refIndex > -1) foundTournament.referees.splice(refIndex, 1)
        const tournamentIndex = foundRef.tournaments.indexOf(new ObjectId(tournamentID))
        if (tournamentIndex > -1) foundRef.tournaments.splice(tournamentIndex, 1)
        foundTournament.save()
        foundRef.save()
        return foundTournament.toObject()
    }
}
