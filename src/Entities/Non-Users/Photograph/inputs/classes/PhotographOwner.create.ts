import { Field, InputType } from 'type-graphql'

@InputType()
export default class PhotographOwnerInput {
    @Field()
    _id: string
    @Field()
    first_name: string
    @Field()
    last_name: string
    @Field()
    thumbnail: string
}
