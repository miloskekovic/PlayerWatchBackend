import { Document, model, Schema, Types } from 'mongoose'
import { IReport } from './IReport.interface'

const reportSchema = new Schema({
    entity: String,
    id: String,
    school_id: String,
    reports: [
        {
            message: String,
            reporter_id: String,
        },
    ],
})

const ReportSchema = model<IReport & Document>('Report', reportSchema)

export default ReportSchema
