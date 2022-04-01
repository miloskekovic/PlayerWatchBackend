import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export default class SchoolGameTeamDto {
    @Field({ nullable: true })
    _id?: string

    @Field({ nullable: true })
    name: string

    @Field({ nullable: true })
    thumbnail: string

    @Field()
    in_app: boolean
}
