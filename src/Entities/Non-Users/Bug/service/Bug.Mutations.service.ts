import { updateDocument } from '../../../../MongooseFunctions'
import { CreateBugInput, UpdateBugInput } from '../dto/classes'
import Bug from '../schema/Bug.schema'

// import BugDto from "../dto/Bug.dto";
// import { BugUser } from "../dto/classes/types/index";
// import Spectator from "";

export class BugMutationService {
    async createBug(input: CreateBugInput): Promise<boolean | Error> {
        await Bug.create(input)
        return true
    }

    async updateBug(input: UpdateBugInput): Promise<boolean | Error> {
        return await updateDocument(Bug, input)
    }

    async deleteBug(bugID: string): Promise<boolean | Error> {
        const res = await Bug.findByIdAndDelete(bugID)
        if (res) return true
        else throw new Error('Cannot find a bug with that ID')
    }
}
