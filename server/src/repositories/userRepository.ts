import { UserModel, User } from '../models/User';
import { DocumentType } from '@typegoose/typegoose';

export const userRepository = {
  async createUser(userData: Partial<User>): Promise<DocumentType<User>> {
    return await UserModel.create(userData);
  },

  async findUserByEmail(email: string, includePassword = false): Promise<DocumentType<User> | null> {
    const query = UserModel.findOne({ email });
    if (includePassword) {
      query.select('+password');
    }
    return await query.exec();
  },

  async findUserById(id: string): Promise<DocumentType<User> | null> {
    return await UserModel.findById(id).exec();
  },
};
