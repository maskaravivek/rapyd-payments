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
        case 'PAYMENT_DISPUTE_UPDATED':
            console.log('Payment dispute updated:', event.data);
            break;
        default:
            console.log('Unhandled event type:', event.type);
    }

    res.status(200).send('Webhook received');
};

const handleDisputeCreated = async (disputeData) => {
    const { token, amount, original_transaction_id } = disputeData;

    console.log(`Dispute ID: ${token}`);

    try {
        const dispute = await RapydService.getDisputeById(token);
        console.log('Retrieved dispute:', dispute);

        if (amount < 50) {
            const refundData = {
                payment: original_transaction_id,
                "metadata": {
                    "merchant_defined": true
                },
                "merchant_reference_id": "CA1234567",
                "reason": "Refund for dispute",
            };

            const payment = await RapydService.refundPayment(refundData)
            console.log('Dispute created:', payment);

            console.log(`Refund initiated for transaction: ${original_transaction_id}`);
        } else {
            console.log(`Dispute amount ${amount} exceeds threshold, no refund initiated.`);
        }
    } catch (error) {
        console.error('Error handling dispute:', error);
    }
};
