/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ArgsType } from 'type-graphql'
import { UpdateEntityInput } from '../../../Generic/dto/classes/index'
// import { BugUser } from "./types/index";

@ArgsType()
@InputType('UpdateBugInput')
export class UpdateBugInput extends UpdateEntityInput {
    @Field({ nullable: true })
    message: string

    @Field({ nullable: true })
    date: string

    @Field({ nullable: true })
    category: string

    @Field({ nullable: true })
    email: string

    @Field({ nullable: true })
    first_name: string

    @Field({ nullable: true })
    last_name: string
}
