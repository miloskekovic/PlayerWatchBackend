import { Field, InputType } from 'type-graphql'
import PhotographOwnerInput from './classes/PhotographOwner.create'

@InputType()
export default class UpdatePhotograph {
    @Field(() => String)
    _id: string
    @Field(() => [String], { nullable: true })
    team_ids: string[] //teams: [{ _id: String, name: String, thumbnail: String }]
    @Field({ nullable: true })
    school_id?: string
    @Field({ nullable: true })
    date?: string
    @Field({ nullable: true })
    game_id?: string
    @Field({ nullable: true })
    date_uploaded?: string
    @Field(() => [String], { nullable: true })
    purchased_by?: string[]
    @Field(() => PhotographOwnerInput, { nullable: true })
    owner?: PhotographOwnerInput
    @Field({ nullable: true })
    url?: string
    @Field({ nullable: true })
    price?: number
}
