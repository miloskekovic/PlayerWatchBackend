import { StatsFields } from './../../Non-Users/Statistics/StatsFields.dto'
import { ObjectId } from 'mongodb'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import Stripe from 'stripe'
import { Context } from '../../../utils/Context.interface'
import { CreateUser } from '../dto/classes/CreateUser'
import { PatchStatistics } from '../dto/classes/PatchStatistics'
import { UpdateUser } from '../dto/classes/UpdateUser'
import { UserDto } from '../dto/User.dto'
import UserSchema from '../schema/User.schema'
import AveragesSchema from '../../Non-Users/Statistics/Averages/Averages.schema'
import { IsAuth } from '../../../Non-Entities/Authentication/isAuth'
import UpdatedFanDto from '../dto/classes/UpdatingFanDto'
import UpdatedFanTypeDto from '../dto/classes/UpdatingFanTypeDto'
import isSameAsContext from '../../../Non-Entities/Authentication/isSameAsContext'
import assert = require('assert')
import FBAdmin from '../../../Non-Entities/Firebase/FirebaseAdmin'
import ReceiptDto from '../../Non-Users/Purchase/dto/Reciept'
import iap = require('in-app-purchase')
import { JWT } from 'google-auth-library'
import { google } from 'googleapis'
import SubscriptionSchema from '../../Non-Users/Subscription/Subscription.schema'
import * as AWS from 'aws-sdk'
import { isDev } from '../../../..'
google.options({
    auth: new JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        null,
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDkk8UwhbBSsJnH\nNANaL3KXoo45K4VbDJySZiX3DAVIFFlU4gGoyqqHTSfKcTpNV7n0w5l14hBchEU7\nH3B7rCgIz6NbIOPOGrgaPmce6T1qW7XrF6pIUvdfse7tdhZlqVBazcxa/q4RMKMC\nsuPZJft2I6Y+xufgDn35GT+icYOJ6mw/HzyfHVkcvt0DBBe+CTmKQltPa6RG0zAO\nH7thvjJqq5pkQMkMay6BPCE/RnLdiPCQro25UN3PblgcJRaGPmp2OfGXPkv8m43W\nm6tjVbUDPv6wEfjIXjAt9J+w02yuzDegSHX14V0LB5gEDtYYpgthhiNo3po8k1Ze\nEPcBiI4FAgMBAAECggEASPCCny46CtkB6VhGrZOwfITJ36JsppZKrEjeWoxCbzLX\nIsgQAX3SluRfCzHAigexdlKoeL6PvAYVVX191mkkSVOA7EZ9izppfy5kl6+UAomL\nbp6ZnwSina3Y8XuaQAyccK11RaA5iZC8o9LT9GozaQqNNUEhoxTczA1rifmxIOPM\nDqk0bZEOjRR9C83KEEGnMXd++V8jX328L2HM2C6bFNcKOtVuheXCFN7+PPeFu12i\nteR53qm8X8JelvJfUYmg/5CXtW+vgzdGbReiX9fy32iYPK/Wb1Lz6twiHxIpDdkX\nKNViIk9QYiVTNBViHetXRnrcNwDo2WNPUVaTDupTLQKBgQDx6QPSOjZIL4SH8mZd\nv3t7GUZuLhVexzhWtVRlZc0Je3wqxtvDivkzFieSOlKr1yv2EGhFVyTgzncTFKln\nOGC1lzPq9ouVOyNMAyb0kc7J2HygfpiRvgGvLlTpMMeGLrV3d0KeQBtXQVT1BCpA\nbWW5yW2Ouaz0u2vxJJHgaF6+5wKBgQDx4/RtI5Piw3K89uyDMKLH8GTp4Cz/T+AK\nSSNSoVoKCDeQM9GJCH+0aWPeNUVq6Uku/0AHyPdG+8Q7WtV4fT12ebhwGPNifRSx\nEcZrGdHNK/ck4GZg0emXyBwFvCKRza8auLQI/zDRiW9kPwm79KfzRAWZM/j73Mob\n4TO6BkCKMwKBgQCd9wWqwp5tlrHZQB0+PGp6oK+QBQGpaTfNzwy0RbyU45DaMg6R\nau99P4tJflI7qf8n5+De3p/TOJ8i04wnPfZQvdKGLMZLBVnwKeLHM2sv/PCssN4Z\n1VQuO3fw6gxv/5I516OlyMDRwnSipjyc45LYtcKXv4FEMhqzVaj4O88aowKBgQCu\n9a33PxOZorscGRJLdeNX8PZc/+wsI28uoWYuP0zsErN11zVJA9+y88PrluaGBQUN\nPEzpFKBfNH3kXLgpNZU+W55fXny0kTplNTEqiHtrBtD1WGZUw6BNS82RDFqI0ZhF\nILIAC+0YsmrivIHi9HyChYHzJVeDfVimv8Z1WE5YZwKBgCXYuSpesp4bYokdbWUk\nM8QVPi1yGMFt9NwW9wTFDW4qQMBn4ULoq6j0OVrqQv+nFIFTxfquJBhFiJICR0aw\nVVeAMWSeF1vKHmQum5yD2t9g48Hz9d0fZMDvvo5NE2vrm4oQM1RwHsNRm1YvOdwW\nkZX1n/6IqFo+2Aop3NQSVGRQ\n-----END PRIVATE KEY-----\n'.replace(
            /\\n/gm,
            '\n'
        ),
        ['https://www.googleapis.com/auth/androidpublisher']
    ),
})

