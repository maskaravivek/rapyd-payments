import RapydService from '../services/rapyd.service.js';

class PaymentController {
  static async createPayment(req, res, next) {
    try {
      const payment = await RapydService.createPayment(req.body);
      res.status(201).json({ success: true, data: payment });
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentStatus(req, res, next) {
    try {
      const paymentStatus = await RapydService.getPaymentStatus(req.params.id);
      res.status(200).json({ success: true, data: paymentStatus });
    } catch (error) {
      next(error);
    }
  }

  static async refundPayment(req, res, next) {
    try {
      const refund = await RapydService.refundPayment(req.body);
      res.status(200).json({ success: true, data: refund });
    } catch (error) {
      next(error);
    }
  }

  static async getDisputeById(req, res, next) {
    try {
      const dispute = await RapydService.getDisputeById(req.params.id);
      res.status(200).json({ success: true, data: dispute });
    } catch (error) {
      next(error);
    }
  }
}

export const { createPayment,
  getPaymentStatus,
  refundPayment,
  getDisputeById } = PaymentController;
export default PaymentController;
