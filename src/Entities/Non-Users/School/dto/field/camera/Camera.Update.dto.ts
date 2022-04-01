import { Types } from 'mongoose'
import { Field, InputType } from 'type-graphql'
import ICamera from './Camera.interface'
@InputType()
export default class UpdateCameraDto implements ICamera {
    @Field()
    _id: string
    @Field({ nullable: true })
    name: string
    @Field({ nullable: true })
    url: string
    @Field({ nullable: true })
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
