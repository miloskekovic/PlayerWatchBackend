/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ObjectType } from 'type-graphql'

import EntityDto from '../../Generic/dto/Entity.dto'

@ObjectType()
export default class BugDto extends EntityDto {
    @Field()
    _id: string

    @Field()
    message: string

    @Field()
    date: string

    @Field({ nullable: true })
    category: string

    @Field({ nullable: true })
    user_id: string

    @Field({ nullable: true })
    email: string

    @Field({ nullable: true })
    phone: string

    @Field({ nullable: true })
    new_phone: string

    @Field({ nullable: true })
    first_name: string

    @Field({ nullable: true })
    last_name: string
}
