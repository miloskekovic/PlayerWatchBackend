import { Arg, Query, Resolver } from 'type-graphql'

import BugDto from '../dto/Bug.dto'
import Bug from '../schema/Bug.schema'
import { BugQueryService } from '../service'

@Resolver()
export class BugQueryResolver {
    BugQueryService: BugQueryService
    constructor() {
        this.BugQueryService = new BugQueryService()
    }

    @Query(() => [BugDto])
    async getBugs(): Promise<Array<BugDto>> {
        return await this.BugQueryService.getBugs()
    }

    @Query(() => BugDto, { nullable: true })
    async getBugByID(@Arg('bugID') id: string): Promise<BugDto> {
        return await Bug.findById(id).lean()
    }
}
