import { Router } from 'express';
import { handleWebhook } from './controllers/webhook.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Rapyd Payment API');
});
router.post('/webhook', handleWebhook);

export default router;
