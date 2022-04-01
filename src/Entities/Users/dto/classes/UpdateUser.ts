import { Field, InputType } from 'type-graphql'
import { Types } from 'mongoose'
import { SportDto } from './types'

@InputType()
export class UpdateUser {
    @Field()
    _id: string
    @Field({ nullable: true })
    firebase_id: string
    @Field({ nullable: true })
    email: string
    @Field({ nullable: true })
    first_name: string
    @Field({ nullable: true })
    last_name: string
    @Field({ nullable: true })
    school_attending: string
    @Field({ nullable: true })
    thumbnail: string
    @Field({ nullable: true })
    city: string
    @Field({ nullable: true })
    state: string
    @Field({ nullable: true })
    street: string
    @Field({ nullable: true })
    zip: string
    @Field({ nullable: true })
    dob: string
    @Field({ nullable: true })
    gender: string
    @Field({ nullable: true })
    phone: string
    @Field({ nullable: true })
    banner: string
    @Field({ nullable: true })
    height: string
    @Field({ nullable: true })
    weight: string
    @Field({ nullable: true })
    batting: string
    @Field({ nullable: true })
    throwing: string
    @Field(() => [SportDto], { nullable: true })
    sports: SportDto[]
    @Field({ nullable: true })
    committed: string
    @Field({ nullable: true })
    committed_date: string
    @Field({ nullable: true })
    grad_year: string
    @Field(() => [String], { nullable: true })
    tokens: string[]
    @Field({ nullable: true })
    birth_certificate: string
}
