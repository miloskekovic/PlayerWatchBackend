import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../../../../Users/dto/User.dto'

@ObjectType()
export class GetTeamUsers {
    @Field(() => [UserDto])
    accepted: UserDto[]

    @Field(() => [UserDto])
    pending: UserDto[]
}
