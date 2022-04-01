import { FolderInputDto } from './../dto/classes/types/FolderDto'
import { ObjectId } from 'mongodb'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

import { Context } from '../../../../utils/Context.interface'
import TournamentDto from '../../Tournament/dto/Tournament.dto'
import { CreateTeamInput, UpdateTeamInput } from '../dto/classes'
import TeamDto from '../dto/Team.dto'
import { GuestTeamInputDto } from '../dto/Team.guest.dto'
import GuestTeamSchema from '../schema/Team.guest.schema'
import TeamSchema from '../schema/Team.schema'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { ConfirmsTeams } from '../dto/classes/Team.CreateInput'

@Resolver()
export class TeamMutationResolver {
    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async createTeam(@Arg('team') input: CreateTeamInput, @Ctx() context: Context): Promise<TeamDto> {
        const owner = await context.loaders.user.dataLoader.load(input.owner)
        if (!owner) throw new Error('Error loading owner')
        const created = await TeamSchema.create(input)
        if (!created) throw new Error('Error creating team')
        owner.teams.push({ id: created._id, accepted: true })
        owner.save()
        return created.toObject()
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async updateTeam(@Arg('team') team: UpdateTeamInput): Promise<TeamDto> {
        return await TeamSchema.findByIdAndUpdate(team._id, { $set: team }, { new: true })
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async addUserToTeam(
        @Arg('teamID') teamID: string,
        @Arg('userID') userID: string,
        @Arg('accepted', { defaultValue: false }) accepted: boolean,
        @Ctx() context: Context
    ): Promise<TeamDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)

        const foundUserOnTeam = foundTeam.users.find(({ id }) => id.toString() === userID)
        if (foundUserOnTeam) foundUserOnTeam.accepted = accepted
        else foundTeam.users.push({ id: new ObjectId(userID), accepted })
        foundTeam.save()

        const foundTeamInUser = foundUser.teams.find(({ id }) => id.toString() === teamID)
        if (foundTeamInUser) foundTeamInUser.accepted = accepted
        else foundUser.teams.push({ id: new ObjectId(teamID), accepted })
        foundUser.save()

        return foundTeam.toObject()
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async removeUserFromTeam(
        @Arg('teamID') teamID: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context
    ): Promise<TeamDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        const foundUser = await context.loaders.user.dataLoader.load(userID)

        foundTeam.users = foundTeam.users.filter(({ id }) => id.toString() !== userID)
        foundTeam.save()

        foundUser.teams = foundUser.teams.filter(({ id }) => id.toString() !== teamID)
        foundUser.save()

        return foundTeam.toObject()
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async addAdminToTeam(
        @Arg('teamID') teamID: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context
    ): Promise<TeamDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        const foundAdminIndex = foundTeam.admins.findIndex((admin) => admin.toString() == userID)
        if (foundAdminIndex > -1) foundTeam.admins.push(new ObjectId(userID))
        const foundTeamIndex = foundUser.teams.findIndex((team) => team.id.toString() == userID)
        if (foundTeamIndex > -1) foundUser.teams.push({ id: new ObjectId(teamID), accepted: true })
        foundUser.save()
        foundTeam.save()
        return foundTeam.toObject()
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async removeAdminFromTeam(
        @Arg('teamID') teamID: string,
        @Arg('userID') userID: string,
        @Ctx() context: Context
    ): Promise<TeamDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        foundTeam.admins = foundTeam.admins.filter((admin) => admin.toString() != userID)
        foundUser.teams = foundUser.teams.filter((team) => team.id.toString() != userID)
        foundUser.save()
        foundTeam.save()
        return foundTeam.toObject()
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteTeam(@Arg('teamID') teamID: string, @Ctx() context: Context): Promise<boolean> {
        // TODO actually delete the team? handle tournaments/games
        const foundTeam = await context.loaders.team.leanDataLoader.load(teamID)
        const foundOwner = await context.loaders.user.dataLoader.load(foundTeam.owner.toHexString())
        const foundPlayers = (
            await context.loaders.user.dataLoader.loadMany(foundTeam.users.map((user) => user.id.toHexString()))
        ).filter((item) => item)
        const foundAdmins = (
            await context.loaders.user.dataLoader.loadMany(foundTeam.admins.map((admin) => admin.toHexString()))
        ).filter((item) => item)
        foundOwner.teams = foundOwner.teams.filter((team) => team.id.toString() != teamID)
        foundPlayers.forEach((player) => {
            player.teams = player.teams.filter((team) => team.id.toString() != teamID)
            player.save()
        })
        foundAdmins.forEach((admin) => {
            admin.teams = admin.teams.filter((team) => team.id.toString() != teamID)
            admin.save()
        })
        foundOwner.save()
        return true
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async createGuestTeam(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Arg('guestTeam') guestTeam: GuestTeamInputDto,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Unable to find a tournament with that ID.')
        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => _id.toString() === ageGroupID)
        if (!foundAgeGroup) throw new Error('Unable to find an age group with that ID.')
        const createdTeam = (await GuestTeamSchema.create(guestTeam)).toObject()
        if (!createdTeam) throw new Error('Unable to create guest team.')
        if (foundAgeGroup.guest_teams) foundAgeGroup.guest_teams.push(createdTeam)
        else foundAgeGroup.guest_teams = [createdTeam]
        foundTournament.markModified('age_groups')
        foundTournament.save()

        return foundTournament.toObject()
    }

    @Mutation(() => TournamentDto)
    @UseMiddleware(IsAuth)
    async removeGuestTeam(
        @Arg('tournamentID') tournamentID: string,
        @Arg('ageGroupID') ageGroupID: string,
        @Arg('guestTeamID') guestTeamID: string,
        @Ctx() context: Context
    ): Promise<TournamentDto> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentID)
        if (!foundTournament) throw new Error('Unable to find a tournament with that ID.')
        const foundAgeGroup = foundTournament.age_groups.find(({ _id }) => _id.toString() === ageGroupID)
        if (!foundAgeGroup) throw new Error('Unable to find an age group with that ID.')
        foundAgeGroup.guest_teams = foundAgeGroup.guest_teams.filter(({ _id }) => _id.toString() !== guestTeamID)
        await GuestTeamSchema.findByIdAndDelete(guestTeamID)
        foundTournament.markModified('age_groups')
        foundTournament.save()

