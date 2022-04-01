import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../User.dto'

@ObjectType()
export class GetFollowingDto {
    @Field(() => [UserDto])
    accepted: UserDto[]

    @Field(() => [UserDto])
    pending: UserDto[]
}
