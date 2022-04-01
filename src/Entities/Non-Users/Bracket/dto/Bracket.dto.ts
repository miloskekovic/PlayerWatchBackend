/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@ArgsType()
@InputType('BracketGameInput')
export default class BracketGameDto {
    @Field()
    _id: string

    @Field()
    time: string

    @Field({ nullable: true })
    date: string

    @Field({ nullable: true })
    park?: string

    @Field({ nullable: true })
    field?: string

    @Field(() => [String], { nullable: true })
    referees?: string[]

    @Field()
    challonge_id: number
}
