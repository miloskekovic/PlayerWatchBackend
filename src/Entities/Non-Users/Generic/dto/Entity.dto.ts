import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class EntityDto {
    @Field()
    _id: string

    @Field({ nullable: true })
    name: string

    @Field({ nullable: true, defaultValue: null })
    description?: string
}
