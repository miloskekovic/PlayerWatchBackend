import { Types } from 'mongoose'
import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'

@ArgsType()
@InputType()
export class CreateTeamInput {
    @Field()
    name: string

    @Field({ nullable: true })
    description?: string

    @Field(() => String)
    owner: string

    @Field()
    age_group: string

    @Field({ nullable: true })
    classification: string

    @Field({ nullable: true })
    thumbnail: string

    @Field({ nullable: true })
    school_id: string

    @Field()
    sport: string
}
