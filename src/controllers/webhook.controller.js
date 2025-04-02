import RapydService from '../services/rapyd.service.js';

export const handleWebhook = (req, res) => {
    const event = req.body;
    switch (event.type) {
        case 'PAYMENT_COMPLETED':
            console.log('Payment completed:', event.data);
            break;
        case 'payment.failed':
            console.log('Payment failed:', event.data);
            break;
        case 'CUSTOMER_CREATED':
            console.log('Customer created:', event.data);
            break;
        case 'PAYMENT_DISPUTE_CREATED':
            console.log('Payment dispute created:', event.data);
            handleDisputeCreated(event.data);
            break;
        default:
            console.log('Unhandled event type:', event.type);
    }

    res.status(200).send('Webhook received');
};

const handleDisputeCreated = async (disputeData) => {
    const { token, original_dispute_amount, original_transaction_id } = disputeData;

    console.log(`Dispute ID: ${token}`);

    try {
        if (original_dispute_amount < 50) {
            const refundData = {
                payment: original_transaction_id,
                "metadata": {
                    "merchant_defined": true
                },
                "merchant_reference_id": "CA1234567",
                "reason": "Refund for dispute",
            };

            await RapydService.refundPayment(refundData)
            console.log(`Refund initiated for transaction: ${original_transaction_id}`);
        } else {
            // Notify the merchant about the dispute
            console.log(`Notify merchant about dispute for transaction: ${original_transaction_id}`);
        }
    } catch (error) {
        console.error('Error handling dispute:', error);
    }
};
