/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from 'type-graphql'

import { CreateEntityInput } from '../../../Generic/dto/classes'

// import { BugUser } from "./types/index";

@ArgsType()
@InputType('CreateBugInput')
export class CreateBugInput {
    @Field()
    message: string

    @Field()
    date: string

    @Field({ nullable: true })
    category: string

    @Field({ nullable: true })
    user_id: string

    @Field({ nullable: true })
    email: string

    @Field({ nullable: true })
    phone: string

    @Field({ nullable: true })
    new_phone: string

    @Field({ nullable: true })
    first_name: string

    @Field({ nullable: true })
    last_name: string
}
