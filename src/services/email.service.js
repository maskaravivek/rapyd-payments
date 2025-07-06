import nodemailer from 'nodemailer';
import { emailConfig, merchantEmail } from '../config.js';

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: emailConfig.service,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass
            }
        });
    }

    async sendDisputeNotification(disputeData) {
        const { token, original_dispute_amount, original_transaction_id, currency } = disputeData;

        const emailContent = `
        Payment Dispute Alert

        Dispute Details:
        - Dispute ID: ${token}
        - Original Transaction ID: ${original_transaction_id}
        - Dispute Amount: ${original_dispute_amount} ${currency || 'USD'}
        - Date: ${new Date().toLocaleString()}

        Action Required:
        A dispute has been created for one of your transactions. Please review the dispute details and take appropriate action.

        This is an automated notification for demonstration purposes.`;
        
        const mailOptions = {
            from: emailConfig.user,
            to: merchantEmail,
            subject: `Payment Dispute Created - ${token}`,
            text: emailContent
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Dispute notification email sent:', info.response);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('Error sending dispute notification email:', error);
            throw error;
        }
    }
}

export default new EmailService();
