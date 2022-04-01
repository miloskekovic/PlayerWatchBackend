import * as AWS from 'aws-sdk'

const creds = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_KEY)
const MediaLive = new AWS.MediaLive({
    region: 'us-east-1',
    credentials: creds,
})
export default MediaLive
