import { Field, InputType } from 'type-graphql'

@InputType('ParticipantsInput')
export default class ParticipantsInputDto {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    poolPlayIndex: number
}
