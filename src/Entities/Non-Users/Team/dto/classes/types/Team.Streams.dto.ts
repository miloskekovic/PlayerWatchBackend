import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class TeamStreamDto {
    @Field()
    id: string

    @Field()
    school_id: string
}
