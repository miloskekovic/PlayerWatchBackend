export default interface ISubscription {
    product_id: string
    purchased_at: string
    is_renewing: boolean
    original_transaction_id: string
    transaction_id: string
    expires_at: string
}