const androidGoogleApi = google.androidpublisher({ version: 'v3' })
const androidPackageName = process.env.ANDROID_PACKAGE_NAME

@Resolver()
export class UserMutationResolver {
    @Mutation(() => UserDto)
    async createUser(@Arg('user') user: CreateUser, @Ctx() context: Context): Promise<UserDto> {
        if (!isDev) assert(await FBAdmin.auth().getUser(user.firebase_id))
        const createdUser = await UserSchema.create(user)
        if (!isDev) context.req.session.userID = createdUser._id
        return createdUser.toObject()
    }
    @Mutation(() => UserDto)
    @UseMiddleware(IsAuth)
    async updateUserStatistics(
        @Arg('id') id: string,
        @Arg('statistics') statistics: PatchStatistics,
        @Ctx() context: Context
    ): Promise<UserDto> {
        const foundUser = await context.loaders.user.dataLoader.load(id)
        let [Averages] = await AveragesSchema.find({})
        if (!Averages) Averages = await AveragesSchema.create({})
        const defaultStatObj = {
            value: null,
            weight: null,
            date: new Date().toISOString(),
            certification: null,
        }
        let userEvents
        if (!foundUser) throw new Error('Invalid userID')
        Object.entries(statistics).forEach(([statName, statObj]: [string, typeof StatsFields]) => {
            Object.entries(statObj).forEach(([eventName, eventValue]) => {
                userEvents = foundUser.statistics[statName][eventName]
                if (!userEvents[userEvents.length - 1].value) Averages[statName][eventName].count += 1
                Averages[statName][eventName].sum += +eventValue.value - +userEvents[userEvents.length - 1].value
                Averages[statName][eventName].min = Math.min(+eventValue.value, Averages[statName][eventName].min)
                Averages[statName][eventName].max = Math.max(+eventValue.value, Averages[statName][eventName].max)
                Averages[statName][eventName].average =
                    Averages[statName][eventName].sum / (Averages[statName][eventName].count || 1)
                userEvents.push({ ...defaultStatObj, ...eventValue })
            })
            Averages.markModified(statName)
        })
        Averages.save()
        foundUser.save()
        return foundUser.toObject()
    }

    @Mutation(() => UserDto)
    @UseMiddleware(IsAuth)
    async updateUser(@Arg('user') user: UpdateUser, @Ctx() context: Context): Promise<UserDto> {
        const { _id } = user
        return await UserSchema.findByIdAndUpdate(_id, { $set: user }, { new: true }).lean()
    }

    @Mutation(() => UserDto)
    @UseMiddleware(IsAuth)
    async leaveTeam(
        @Arg('userID') userID: string,
        @Arg('teamID') teamID: string,
        @Ctx() context: Context
    ): Promise<UserDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Cannot find user with that ID')
        const foundTeam = await context.loaders.team.dataLoader.load(teamID)
        if (!foundTeam) throw new Error('Cannot find team with that ID')

