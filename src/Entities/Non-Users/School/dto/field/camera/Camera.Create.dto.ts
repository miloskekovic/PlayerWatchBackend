import { ObjectType, InputType, Field } from 'type-graphql'
import { Types } from 'mongoose'
import ICamera from './Camera.interface'
@InputType()
export default class CreateCameraDto implements ICamera {
    _id: Types.ObjectId
    @Field()
    name: string

    @Field()
    url: string

    @Field()
    channelId: string

    @Field({ defaultValue: false })
    is_radar: boolean

    @Field({ nullable: true })
    quality?: string

    @Field({ nullable: true })
    thumbnail?: string

    @Field({ nullable: true })
    owner?: string
}
