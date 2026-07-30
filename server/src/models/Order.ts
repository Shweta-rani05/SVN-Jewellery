import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './User';

class OrderItem {
  @prop({ required: true })
  public productId!: string; // Using string since we don't have a Product model yet

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public quantity!: number;
}

export class Order {
  @prop({ required: true, ref: () => User })
  public user!: Ref<User>;

  @prop({ type: () => [OrderItem], required: true })
  public items!: OrderItem[];

  @prop({ required: true })
  public totalAmount!: number;

  @prop({ required: true, enum: ['pending', 'paid', 'failed', 'fulfilled'], default: 'pending' })
  public status!: string;

  @prop({ unique: true, sparse: true })
  public stripeSessionId?: string;

  @prop({ default: Date.now })
  public createdAt?: Date;
}

export const OrderModel = getModelForClass(Order);
