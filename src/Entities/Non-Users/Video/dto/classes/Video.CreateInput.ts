/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from 'type-graphql'
import { CreateUploadedBy } from './types'

@ArgsType()
@InputType('CreateVideoInput')
export class CreateVideoInput {
    @Field()
    title: string

    @Field()
    url: string

    @Field()
    thumbnail: string

    @Field()
    type: string

    @Field()
    date: string

    @Field()
    sport: string

    @Field(() => [String])
    tags: string[]

    @Field({ nullable: true })
    description?: string

    @Field({ nullable: true })
    jersey_color?: string

    @Field({ nullable: true })
    jersey_number?: string

    @Field({ nullable: true })
    skill?: string

    @Field(() => [String], { defaultValue: [] })
    likes: string[]

    @Field({ nullable: true })
    accepted: boolean

    @Field(() => CreateUploadedBy)
    uploaded_by: CreateUploadedBy

    //Sports
    @Field({ nullable: true })
    distance?: string
    @Field({ nullable: true })
    broken_tackles?: string
    @Field({ nullable: true })
    pancake?: boolean
    @Field({ nullable: true })
    tackles?: string
    @Field({ nullable: true })
    touchdown?: boolean
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
