import { Field, ObjectType, InputType } from 'type-graphql'
import { Types } from 'mongoose'

@ObjectType()
@InputType('FolderImageInputDto')
export class FolderImageDto {
    @Field()
    url: string

    @Field(() => String)
    uploaded_by: Types.ObjectId

    @Field({ nullable: true })
    uploaded_at?: string
}

@ObjectType()
export class FolderDto {
    @Field(() => String)
    _id: Types.ObjectId

    @Field()
    name: string

    @Field({ nullable: true })
    thumbnail?: string

    @Field(() => [FolderImageDto])
    urls: FolderImageDto[]
}

@InputType()
export class FolderInputDto {
    @Field(() => String)
    _id: Types.ObjectId

    @Field()
    name: string

    @Field({ nullable: true })
    thumbnail?: string

    @Field(() => [FolderImageDto], { defaultValue: [] })
    urls: FolderImageDto[]
}
