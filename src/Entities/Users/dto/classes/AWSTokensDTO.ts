import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AWSTokensDTO {
    @Field()
    secretKey: string
    @Field()
    accessKey: string
}
