import { Document, model, Schema, Types } from 'mongoose'
import IVideo from '../Video.interface'

const UploadedBy = {
    id: Types.ObjectId,
    name: String,
}

const videoSchema = new Schema({
    title: String,
    description: String,
    date: String,
    url: String,
    tags: [String],
    thumbnail: String,
    type: { type: String },
    sport: String,
    jersey_color: String,
    jersey_number: String,
    skill: String,
    likes: [String],
    accepted: Boolean,
    uploaded_by: { ...UploadedBy },
    broken_tackles: String,
    pancake: Boolean,
    tackles: String,
    touchdown: Boolean,
    distance: String,
    pop_fly: Boolean,
    line_drive: Boolean,
    velocity: String,
    spin_rate: String,
    exit_speed: String,
})
const VideoSchema = model<IVideo & Document>('Video', videoSchema)
export default VideoSchema
