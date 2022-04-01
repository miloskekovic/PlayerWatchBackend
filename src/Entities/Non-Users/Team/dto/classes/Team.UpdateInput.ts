import { ArgsType, Field, InputType } from 'type-graphql'

@ArgsType()
@InputType()
export class UpdateTeamInput {
    @Field()
    _id: string

    @Field({ nullable: true })
    name: string

    @Field({ nullable: true })
    description: string

    @Field({ nullable: true })
    age_group: string

    @Field({ nullable: true })
    classification: string

    @Field({ nullable: true })
    thumbnail: string

    @Field({ nullable: true })
    sport: string

    @Field({ nullable: true })
    school_id: string
}
