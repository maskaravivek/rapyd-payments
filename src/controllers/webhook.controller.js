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
            break;
        case 'PAYMENT_DISPUTE_UPDATED':
            console.log('Payment dispute updated:', event.data);
            break;
        default:
            console.log('Unhandled event type:', event.type);
    }

    res.status(200).send('Webhook received');
};