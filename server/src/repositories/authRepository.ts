import { RefreshTokenModel } from '../models/RefreshToken';

export const authRepository = {
  async createRefreshToken(userId: string, token: string, expiresAt: Date) {
    return await RefreshTokenModel.create({ user: userId, token, expiresAt });
  },

  async findRefreshToken(token: string) {
    return await RefreshTokenModel.findOne({ token }).populate('user').exec();
  },

  async deleteRefreshToken(token: string) {
    return await RefreshTokenModel.deleteOne({ token }).exec();
  },

  async deleteAllUserRefreshTokens(userId: string) {
    return await RefreshTokenModel.deleteMany({ user: userId }).exec();
  }
};
