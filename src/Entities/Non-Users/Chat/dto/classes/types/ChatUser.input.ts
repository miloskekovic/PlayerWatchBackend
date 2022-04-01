import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'

@ArgsType()
@InputType()
export class ChatUserInput {
    @Field(() => String)
    id: string

    @Field({ nullable: true })
    admin: boolean

    @Field({ nullable: true })
    muted: boolean

    @Field({ nullable: true })
    muted_type?: string
}
