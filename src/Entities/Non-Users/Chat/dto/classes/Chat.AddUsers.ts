import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'

@InputType('ChatAddUsersInput')
@ArgsType()
@ObjectType()
export default class ChatAddUsers {
    @Field()
    chatID: string

    @Field(() => [String], { nullable: true, defaultValue: [] })
    userIDs: string[]
}
