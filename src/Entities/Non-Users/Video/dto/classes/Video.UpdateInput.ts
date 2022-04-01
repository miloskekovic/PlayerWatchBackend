/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from 'type-graphql'
import { CreateUploadedBy } from './types'

@ArgsType()
@InputType('UpdateVideoInput')
export class UpdateVideoInput {
    @Field()
    _id: string

    @Field({ nullable: true })
    title: string

    @Field({ nullable: true })
    sport: string

    @Field({ nullable: true })
    url: string

    @Field({ nullable: true })
    skill: string

    @Field({ nullable: true })
    thumbnail: string

    @Field({ nullable: true })
    type: string

    @Field({ nullable: true })
    date: string

    @Field({ nullable: true })
    description?: string

    @Field({ nullable: true })
    jersey_color?: string

    @Field({ nullable: true })
    jersey_number?: string

    @Field(() => [String], { nullable: true })
    likes: string[]

    @Field({ nullable: true })
    accepted: boolean

    @Field(() => CreateUploadedBy, { nullable: true })
    uploaded_by: CreateUploadedBy

    @Field(() => [String], { nullable: true })
    tags: string[]

    //Sports
    @Field({ nullable: true })
    broken_tackles?: string
    @Field({ nullable: true })
    pancake?: boolean
    @Field({ nullable: true })
    tackles?: string
    @Field({ nullable: true })
    touchdown?: boolean
    @Field({ nullable: true })
    distance?: string
    @Field({ nullable: true })
    pop_fly?: boolean
    @Field({ nullable: true })
    line_drive?: boolean
    @Field({ nullable: true })
    velocity?: string
    @Field({ nullable: true })
    spin_rate?: string
    @Field({ nullable: true })
    exit_speed?: string
}
