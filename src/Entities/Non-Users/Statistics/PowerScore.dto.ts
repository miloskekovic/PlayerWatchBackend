import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('PowerScoreDtoInput')
export default class PowerScoreDto {
    @Field()
    value: number

    @Field()
    date: string
}
