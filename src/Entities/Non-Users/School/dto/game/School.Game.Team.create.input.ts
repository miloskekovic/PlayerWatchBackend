import { InputType, Field } from 'type-graphql'

@InputType()
export default class SchoolGameTeamInput {
    @Field({ nullable: true })
    _id?: string

    @Field()
    name: string

    @Field({ nullable: true })
    thumbnail: string

    @Field()
    in_app: boolean
}
