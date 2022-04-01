import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'
import { IPhotograph } from '../Photograph.interface'
import PhotographOwnerDto from './classes/PhotographOwner.dto'

@ObjectType()
export default class PhotographDto implements IPhotograph {
    @Field(() => String)
    _id: Types.ObjectId
    @Field(() => [String])
    team_ids: string[] //teams: [{ _id: String, name: String, thumbnail: String }]
    @Field({ nullable: true })
    school_id?: string
    @Field()
    date: string
    @Field({ nullable: true })
    game_id?: string
    @Field()
    date_uploaded: string
    @Field(() => [String])
    purchased_by: string[]
    @Field(() => PhotographOwnerDto)
    owner: PhotographOwnerDto
    @Field()
    url: string
    @Field()
    price: number
}
