import { Field, ObjectType } from 'type-graphql'

import { UserDto } from '../User.dto'

@ObjectType()
class AcceptedFanDto {
    @Field(() => [UserDto])
    Guardian: UserDto[]

    @Field(() => [UserDto])
    Other: UserDto[]
}

@ObjectType()
export class GetFansDto {
    @Field(() => AcceptedFanDto)
    accepted: AcceptedFanDto

    @Field(() => [UserDto])
    pending: UserDto[]
}
