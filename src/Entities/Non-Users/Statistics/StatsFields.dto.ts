import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('StatsFieldsInput')
export class StatsFields {
    @Field({ nullable: true })
    value: number

    @Field({ nullable: true })
    date: string

    @Field({ nullable: true })
    certification: string

    @Field({ nullable: true })
    weight: number

    // @Field({ nullable: true })
    // description: string;
}
