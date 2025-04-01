import { config } from 'dotenv';

config();

export const port = process.env.PORT || 3000;
export const rapydApiKey = process.env.RAPYD_API_KEY || '';
export const rapydSecretKey = process.env.RAPYD_SECRET_KEY || '';
