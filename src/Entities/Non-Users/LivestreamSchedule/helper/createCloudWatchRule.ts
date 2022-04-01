import * as AWS from 'aws-sdk'
type Action = 'start' | 'stop'
export const targetId = 'myCloudWatchEventsTarget'

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
    // set aws cloud watch rule here
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: 'us-east-1',
    })
    // Create CloudWatchEvents service object
    const cloudWatchEvent = new AWS.CloudWatchEvents()
    const cloudWatchRuleName = `cam_${cameraId}_date_${new Date().getTime()}_action_${action}`
    const cloudWatchParams = {
        Name: cloudWatchRuleName,
        ScheduleExpression: generateCronExpression(time),
        State: 'ENABLED',
    }

    const cloudWatchRes = await cloudWatchEvent
        .putRule(cloudWatchParams)
        .promise()
        .catch((e) => {
            throw new Error(`Fail to put rule in cloud watch. Message ${e.message}`)
        })

    // Create Lambda object
    const lambda = new AWS.Lambda()
    const lambdaParams = {
        Action: 'lambda:InvokeFunction',
        FunctionName: 'camera-dev-1',
        Principal: 'events.amazonaws.com',
        SourceArn: cloudWatchRes.RuleArn,
        StatementId: `${cameraId}${new Date().getTime()}`,
    }
    console.log(lambdaParams)
    await lambda
        .addPermission(lambdaParams)
        .promise()
        .catch((e) => {
            throw new Error(`Fail to add lambda permission. Message ${e.message}`)
        })
    const input = {
        channelId,
        action,
    }
    const targetParams = {
        Rule: cloudWatchRuleName, //name of the CloudWatch rule
        Targets: [
            {
                Arn: 'arn:aws:lambda:us-east-1:022161950213:function:camera-dev-1',
                Id: targetId,
                //JSON params to be passed to Lambda when triggered
                Input: JSON.stringify(input),
            },
        ],
    }
    await cloudWatchEvent
        .putTargets(targetParams)
        .promise()
        .catch((e) => {
            throw new Error(`Fail to putTargets. Message ${e.message}`)
        })
    return { name: cloudWatchRuleName }
}

const generateCronExpression = (time: string): string => {
    const date = new Date(time)
    const minute = date.getUTCMinutes()
    const hour = date.getUTCHours()
    const day = date.getUTCDate()
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear()
    return `cron(${minute} ${hour} ${day} ${month + 1} ? ${year})`
}
