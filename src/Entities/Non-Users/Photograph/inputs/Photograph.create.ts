import { Field, InputType } from 'type-graphql'
import PhotographOwnerInput from './classes/PhotographOwner.create'

@InputType()
export default class CreatePhotograph {
    @Field(() => String)
    _id: string
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
    @Field(() => [String], { defaultValue: [] })
    purchased_by: string[]
    @Field(() => PhotographOwnerInput)
    owner: PhotographOwnerInput
    @Field()
    url: string
    @Field({ defaultValue: 0 })
    price: number
}
