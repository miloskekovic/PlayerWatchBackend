import { ArgsType, Field, InputType } from 'type-graphql'

@ArgsType()
@InputType('CreateEntityInputInput')
export class CreateEntityInput {
    @Field()
    name: string

    @Field({ nullable: true })
    description: string
}
