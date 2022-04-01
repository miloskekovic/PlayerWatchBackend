import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AverageStatsDto {
    @Field()
    min: number

    @Field()
    max: number

    @Field()
    sum: number

    @Field()
    count: number

    @Field()
    average: number
}
