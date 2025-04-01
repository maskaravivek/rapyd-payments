import { Router } from 'express';
import { createPayment, getPaymentStatus, refundPayment, getDisputeById } from './controllers/payment.controller.js';
import { handleWebhook } from './controllers/webhook.controller.js';

const router = Router();

router.post('/payment', createPayment);
router.post('/payment/:id/refund', refundPayment);
router.get('/status/:id', getPaymentStatus);
router.post('/webhook', handleWebhook);
router.get('/disputes/:id', getDisputeById);

export default router;