        return foundTournament.toObject()
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async createTeamFolder(
        @Arg('teamID') teamID: string,
        @Arg('name') name: string,
        @Ctx() context: Context,
        @Arg('thumbnail', { nullable: true }) thumbnail?: string
    ): Promise<TeamDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        if (!foundTeam) throw new Error('Unable to find a team with that ID.')
        foundTeam.folders.push({ _id: new ObjectId(), name, urls: [], thumbnail })
        foundTeam.markModified('folders')
        foundTeam.save()
        return foundTeam.toObject()
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async updateTeamFolder(
        @Arg('teamID') teamID: string,
        @Arg('folder') newFolder: FolderInputDto,
        @Ctx() context: Context
    ): Promise<TeamDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        if (!foundTeam) throw new Error('Unable to find a team with that ID.')
        foundTeam.folders = foundTeam.folders.map((folder) => {
            if (newFolder._id.toString() == folder._id.toString()) return newFolder
            else return folder
        })
        foundTeam.markModified('folders')
        foundTeam.save()
        return foundTeam.toObject()
    }

    @Mutation(() => TeamDto)
    @UseMiddleware(IsAuth)
    async deleteTeamFolder(
        @Arg('teamID') teamID: string,
        @Arg('folderID') folderID: string,
        @Ctx() context: Context
    ): Promise<TeamDto> {
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        if (!foundTeam) throw new Error('Unable to find a team with that ID.')
        foundTeam.folders = foundTeam.folders.filter(({ _id }) => folderID !== _id.toString())
        foundTeam.markModified('folders')
        foundTeam.save()
        return foundTeam.toObject()
    }

    @Mutation(() => Boolean)
    async confirmTeamPaid(
        @Arg('tournamentId') tournamentId: string,
        @Arg('ageGroupId') ageGroupId: string,
        @Arg('teamID') teamID: string,
        @Arg('isPaid') isPaid: boolean,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentId)
        if (!foundTournament) throw new Error('Unable to find a tournament with that ID.')
        const ageGroupIndex = foundTournament.age_groups.findIndex(({ _id }) => _id.toString() == ageGroupId)
        if (ageGroupIndex === null) throw new Error('Unable to find a age group with that ID.')
        const guestTeamIndex = foundTournament.age_groups[ageGroupIndex].guest_teams.findIndex(
            ({ _id }) => _id.toString() == teamID
        )
        if (guestTeamIndex >= 0) foundTournament.age_groups[ageGroupIndex].guest_teams[guestTeamIndex].paid = isPaid
        const snappshotTeamIndex = foundTournament.age_groups[ageGroupIndex].snapshot_teams.findIndex(
            ({ _id }) => _id.toString() == teamID
        )
        console.log('snappshotTeamIndex', snappshotTeamIndex)
        if (snappshotTeamIndex >= 0)
            foundTournament.age_groups[ageGroupIndex].snapshot_teams[snappshotTeamIndex].paid = isPaid
        foundTournament.markModified('age_groups')
        await foundTournament.save()
        return true
    }

    @Mutation(() => Boolean)
    async confirmTeamsPaid(
        @Arg('tournamentId') tournamentId: string,
        @Arg('ageGroupId') ageGroupId: string,
        @Arg('teams') teams: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentId)
        if (!foundTournament) throw new Error('Unable to find a tournament with that ID.')
        const ageGroupIndex = foundTournament.age_groups.findIndex(({ _id }) => _id.toString() == ageGroupId)
        if (ageGroupIndex === null) throw new Error('Unable to find a age group with that ID.')
        const parsedTeams: Array<{ id: string; paid: boolean }> = JSON.parse(teams)
        parsedTeams.forEach(({ id: teamID, paid: isPaid }) => {
            const guestTeamIndex = foundTournament.age_groups[ageGroupIndex].guest_teams.findIndex(
                ({ _id }) => _id.toString() == teamID
            )
            console.log('guest_teams', foundTournament.age_groups[ageGroupIndex].guest_teams)
            console.log('guestTeamIndex', guestTeamIndex)
            if (guestTeamIndex >= 0) foundTournament.age_groups[ageGroupIndex].guest_teams[guestTeamIndex].paid = isPaid
            const snappshotTeamIndex = foundTournament.age_groups[ageGroupIndex].snapshot_teams.findIndex(
                ({ _id }) => _id.toString() == teamID
            )
            if (snappshotTeamIndex >= 0)
                foundTournament.age_groups[ageGroupIndex].snapshot_teams[snappshotTeamIndex].paid = isPaid
        })

        foundTournament.markModified('age_groups')
        await foundTournament.save()
        return true
    }

    @Query(() => Boolean)
    async isTeamPaid(
        @Arg('tournamentId') tournamentId: string,
        @Arg('ageGroupId') ageGroupId: string,
        @Arg('teamID') teamID: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundTournament = await context.loaders.tournament.dataLoader.load(tournamentId)
        if (!foundTournament) throw new Error('Unable to find a tournament with that ID.')
        const ageGroupIndex = foundTournament.age_groups.findIndex(({ _id }) => _id.toString() == ageGroupId)
        if (ageGroupIndex === null) throw new Error('Unable to find a age group with that ID.')
        const guestTeamIndex = foundTournament.age_groups[ageGroupIndex].guest_teams.findIndex(
            ({ _id }) => _id.toString() == teamID
        )
        if (guestTeamIndex >= 0 && foundTournament.age_groups[ageGroupIndex].guest_teams[guestTeamIndex].paid)
            return true
        const snappshotTeamIndex = foundTournament.age_groups[ageGroupIndex].snapshot_teams.findIndex(
            ({ _id }) => _id.toString() == teamID
        )
        if (
            snappshotTeamIndex >= 0 &&
            foundTournament.age_groups[ageGroupIndex].snapshot_teams[snappshotTeamIndex].paid
        )
            return true
        return false
    }
}
