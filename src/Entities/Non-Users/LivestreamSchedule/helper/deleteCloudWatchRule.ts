import * as AWS from 'aws-sdk'
import { targetId } from './createCloudWatchRule'

export default async (ruleName: string): Promise<void> => {
    // set aws cloud watch rule here
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: 'us-east-1',
    })
    // Create CloudWatchEvents service object
    const cloudWatchEvent = new AWS.CloudWatchEvents()
    // remove target
    await cloudWatchEvent
        .removeTargets({ Ids: [targetId], Rule: ruleName, Force: true })
        .promise()
        .catch((e) => {
            throw new Error(`Fail to remove Cloud Watch Rule Target. Message ${e.message}`)
        })
    // delete rule
    await cloudWatchEvent
        .deleteRule({ Name: ruleName, Force: true })
        .promise()
        .catch((e) => {
            throw new Error(`Fail to delete Cloud Watch Rule. Message ${e.message}`)
        })
    return
}
