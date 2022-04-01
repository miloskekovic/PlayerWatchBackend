import BugDto from '../dto/Bug.dto'
import Bug from '../schema/Bug.schema'

export class BugQueryService {
    async getBugs(): Promise<Array<BugDto>> {
        return await Bug.find({}).lean()
    }
}
