import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/userRepository';
import { authRepository } from '../repositories/authRepository';
import { generateAccessToken, generateRefreshTokenString } from '../utils/token';
import { UnauthorizedError, ValidationError } from '../utils/errors';

export const authService = {
  async signup(data: any) {
    const existingUser = await userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new ValidationError('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await userRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshTokenString();
    
    // Store refresh token in DB, expires in 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await authRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken };
  },

  async login(data: any) {
    const user = await userRepository.findUserByEmail(data.email, true);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshTokenString();
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await authRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken };
  },

  async refresh(token: string) {
    const storedToken = await authRepository.findRefreshToken(token);
    
    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) {
         await authRepository.deleteRefreshToken(token);
      }
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    // Rotate refresh token
    await authRepository.deleteRefreshToken(token);
    
    const user = storedToken.user as any;
    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshTokenString();
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await authRepository.createRefreshToken(user.id, newRefreshToken, expiresAt);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  async logout(token: string) {
    await authRepository.deleteRefreshToken(token);
  }
};
