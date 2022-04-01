import { Types } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class SnapshotTeamUserDto {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    first_name: string
    @Field()
    last_name: string
    @Field({ nullable: true })
    thumbnail?: string
    @Field()
    dob: string
}

@ObjectType()
export class SnapshotTeamFolderURLDto {
    @Field()
    url: string
    @Field(() => String)
    uploaded_by: Types.ObjectId
    @Field({ nullable: true })
    uploaded_at?: string
}

@ObjectType()
export class SnapshotTeamFolderDto {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field({ nullable: true })
    thumbnail?: string
    @Field(() => [SnapshotTeamFolderURLDto])
    urls: SnapshotTeamFolderURLDto[]
}

@ObjectType()
export class SnapshotTeamDto {
    @Field(() => String)
    _id: Types.ObjectId
    @Field()
    name: string
    @Field()
    snapshotted_at: string
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    thumbnail?: string
    @Field()
    classification: string
    @Field()
    age_group: string
    @Field()
    sport: string
    @Field(() => String, { nullable: true })
    owner?: Types.ObjectId
    @Field(() => [SnapshotTeamUserDto])
    users: SnapshotTeamUserDto[]
    @Field(() => [SnapshotTeamFolderDto])
    folders: SnapshotTeamFolderDto[]
    @Field({ nullable: true })
    paid: boolean
}
