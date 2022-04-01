import { Field, ObjectType } from 'type-graphql'
@ObjectType()
export class ConsumableReceiptDto {
    @Field()
    order_id: string

    @Field()
    purchased_at: string

    @Field({ nullable: true })
    token: string
}

@ObjectType()
export class ConsumableDto {
    @Field()
    sku: string

    @Field({ defaultValue: 0 })
    count: number

    @Field(() => [ConsumableReceiptDto])
    receipts: ConsumableReceiptDto[]
}
