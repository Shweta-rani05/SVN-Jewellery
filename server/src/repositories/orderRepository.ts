import { OrderModel, Order } from '../models/Order';
import { DocumentType } from '@typegoose/typegoose';

export const orderRepository = {
  async createOrder(orderData: Partial<Order>): Promise<DocumentType<Order>> {
    return await OrderModel.create(orderData);
  },

  async findOrderBySessionId(sessionId: string): Promise<DocumentType<Order> | null> {
    return await OrderModel.findOne({ stripeSessionId: sessionId }).exec();
  },

  async updateOrderStatus(id: string, status: string): Promise<DocumentType<Order> | null> {
    return await OrderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  },
};
