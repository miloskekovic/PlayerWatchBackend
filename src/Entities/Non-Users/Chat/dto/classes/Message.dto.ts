import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('SenderInput')
class SenderDto {
    @Field()
    _id: string

    @Field()
    avatar: string

    @Field()
    name: string
}

@InputType('MessageInput')
@ObjectType()
export default class MessageDto {
    @Field()
    _id: string

    @Field()
    text: string

    @Field(() => String, { nullable: true })
    image: string

    @Field(() => String, { nullable: true })
    video: string

    @Field(() => SenderDto)
    user: SenderDto

    @Field()
    createdAt: string
}
