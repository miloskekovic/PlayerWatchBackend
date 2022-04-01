import assert = require('assert')
import { Arg, Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import isSameAsContext from '../../../../Non-Entities/Authentication/isSameAsContext'

import { Context } from '../../../../utils/Context.interface'
import { UserDto } from '../../../Users/dto/User.dto'
import PhotographDto from '../dto/Photograph.dto'
import CreatePhotograph from '../inputs/Photograph.create'
import UpdatePhotograph from '../inputs/Photograph.update'
import PhotographSchema from '../Photograph.schema'
import VideoSchema from '../schema/Video.schema'

@Resolver()
export class PhotographMutationResolver {
    @Mutation(() => PhotographDto)
    @UseMiddleware(IsAuth)
    async createPhotograph(
        @Arg('photograph') input: CreatePhotograph,
        @Ctx() context: Context
    ): Promise<PhotographDto> {
        isSameAsContext(context, input.owner._id)
        // TODO put photos in user?
        const createdPhoto = await PhotographSchema.create(input)
        if (input.school_id) {
            assert(input.game_id, 'If a school_id is passed, a game_id should also be passed.')
            const foundSchool = await context.loaders.school.dataLoader.load(input.school_id)
            const foundGame = foundSchool.games.find((game) => game._id.toHexString() == input.game_id)
            foundGame.photograph_ids.push(createdPhoto._id)
            foundSchool.markModified('games')
            foundSchool.save()
        }
        // TODO put photos in team?
        return createdPhoto.toObject()
    }

    @Mutation(() => PhotographDto)
    @UseMiddleware(IsAuth)
    async updatePhotograph(
        @Arg('userID') userID: string,
        @Arg('photograph') input: UpdatePhotograph,
        @Ctx() context: Context
    ): Promise<PhotographDto> {
        isSameAsContext(context, userID)
        return await PhotographSchema.findByIdAndUpdate(input._id, { $set: input }, { new: true }).lean()
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deletePhotograph(
        @Arg('userID') userID: string,
        @Arg('photograph') input: CreatePhotograph,
        @Ctx() context: Context
    ): Promise<boolean> {
        isSameAsContext(context, userID)
        const foundPhoto = await context.loaders.photograph.dataLoader.load(input._id)
        if (foundPhoto.school_id) {
            const foundSchool = await context.loaders.school.dataLoader.load(input.school_id)
            const foundGame = foundSchool.games.find((game) => game._id.toHexString() == input.game_id)
            const foundIndex = foundGame.photograph_ids.findIndex((photoID) => photoID == input._id)
            if (foundIndex > -1) foundGame.photograph_ids.splice(foundIndex, 1)
            foundSchool.markModified('games')
            foundSchool.save()
        }
        return true
    }
}
