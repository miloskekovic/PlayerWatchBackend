import { Field, InputType } from 'type-graphql'

import { IUser } from '../User.dto'
import { SportDto } from './types/SportInput'

@InputType()
export class CreateUser implements IUser {
    @Field()
    firebase_id: string
    @Field({ nullable: true })
    email: string
    @Field()
    first_name: string
    @Field()
    last_name: string
    @Field({ nullable: true })
    school_attending?: string
    @Field()
    thumbnail: string
    @Field({ nullable: true })
    city: string
    @Field({ nullable: true })
    state: string
    @Field({ nullable: true })
    street: string
    @Field({ nullable: true })
    zip: string
    @Field()
    dob: string
    @Field()
    gender: string
    @Field()
    phone: string
    @Field()
    banner: string
    @Field(() => [SportDto], { nullable: true, defaultValue: [] })
    sports: [SportDto]
    @Field({ nullable: true })
    committed: string
    @Field({ nullable: true })
    committed_date: string
    @Field({ nullable: true })
    school_district: string
    @Field({ nullable: true })
    school: string
    @Field({ nullable: true })
    school_type: string
    @Field({ nullable: true })
    grad_year: string
    @Field(() => [String], { nullable: true, defaultValue: [] })
    tokens: [string]
    @Field({ nullable: true })
    birth_certificate: string
}
