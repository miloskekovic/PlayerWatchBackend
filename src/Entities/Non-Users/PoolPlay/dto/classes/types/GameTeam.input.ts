import { Field, InputType } from 'type-graphql'

@InputType('GameTeamInput')
export default class GameTeamInput {
    @Field()
    id: string

    @Field({ nullable: true, defaultValue: 0 })
    score: number

    @Field({ nullable: true })
    name: string

    @Field({ nullable: true, defaultValue: 'https://playerwatchtest.s3.amazonaws.com/PlayerWatch/PWLogoSmall.png' })
    thumbnail: string
}
