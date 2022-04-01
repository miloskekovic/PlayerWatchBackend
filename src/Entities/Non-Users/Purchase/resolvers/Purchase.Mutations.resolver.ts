import { Args, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { IsAuth } from '../../../../Non-Entities/Authentication/isAuth'
import isSameAsContext from '../../../../Non-Entities/Authentication/isSameAsContext'
import { Context } from '../../../../utils/Context.interface'
import { PurchaseInputDto } from '../dto/Purchase.Create'

@Resolver()
export default class PurchaseMutationsResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async saveReceipt(@Args() input: PurchaseInputDto, @Ctx() context: Context): Promise<boolean> {
        const { userID, platform, purchase } = input
        if (!isSameAsContext(context, userID)) return false
        console.log(purchase)
        return true
    }
}
