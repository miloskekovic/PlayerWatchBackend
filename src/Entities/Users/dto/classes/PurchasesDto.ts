import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ConsumableDto {
    @Field()
    productID: string

    @Field()
    count: number
}

@ObjectType()
export class PurchasesDto {
    @Field(() => [String])
    subscriptions: string[]

    @Field(() => [ConsumableDto])
    consumables: ConsumableDto[]
}
