import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export default class UpdatedFanDto {
    @Field()
    userID: string

    @Field()
    fanID: string
}
