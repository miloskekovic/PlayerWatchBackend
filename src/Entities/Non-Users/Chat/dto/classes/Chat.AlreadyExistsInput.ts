import { ArgsType, Field, ObjectType } from 'type-graphql'

@ObjectType()
@ArgsType()
export default class ChatAlreadyExistsInputDto {
    @Field(() => [String])
    users: string[]
}
