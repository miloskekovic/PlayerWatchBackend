import { Field, InputType, ObjectType } from 'type-graphql'
import { Types } from 'mongoose'

@ObjectType()
export class GuestTeamDto {
    @Field(() => String)
    _id: Types.ObjectId

    @Field()
    name: string

    @Field({ nullable: true })
    thumbnail: string

    @Field({ nullable: true })
    paid: boolean
}

@InputType('GuestTeamDtoInput')
export class GuestTeamInputDto {
    @Field()
    name: string

    @Field({ nullable: true })
    thumbnail: string

    _id: Types.ObjectId
}

@InputType('UpdateGuestTeamInput')
export class UpdateGuestTeamInputDto {
    @Field()
    name: string

    @Field({ nullable: true })
    thumbnail: string

    @Field()
    _id: string
}
