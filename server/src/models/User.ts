import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true, index: true })
  public email!: string;

  @prop({ required: true, select: false })
  public password!: string;

  @prop({ enum: ['user', 'admin'], default: 'user' })
  public role!: string;

  @prop({ default: Date.now })
  public createdAt?: Date;
}

export const UserModel = getModelForClass(User);
