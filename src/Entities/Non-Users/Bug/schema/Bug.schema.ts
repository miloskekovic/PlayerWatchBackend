import * as mongoose from 'mongoose'

const BugSchema = new mongoose.Schema({
    message: String,
    date: String,
    category: String,
    user_id: String,
    email: String,
    phone: String,
    new_phone: String,
    first_name: String,
})

export default mongoose.model('Bug', BugSchema)
