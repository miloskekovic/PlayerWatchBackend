import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import { Context } from '../../../../utils/Context.interface'
import SubscriptionDto from '../Subscription.dto'
import SubscriptionSchema from '../Subscription.schema'

@Resolver(() => SubscriptionDto)
export default class SchoolQueries {
    @Query(() => [SubscriptionDto])
    @UseMiddleware(IsAuth)
    async getSubscriptions(@Ctx() context: Context): Promise<SubscriptionDto[]> {
        const foundSchools = await SubscriptionSchema.find({}).lean()
        for (const school of foundSchools) context.loaders.school.leanDataLoader.prime(school._id, school)
        return foundSchools
    }

    // @Query(() => SubscriptionDto)
    // @UseMiddleware(IsAuth)
    // async getSubscriptionByID(@Arg('id') id: string, @Ctx() context: Context): Promise<SubscriptionDto> {
    //     return await context.loaders.school.leanDataLoader.load(id)
    // }

    // @Mutation(() => SubscriptionDto)
    // @UseMiddleware(IsAuth)
    // async createSubscription(@Arg('id') id: string, @Ctx() context: Context): Promise<SubscriptionDto> {
    //     return await SubscriptionSchema.create(id).lean()
    // }
}
