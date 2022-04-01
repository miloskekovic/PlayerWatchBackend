import { ObjectType, Field, InputType } from 'type-graphql'

@ObjectType()
@InputType('ReceiptInput')
export default class ReceiptDto {
    @Field()
    sku: string

    @Field()
    token: string
}
