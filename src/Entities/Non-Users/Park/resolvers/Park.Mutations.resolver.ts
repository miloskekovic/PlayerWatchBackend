import { Arg, Mutation, Resolver, Ctx, UseMiddleware } from 'type-graphql'

import { CreateParkInput, UpdateParkInput } from '../dto/classes'
import ParkDto from '../dto/Park.dto'
import ParkSchema from '../schema/Park.schema'
import { Context } from '../../../../utils/Context.interface'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'

@Resolver()
export class ParkMutationResolver {
    @Mutation(() => ParkDto)
    @UseMiddleware(IsAuth)
    async createPark(@Arg('park') input: CreateParkInput, @Ctx() context: Context): Promise<ParkDto> {
        const foundUser = await context.loaders.user.dataLoader.load(input.owner)
        if (!foundUser) throw new Error('Unable to find a user with that ID')
        const created = await ParkSchema.create(input)
        foundUser.parks.push(created._id)
        foundUser.save()
        return created.toObject()
    }

    @Mutation(() => ParkDto)
    @UseMiddleware(IsAuth)
    async updatePark(@Arg('park') input: UpdateParkInput): Promise<ParkDto> {
        const { _id, ...rest } = input
        return await ParkSchema.findByIdAndUpdate(_id, { $set: rest }, { new: true })
    }
}
