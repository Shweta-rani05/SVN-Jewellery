import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './User';

export class RefreshToken {
  @prop({ required: true, ref: () => User })
  public user!: Ref<User>;

  @prop({ required: true, unique: true })
  public token!: string;

  @prop({ required: true })
  public expiresAt!: Date;

  @prop({ default: Date.now })
  public createdAt?: Date;
}

export const RefreshTokenModel = getModelForClass(RefreshToken);
