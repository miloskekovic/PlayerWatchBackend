import * as AWS from 'aws-sdk'
type Action = 'start' | 'stop'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-1',
})

const dynamoDB = new AWS.DynamoDB()
const lambda = new AWS.Lambda()
const mediaLive = new AWS.MediaLive()

export default async ({
    channelId,
    action,
    cameraId,
    time,
}: {
    channelId: string
    action: Action
    cameraId: string
    time: string
}): Promise<{ name: string }> => {
    const id = `cam_${cameraId}_date_${new Date().getTime()}_action_${action}`
    const convertedTime = generateDate(time)
    const createdAt = new Date().getTime()

    const params = {
        TableName: 'camera_schedule',
        Item: {
            time: {
                S: convertedTime,
            },
            createdAt: {
                N: createdAt.toString(),
            },
            channelId: {
                S: channelId,
            },
            action: {
                S: action,
            },
        },
    }
    await dynamoDB
        .putItem(params)
        .promise()
        .catch((e) => {
            throw new Error(`Fail to put item. Message ${e.message}`)
        })

    return { name: id }
}

const generateDate = (time: string): string => {
    const date = new Date(time)
    const minute = date.getUTCMinutes()
    const hour = date.getUTCHours()
    const day = date.getUTCDate()
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear()
    return `${minute}-${hour}-${day}-${month + 1}-${year}`
}

export const readSchedule = () => {
    setInterval(async () => {
        console.log('Running schedule job ', new Date().getUTCSeconds())
        const dbParams = {
            ExpressionAttributeNames: {
                '#A': 'action',
                '#C': 'channelId',
                '#time': 'time',
            },
            ExpressionAttributeValues: {
                ':t': {
                    S: generateDate(new Date().toString()),
                },
            },
            FilterExpression: '#time = :t',
            ProjectionExpression: '#A, #C',
            TableName: 'camera_schedule',
        }
        const { Count, Items }: any = await dynamoDB
            .scan(dbParams)
            .promise()
            .catch((error) => console.log(error))
        if (!Count) return
        const promises = Items.map(async (Item) => {
            const channelId = Item.channelId.S
            const action: Action = Item.action.S
            const channelInfo: any = await mediaLive
                .describeChannel({
                    ChannelId: channelId,
                })
                .promise()
                .catch((error) => console.log(error))
            if (action === 'start' && ['RUNNING', 'STARTING'].includes(channelInfo.State)) return
            if (action === 'stop' && ['IDLE', 'STOPPING'].includes(channelInfo.State)) return
            const lambdaParams = {
                FunctionName: 'camera-dev-1',
                Payload: JSON.stringify({ channelId, action }),
            }
            await lambda
                .invoke(lambdaParams)
                .promise()
                .catch((error) => console.log(error))

            console.log('trigger lambda')
        })
        await Promise.all(promises)
    }, 5000)
}
