import { Types } from 'mongoose'

export interface IReport {
    _id: Types.ObjectId
    entity: string
    id: string
    school_id?: string
    reports: [
        {
            message: string
            reporter_id?: string
        }
    ]
}
