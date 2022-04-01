import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import LivestreamScheduleMutation from '../../LivestreamSchedule/resolvers/LivestreamSchedule.Mutations.resolver'
import CreateSchoolFieldDto from '../dto/field/School.Field.Create'
import SchoolFieldDto from '../dto/field/School.Field.dto'
import UpdateSchoolFieldDto from '../dto/field/School.Field.Update'
import CreateSchoolGame from '../dto/game/School.Game.Create'
import SchoolGameDto from '../dto/game/School.Game.dto'
import UpdateSchoolGameDto from '../dto/game/School.Game.Update'
import CreateSchoolDto from '../dto/School.Create.Dto'
import SchoolDto from '../dto/School.dto'
import UpdateSchoolDto from '../dto/School.Update.dto'
import SchoolSchema from '../School.schema'
import assert = require('assert')
import moment = require('moment')
import isSameAsContext from '../../../../Non-Entities/Authentication/isSameAsContext'
import { allowedUsers } from './School.Game.Queries.resolver'
@Resolver()
export default class SchoolMutations {
    @Mutation(() => SchoolDto)
    @UseMiddleware(IsAuth)
    async createSchool(@Arg('school') school: CreateSchoolDto): Promise<SchoolDto> {
        return await SchoolSchema.create(school)
    }

    @Mutation(() => SchoolDto, { nullable: true })
    @UseMiddleware(IsAuth)
    async updateSchool(@Arg('school') school: UpdateSchoolDto): Promise<SchoolDto> {
        return await SchoolSchema.findByIdAndUpdate(school._id, { $set: school }, { new: true }).lean()
    }

    @Mutation(() => SchoolGameDto)
    @UseMiddleware(IsAuth)
    async createSchoolGame(
        @Arg('schoolID') schoolID: string,
        @Arg('game') game: CreateSchoolGame,
        @Arg('userId') userId: string,
        @Ctx() context: Context
    ): Promise<SchoolGameDto> {
        assert(moment(game.start_iso).isBefore(moment(game.end_iso)))
        if (!allowedUsers.includes(userId)) return null
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const arrayLength = foundSchool.games.push(game)
        const scheduler = new LivestreamScheduleMutation()
        const createdGame = foundSchool.games[arrayLength - 1]
        const foundField = foundSchool.fields.find((field) => field._id.toHexString() == game.field_id)
        if (game.away_team.in_app) {
            const foundAwayTeam = await context.loaders.team.dataLoader.load(game.away_team._id)
            foundAwayTeam.streams.push({ school_id: foundSchool._id.toHexString(), id: createdGame._id.toHexString() })
            foundAwayTeam.save()
        }
        if (game.home_team.in_app) {
            const foundHomeTeam = await context.loaders.team.dataLoader.load(game.home_team._id)
            foundHomeTeam.streams.push({ school_id: foundSchool._id.toHexString(), id: createdGame._id.toHexString() })
            foundHomeTeam.save()
        }

        await Promise.all(
            foundField.cameras.map(async (camera) => {
                return await scheduler.createNewLivestreamSchedule({
                    channelId: camera.channelId,
                    startTime: game.start_iso,
                    endTime: game.end_iso,
                    cameraId: camera._id.toHexString(),
                    fieldId: game.field_id,
                    schoolId: schoolID,
                })
            })
        )

        foundSchool.save()
        return foundSchool.games[arrayLength - 1]
    }

