import { IsIn } from 'class-validator'
import { ArgsType, Field, InputType } from 'type-graphql'
import ReceiptDto from './Reciept'

@InputType()
export class CreatePurchaseDto {
    @Field()
    productID: string

    @Field()
    purchaseToken: string

    @Field({ nullable: true })
    transactionReceipt?: ReceiptDto

    @Field()
    isSubscription: boolean
}

@ArgsType()
export class PurchaseInputDto {
    @Field()
    userID: string

    @Field(() => CreatePurchaseDto)
    purchase: CreatePurchaseDto

    @Field()
    @IsIn(['ios', 'android'])
    platform: string
}
