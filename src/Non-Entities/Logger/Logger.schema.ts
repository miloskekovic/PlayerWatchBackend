import { Document, model, Schema, Types } from 'mongoose'

//User Schema
const loggerSchema = new Schema({
    userID: String,
    requests: [
        {
            _id: false,
            operation: String,
            variables: Array,
            data: Array,
            request_errors: Array,
            time: String,
            time_ms: Number,
        },
    ],
    day: String,
})
const LoggerSchema = model<Document>('Logger', loggerSchema)
export default LoggerSchema
