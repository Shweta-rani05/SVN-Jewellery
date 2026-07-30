import { orderRepository } from '../repositories/orderRepository';
import { AppError } from '../utils/errors';

// Mock Payment Gateway
function mockPayment(amount: number, cardDetails?: any): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'MOCK_' + Date.now(),
        amount: amount,
        status: 'completed'
      });
    }, 1500); // simulate network delay
  });
}

export const checkoutService = {
  async createSession(userId: string, items: any[], cardDetails?: any) {
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    // Create a pending order
    const order = await orderRepository.createOrder({
      user: userId as any,
      items,
      totalAmount,
      status: 'pending',
    });

    try {
      // Simulate payment processing
      const paymentResult = await mockPayment(totalAmount, cardDetails);

      if (paymentResult.success) {
        // Update order status to paid
        await orderRepository.updateOrderStatus(order.id, 'paid');
        
        return { 
          success: true,
          url: `${process.env.FRONTEND_URL}/order-success?session_id=${paymentResult.transactionId}`, 
          sessionId: paymentResult.transactionId 
        };
      } else {
        throw new AppError('Payment failed', 400);
      }
    } catch (error) {
      throw new AppError('Payment processing error', 500);
    }
  },

  async handleWebhook(event: any) {
    // Webhooks are no longer needed with mockPayment
    return true;
  }
};
