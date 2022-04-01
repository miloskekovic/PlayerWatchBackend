import { ArgsType, Field, InputType } from 'type-graphql'

@ArgsType()
@InputType('InputUpdateEntity')
export class UpdateEntityInput {
    @Field()
    id: string

    @Field({ nullable: true })
    name: string

    @Field({ nullable: true })
    description: string
}