    @Mutation(() => SchoolGameDto)
    @UseMiddleware(IsAuth)
    async updateSchoolGame(
        @Arg('schoolID') schoolID: string,
        @Arg('game') game: UpdateSchoolGameDto,
        @Ctx() context: Context
    ): Promise<SchoolGameDto> {
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const { _id: gameID, ...rest } = game
        const foundGameIndex = foundSchool.games.findIndex(({ _id }) => _id.toString() == gameID.toString())
        foundSchool.games[foundGameIndex] = { ...foundSchool.games[foundGameIndex].toObject(), ...rest }
        foundSchool.save()
        return foundSchool.games[foundGameIndex]
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteSchoolGame(
        @Arg('schoolID') schoolID: string,
        @Arg('gameID') gameID: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const foundGameIndex = foundSchool.games.findIndex(({ _id }) => _id.toString() == gameID)
        if (foundGameIndex > -1) foundSchool.games.splice(foundGameIndex, 1)
        else return false
        foundSchool.save()
        return true
    }

    @Mutation(() => SchoolFieldDto)
    @UseMiddleware(IsAuth)
    async createSchoolField(
        @Arg('schoolID') schoolID: string,
        @Arg('field') field: CreateSchoolFieldDto,
        @Ctx() context: Context
    ): Promise<SchoolFieldDto> {
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const arrayLength = foundSchool.fields.push(field)
        foundSchool.save()
        return foundSchool.fields[arrayLength - 1]
    }

    @Mutation(() => SchoolFieldDto)
    @UseMiddleware(IsAuth)
    async addEmployeesToSchool(
        @Arg('schoolID') schoolID: string,
        @Arg('employeeIDs', () => [String]) employeeIDs: string[],
        @Ctx() context: Context
    ): Promise<SchoolFieldDto> {
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const foundUsers = await context.loaders.user.dataLoader.loadMany(employeeIDs)

        employeeIDs.forEach((id) => {
            if (!foundSchool.employee_ids.includes(id)) foundSchool.employee_ids.push(id)
        })

        foundUsers.forEach((user) => {
            user.school_id = foundSchool._id
            user.save()
        })

        foundSchool.save()
        return foundSchool.toObject()
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async updateSchoolField(
        @Arg('schoolID') schoolID: string,
        @Arg('field') field: UpdateSchoolFieldDto,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const { _id: fieldID, ...rest } = field
        const foundFieldIndex = foundSchool.fields.findIndex(({ _id }) => _id.toString() == fieldID.toString())
        foundSchool.fields[foundFieldIndex] = { ...foundSchool.fields[foundFieldIndex].toObject(), ...rest }
        foundSchool.save()
        return true
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteSchoolField(
        @Arg('schoolID') schoolID: string,
        @Arg('fieldID') fieldID: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const foundFieldIndex = foundSchool.fields.findIndex(({ _id }) => _id.toString() == fieldID)
        if (foundFieldIndex > -1) foundSchool.fields.splice(foundFieldIndex, 1)
        else return false
        foundSchool.save()
        return true
    }

    @Mutation(() => Boolean, {
        description:
            "Attempts to use a game ticket for a stream. Returns true if it was successful or if the user has already paid for this game, otherwise will throw an error. This will also add the userID to game's paid array if successful.",
    })
    @UseMiddleware(IsAuth)
    async useGameTicket(
        @Arg('schoolID') schoolID: string,
        @Arg('gameID') gameID: string,
        @Arg('userID') userID: string,
        @Arg('sku') sku: string,
        @Ctx() context: Context
    ): Promise<boolean> {
        if (!isSameAsContext(context, userID)) return false
        const foundSchool = await context.loaders.school.dataLoader.load(schoolID)
        const foundGameIndex = foundSchool.games.findIndex(({ _id }) => _id.toString() == gameID)
        assert(foundGameIndex > -1, 'Unable to find a game with that ID for the given school.')

        if (foundSchool.games[foundGameIndex].paid.includes(userID)) return true

        assert('stream_ticket_' + foundSchool.games[foundGameIndex].cost == sku, 'Sku and Price are not different')

        const foundUser = await context.loaders.user.dataLoader.load(userID)
        assert(foundUser, 'Unable to find user with that ID')
        const foundSkuIndex = foundUser.consumables.findIndex(
            (consumable) => consumable.sku == sku && consumable.count > 0
        )
        assert(foundSkuIndex > -1, 'Buy the ticket and try again.')

        foundUser.consumables[foundSkuIndex].count--
        foundUser.save()

        foundSchool.games[foundGameIndex].paid.push(foundUser._id)
        foundSchool.markModified('games')
        foundSchool.save()

        return true
    }
}
