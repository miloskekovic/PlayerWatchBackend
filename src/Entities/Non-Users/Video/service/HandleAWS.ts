import * as AWS from 'aws-sdk'

const conf = new AWS.Config({
    accessKeyId: 'AKIAQKKHUQYCU27P4RFX',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'us-east-1',
})
const Bucket = 'playerwatchtest'
const s3 = new AWS.S3(conf)

const deleteVideo = async (url): Promise<boolean> => {
    if (url.includes('https://playerwatchtest.s3.amazonaws.com/')) {
        const vidKey = url.split('https://playerwatchtest.s3.amazonaws.com/')
        const params = {
            Bucket,
            Key: vidKey[1],
        }
        const deleteRes = await s3.deleteObject(params, (data) => data).promise()
    }
    return true
}

const getSignedURL = async (Key: string): Promise<string> => {
    const Expires = 60 * 10
    const params = {
        Bucket,
        Key,
        // Expires,
    }
    const url = await s3.getSignedUrlPromise('putObject', params)
    return url
}

export { deleteVideo, getSignedURL }
