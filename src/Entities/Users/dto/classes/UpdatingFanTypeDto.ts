import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export default class UpdatedFanTypeDto {
    @Field()
    userID: string

    @Field()
    fanID: string

    @Field({ nullable: true })
    fanType: string
}
