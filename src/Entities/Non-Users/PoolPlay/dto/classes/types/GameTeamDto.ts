import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('GameTeamDtoInput')
export default class GameTeamDto {
    @Field()
    id: string

    @Field({ nullable: true, defaultValue: 0 })
    score: number

    @Field()
    name: string

    @Field({ nullable: true, defaultValue: 'https://playerwatchtest.s3.amazonaws.com/PlayerWatch/PWLogoSmall.png' })
    thumbnail: string
}
