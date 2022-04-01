import { ArgsType, Field, InputType } from 'type-graphql'

import ParticipantsInputDto from './types/Participants.GenerateBracketFromPool'

@ArgsType()
@InputType('GenerateBracketFromPoolInput')
export class GenerateBracketFromPoolInput {
    @Field()
    tournamentID: string

    @Field()
    ageGroupID: string

    @Field(() => [ParticipantsInputDto])
    participants: ParticipantsInputDto[]
}
