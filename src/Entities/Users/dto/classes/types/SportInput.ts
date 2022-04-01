import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('SportInput')
export class SportDto {
    // sports?: { sport: string, primary: string, secondary?: string }[],
    @Field()
    sport: string
    @Field({ nullable: true })
    secondary?: string
    @Field()
    primary: string
}
