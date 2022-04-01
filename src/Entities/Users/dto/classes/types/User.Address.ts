import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('CreateAddressInput')
export class Address {
    @Field({ nullable: true })
    city: string

    @Field({ nullable: true })
    state: string

    @Field({ nullable: true })
    street: string

    @Field({ nullable: true })
    zip: number
}

@InputType('AddressInput')
export class AddressInput implements Address {
    @Field({ nullable: true })
    city: string

    @Field({ nullable: true })
    state: string

    @Field({ nullable: true })
    street: string

    @Field({ nullable: true })
    zip: number
}
