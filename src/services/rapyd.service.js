import { makeRequest } from './rapyd.utilities.js';

class RapydService {
  static async createPayment(paymentData) {
    const url = '/v1/payments';
    return makeRequest('POST', url, paymentData);
  }

  static async getPaymentStatus(paymentId) {
    const url = `/v1/payments/${paymentId}`;
    return makeRequest('GET', url);
  }

  static async refundPayment(refundData) {
    const url = '/v1/refunds';
    return makeRequest('POST', url, refundData);
  }

  static async getDisputeById(disputeId) {
    const url = `/v1/disputes/${disputeId}`;
    return makeRequest('GET', url);
  }
}

export default RapydService;
