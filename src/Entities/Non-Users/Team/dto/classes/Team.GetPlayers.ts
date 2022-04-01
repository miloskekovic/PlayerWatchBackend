import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../../../../Users/dto/User.dto'

@ObjectType()
export class GetPlayersDto {
    @Field(() => [UserDto])
    pending: UserDto[]

    @Field(() => [UserDto])
    accepted: UserDto[]
}
