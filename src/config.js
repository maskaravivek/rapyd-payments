import { config } from 'dotenv';

config();

export const port = process.env.PORT || 8000;
export const rapydApiKey = process.env.RAPYD_API_KEY || '';
export const rapydSecretKey = process.env.RAPYD_SECRET_KEY || '';

export const emailConfig = {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
};

export const merchantEmail = process.env.MERCHANT_EMAIL || '';
