import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class PhotographOwnerDto {
    @Field()
    _id: string
    @Field()
    first_name: string
    @Field()
    last_name: string
    @Field()
    thumbnail: string
}
