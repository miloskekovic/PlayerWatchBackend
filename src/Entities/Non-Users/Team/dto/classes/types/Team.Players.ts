import { Field, ObjectType } from 'type-graphql'

import { CreateEntityInput } from '../../../../Generic/dto/classes'

@ObjectType()
export class TeamPlayerDto extends CreateEntityInput {
    @Field()
    id: string

    @Field()
    accepted: boolean
}