        foundUser.teams = foundUser.teams.filter(({ id }) => id.toString() !== teamID)
        foundTeam.users = foundTeam.users.filter(({ id }) => id.toString() !== userID)
        foundTeam.save()
        foundUser.save()

        return foundUser.toObject()
    }

    @Mutation(() => String, {
        description: 'Buys the item and validates the purchase with Apple/Google. Returns the purchase token',
    })
    @UseMiddleware(IsAuth)
    async purchaseItem(
        @Arg('userID') userID: string,
        @Arg('platform') platform: string,
        @Arg('receipt') receipt: ReceiptDto,
        @Ctx() context: Context
    ): Promise<string> {
        if (!isSameAsContext(context, userID)) return ''
        const isAndroid = platform == 'android'
        const { sku, token } = receipt
        let passReceipt: any = { ...receipt }
        if (isAndroid) {
            passReceipt.packageName = androidPackageName
            passReceipt.productId = sku
            passReceipt.purchaseToken = token
            delete passReceipt.token
            delete passReceipt.sku
        } else passReceipt = receipt.token
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        const foundIndex = foundUser.consumables.findIndex((consumable) => consumable.sku === sku)
        if (foundIndex > -1) {
            const doesTokenExist = foundUser.consumables[foundIndex].receipts.some((receipt) => receipt.token == token)
            if (doesTokenExist) throw new Error('This product has already been purchased')
        }
        const validationResponse = await iap.validate(passReceipt).catch((e) => {
            if (!isDev) throw new Error('Invalid Token')
            throw new Error(e)
        })
        // Sanity check
        assert(
            (platform === 'android' && validationResponse.service === 'google') ||
                (platform === 'ios' && validationResponse.service === 'apple')
        )
        if (isAndroid && validationResponse.acknowledgementState === 0) {
            await androidGoogleApi.purchases.subscriptions.acknowledge({
                packageName: androidPackageName,
                subscriptionId: sku,
                token,
            })
        }
        if (foundIndex > -1) {
            foundUser.consumables[foundIndex].count++
            if (isAndroid) {
                foundUser.consumables[foundIndex].receipts.unshift({
                    order_id: validationResponse.orderId,
                    purchased_at: validationResponse.purchaseTimeMillis,
                    token,
                })
            } else {
                const [{ transaction_id, purchase_date_ms }] = validationResponse.latest_receipt_info
                foundUser.consumables[foundIndex].receipts.unshift({
                    order_id: transaction_id,
                    purchased_at: purchase_date_ms,
                    token,
                })
            }
        } else {
            if (isAndroid) {
                foundUser.consumables.push({
                    count: 1,
                    sku,
                    receipts: [
                        {
                            order_id: validationResponse.orderId,
                            purchased_at: validationResponse.purchaseTimeMillis,
                            token,
                        },
                    ],
                })
            } else {
                const [{ transaction_id, purchase_date_ms }] = validationResponse.latest_receipt_info
                console.log({ transaction_id, purchase_date_ms })
                foundUser.consumables.push({
                    count: 1,
                    sku,
                    receipts: [
                        {
                            order_id: transaction_id,
                            purchased_at: purchase_date_ms,
                            token,
                        },
                    ],
                })
            }
        }

        foundUser.save()
        return token
    }

    @Mutation(() => UserDto)
    @UseMiddleware(IsAuth)
    async removeVideo(
        @Arg('userID') userID: string,
        @Arg('videoID') videoID: string,
        @Ctx() context: Context
    ): Promise<UserDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Cannot find user with that ID')
        const foundVideo = await context.loaders.video.dataLoader.load(videoID)
        if (!foundVideo) throw new Error('Cannot find video with that ID')

        foundUser.videos = foundUser.videos.filter(({ id }) => id.toString() !== videoID)
        foundUser.save()
        // TODO set expire date in aws s3
        return foundUser.toObject()
    }

    @Mutation(() => UserDto)
    @UseMiddleware(IsAuth)
    async sendFanRequest(
        @Arg('senderID') senderID: string,
        @Arg('receiverID') receiverID: string,
        @Ctx() context: Context
    ): Promise<UserDto> {
        const foundSender = await context.loaders.user.dataLoader.load(senderID)
        if (!foundSender) throw new Error('Cannot find user with that sender ID')
        const foundReceiver = await context.loaders.user.dataLoader.load(receiverID)
        if (!foundReceiver) throw new Error('Cannot find user with that receiver ID')

        if (!foundSender.following.some(({ id }) => id.toString() === receiverID))
            foundSender.following.push({ id: new ObjectId(receiverID), accepted: false })
        if (!foundReceiver.fans.some(({ id }) => id.toString() === senderID))
            foundReceiver.fans.push({ id: new ObjectId(senderID), accepted: false })

        foundSender.save()
        foundReceiver.save()
        return foundSender.toObject()
    }

    @Mutation(() => UpdatedFanDto)
    @UseMiddleware(IsAuth)
    async removeFan(
        @Arg('userID') userID: string,
        @Arg('fanID') fanID: string,
        @Ctx() context: Context
    ): Promise<UpdatedFanDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Cannot find user with that user ID')
        const foundFan = await context.loaders.user.dataLoader.load(fanID)
        if (!foundFan) throw new Error('Cannot find user with that fan ID')

        foundUser.fans = foundUser.fans.filter(({ id }) => id.toString() !== fanID)
        foundFan.following = foundFan.following.filter(({ id }) => id.toString() !== userID)

        foundUser.save()
        foundFan.save()
        return { userID, fanID }
    }

    @Mutation(() => UpdatedFanDto)
    @UseMiddleware(IsAuth)
    async unfollow(
        @Arg('userID') userID: string,
        @Arg('fanID') fanID: string,
        @Ctx() context: Context
    ): Promise<UpdatedFanDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Cannot find user with that user ID')
        const foundFan = await context.loaders.user.dataLoader.load(fanID)
        if (!foundFan) throw new Error('Cannot find user with that fan ID')

        foundUser.following = foundUser.following.filter(({ id }) => id.toString() !== fanID)
        foundFan.fans = foundFan.fans.filter(({ id }) => id.toString() !== userID)

        foundUser.save()
        foundFan.save()
        return { fanID, userID }
    }

    @Mutation(() => UpdatedFanTypeDto)
    @UseMiddleware(IsAuth)
    async acceptFanRequest(
        @Arg('userID') userID: string,
        @Arg('fanID') fanID: string,
        @Arg('fanType', { nullable: true }) fanType: string,
        @Ctx() context: Context
    ): Promise<UpdatedFanTypeDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Cannot find user with that user ID')
        const foundFan = await context.loaders.user.dataLoader.load(fanID)
        if (!foundFan) throw new Error('Cannot find user with that fan ID')

        const foundUserItem = foundUser.fans.find(({ id }) => id.toString() == fanID)
        const foundFanItem = foundFan.following.find(({ id }) => id.toString() == userID)
        foundFanItem.accepted = true
        foundFanItem.type = fanType
        foundUserItem.type = fanType
        foundUserItem.accepted = true

        foundUser.save()
        foundFan.save()
        return { userID, fanID, fanType }
    }

    @Mutation(() => UpdatedFanDto)
    @UseMiddleware(IsAuth)
    async declineFanRequest(
        @Arg('userID') userID: string,
        @Arg('fanID') fanID: string,
        @Ctx() context: Context
    ): Promise<UpdatedFanDto> {
        const foundUser = await context.loaders.user.dataLoader.load(userID)
        if (!foundUser) throw new Error('Cannot find user with that user ID')
        const foundFan = await context.loaders.user.dataLoader.load(fanID)
        if (!foundFan) throw new Error('Cannot find user with that fan ID')

        foundUser.fans = foundUser.fans.filter(({ id }) => id.toString() !== fanID)
        foundFan.following = foundFan.following.filter(({ id }) => id.toString() !== userID)

        foundUser.save()
        foundFan.save()
        return { userID, fanID }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async logout(@Arg('userID') userID: string, @Ctx() context: Context): Promise<boolean> {
        const foundUser = await context.loaders.user.leanDataLoader.load(userID)
        if (!foundUser) return false
        if (isSameAsContext(context, userID)) context.req.session.userID = null
        return true
    }

    @Mutation(() => UserDto)
    async createNewStripeCustomer(
        @Arg('stripeToken') stripeToken: string,
        @Arg('userId') userId: string
    ): Promise<UserDto> {
        const stripe = new Stripe('sk_test_PMfzgdS4UGqEVsR3iwdTtss9', { apiVersion: null })
        const foundCustomer = await UserSchema.findById(userId)
        const { stripe_id } = foundCustomer
        if (!stripe_id) {
            const newStripeCustomer = await stripe.customers.create({
                source: stripeToken,
                name: `${foundCustomer.first_name} ${foundCustomer.last_name}`,
            })
            foundCustomer.stripe_id = newStripeCustomer.id
            foundCustomer.save()
        }
        return foundCustomer
    }

    @Mutation(() => String)
    async createStripeAccount(@Arg('userId') userId: string): Promise<string> {
        // create new account
        const stripe = new Stripe('sk_test_PMfzgdS4UGqEVsR3iwdTtss9', { apiVersion: null })
        const account = await stripe.accounts.create({
            type: 'express',
            capabilities: { transfers: { requested: true } },
        })

        // store account id to user schema
        const foundUser = await UserSchema.findById(userId)
        foundUser.stripe_id = account.id
        await foundUser.save()

        // link user stripe account to our account
        const response = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: 'https://example.com/reauth',
            return_url: 'https://example.com/return',
            type: 'account_onboarding',
        })
        return response.url
    }

    @Mutation(() => Boolean)
    async isAccountSignup(@Arg('stripeId') stripeId: string): Promise<boolean> {
        const stripe = new Stripe('sk_test_PMfzgdS4UGqEVsR3iwdTtss9', { apiVersion: null })
        const account = await stripe.accounts.retrieve(stripeId)
        return account.details_submitted
    }

    @Mutation(() => String)
    async createLogin(@Arg('stripeId') stripeId: string): Promise<any> {
        const stripe = new Stripe('sk_test_PMfzgdS4UGqEVsR3iwdTtss9', { apiVersion: null })
        const login = await stripe.accounts.createLoginLink(stripeId)
        return login.url
    }

    @Mutation(() => String)
    async createPaymentIntents(@Arg('amount') amount: number): Promise<string> {
        const stripe = new Stripe('sk_live_QD0KoQjTaxsonzLkbrsLECsc', { apiVersion: null })
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100,
            currency: 'usd',
        })
        return paymentIntent.id
    }

    @Mutation(() => Boolean)
    async confirmPaymentIntents(
        @Arg('paymentIntentId') paymentIntentId: string,
        @Arg('paymentMethod') paymentMethod: string
    ): Promise<boolean> {
        const stripe = new Stripe('sk_live_QD0KoQjTaxsonzLkbrsLECsc', { apiVersion: null })
        const paymentConfirm = await stripe.paymentIntents.confirm(paymentIntentId, { payment_method: paymentMethod })
        return !!paymentConfirm
    }

    @Mutation(() => Boolean)
    async createStripeCharge(
        @Arg('stripeCustomerId') stripeCustomerId: string,
        @Arg('amount') amount: number,
        @Arg('receipt_email') receipt_email?: string
    ): Promise<boolean> {
        const stripe = new Stripe('sk_test_PMfzgdS4UGqEVsR3iwdTtss9', { apiVersion: null })
        await stripe.charges
            .create({
                amount: 100,
                currency: 'usd',
                customer: stripeCustomerId,
                description: 'Tournament Charge',
                receipt_email,
            })
            .catch(() => false)
        return true
    }

    @Mutation(() => Boolean)
    async clearCloudWatchRules(): Promise<boolean> {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: 'us-east-1',
        })
        // Create CloudWatchEvents service object
        const cloudWatchEvent = new AWS.CloudWatchEvents()
        const cloudwatchRules = await cloudWatchEvent.listRules().promise()
        const promises = cloudwatchRules.Rules.map(async ({ Name }) => {
            const ruleTargets = await cloudWatchEvent.listTargetsByRule({ Rule: Name }).promise()
            // await cloudWatchEvent
            //     .removeTargets({
            //         Ids: ruleTargets.Targets.map(({ Id }) => Id),
            //         Rule: Name,
            //         Force: true,
            //     })
            //     .promise()
            cloudWatchEvent.deleteRule({ Name, Force: true }).promise()
        })
        Promise.all(promises)
        return true
    }
}
