import { Types } from 'mongoose'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('CreateUploadedByInput')
export class CreateUploadedBy {
    @Field(() => String)
    id: Types.ObjectId

    @Field()
    name: string
}

@InputType('UploadedByInput')
export class UploadedByInput {
    @Field(() => String)
    id: Types.ObjectId

    @Field()
    name: string
}
