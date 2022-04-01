import { ObjectType, Field } from 'type-graphql'
import { Types } from 'mongoose'
import ICamera from './Camera.interface'
@ObjectType()
export default class CameraDto implements ICamera {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field()
    url: string
    @Field()
    channelId: string
    @Field({ nullable: true })
    thumbnail?: string
    @Field({ nullable: true })
    is_radar?: boolean
    @Field({ nullable: true })
    quality?: string
    @Field({ nullable: true })
    owner?: string
}
